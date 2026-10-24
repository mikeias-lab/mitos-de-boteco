// Testes unitários (Node puro, sem dependências): estrutura dos dados, regras de perigo e motor de cálculo.
// Uso: node tests/unit.test.js   (sai com código 1 se houver problemas)
const fs = require('fs'); const path = require('path');
const SRC = path.join(__dirname, '..', 'src');
const E = require(path.join(SRC, 'js', 'engine.js'));
global.CENARIOS = null;
const ARQUIVOS = ['data.js','data_b1.js','data_b2.js','data_b3.js','data_b4.js','data_b5.js','data_b6.js','data_b7.js','data_cats.js','data_perigo.js','data_certo.js'];
let src = ARQUIVOS.map(f => fs.readFileSync(path.join(SRC, 'data', f), 'utf8')).join('\n')
  .replace(/const (CENARIOS|PERFIS|OPCOES|REGRAS_TEXTO|CERTO|CERTO_CAT|PERIGO|PERIGO_TEXTO|PERIGO_TITULO)\b/g, 'global.$1');
eval(src);
const rows=[]; const problems=[];
for (const c of CENARIOS){
  const vs = c.variantes || [c];
  for (const v of vs){
    const cfg = {fatores:v.fatores,riscos:v.riscos,durabNominal:v.durabNominal,custoGambiarra:v.custoGambiarra,custoCorreto:v.custoCorreto,danoColateral:v.danoColateral,horizonteHoras:c.horizonte,perigo:(PERIGO[c.id]||{}).nivel||null,unidadeDurab:c.unidadeDurab};
    const r=E.simular(cfg);
    const e=v.estresse||c.estresse;
    // validações de estrutura
    for (const k of ['titulo','categoria','resumo','durabRotulo','horizonteTxt','unidadeDurab']) if(!c[k]) problems.push(c.id+' falta '+k);
    if(!(v.veredito||c.veredito)||(v.veredito||c.veredito).length!==3) problems.push(c.id+' veredito != 3');
    if(!(v.ficha||c.ficha)||(v.ficha||c.ficha).length!==4) problems.push(c.id+' ficha != 4');
    const fa = e.falhaEm; 
    if (fa!=null && (fa<=e.de || fa>e.ate)) problems.push(c.id+' falhaEm fora do range');
    let prev=-1e9; for(const p of e.passos){ if(p.a<=prev) problems.push(c.id+' passos fora de ordem'); prev=p.a; if(fa!=null && p.a>=fa) problems.push(c.id+' passo >= falha ('+p.a+')'); if(p.a<e.de||p.a>e.ate) problems.push(c.id+' passo fora do range'); }
    if(fa!=null && !e.falha) problems.push(c.id+' falta texto de falha');
    if(fa==null && !e.ok) problems.push(c.id+' falta texto ok');
    rows.push({_id:c.id,id:(c.id+(v.nome?':'+v.nome:'')).slice(0,26),cat:c.categoria.slice(0,12),V:r.viabilidade,R:r.risco,nivel:r.nivel.nome,durab:r.durab.numero+' '+r.durab.rotulo,saldo:Math.round(r.economia.saldo),selo:r.selo.texto});
  }
}

// validação do sistema de perigo
const ids = new Set(CENARIOS.map(c=>c.id));
for (const k of Object.keys(PERIGO)) { if(!ids.has(k)) problems.push('PERIGO sem cenário: '+k); const p=PERIGO[k]; if(!['critico','atencao'].includes(p.nivel)||!p.tipos.length||!p.quando||!p.nunca) problems.push('PERIGO incompleto: '+k); }
for (const c of CENARIOS) if(!CERTO[c.id]) problems.push('sem CERTO: '+c.id);
for (const r of rows) { const id=r._id; const pg=(PERIGO[id]||{}).nivel; if(pg==='critico' && r.selo!=='PERIGO GRAVE') problems.push('critico sem carimbo '+id); if(pg && r.selo==='APROVADO') problems.push('perigoso APROVADO '+id); if(!pg && r.R>=45) console.log('AVISO sem perigo e R>=45:', id, r.R, r.selo); }
console.log('com perigo:', Object.keys(PERIGO).length, '| critico:', Object.values(PERIGO).filter(p=>p.nivel==='critico').length);
const vistos = new Set(); for (const c of CENARIOS) { if (vistos.has(c.id)) problems.push('id duplicado: '+c.id); vistos.add(c.id); }
if (process.argv.includes('--tabela')) console.table(rows.map(({_id, ...r}) => r));
console.log('cenários:', CENARIOS.length, '| linhas simuladas:', rows.length, '| problemas:', problems.length);
if (problems.length) { console.log(problems.join('\n')); process.exit(1); }
