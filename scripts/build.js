#!/usr/bin/env node
// Gera o index.html (autossuficiente: CSS e JS embutidos) a partir de src/.
// Uso: node scripts/build.js   |   node scripts/build.js --check  (falha se o index.html estiver desatualizado)
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const RAIZ = path.join(__dirname, '..');
const SRC = path.join(RAIZ, 'src');
const SAIDA = path.join(RAIZ, 'index.html');
const ler = (...p) => fs.readFileSync(path.join(SRC, ...p), 'utf8');

// Ordem importa: os arquivos viram um único <script> e compartilham o escopo.
const DADOS = [
  'data.js', 'data_b1.js', 'data_b2.js', 'data_b3.js', 'data_b4.js', 'data_b5.js', 'data_b6.js', 'data_b7.js', 'data_b8.js',
  'data_cats.js', 'data_perigo.js', 'data_certo.js', 'data_popular.js',
];
const UI = ['busca.js', 'ui.js', 'ui2.js'];

// O engine.js termina com um bloco "module.exports" só para os testes em Node; no navegador ele é removido.
const engine = ler('js', 'engine.js').replace(/\n?\/\* Exporta para teste[\s\S]*$/, '\n');

const js = [
  '/* ===== Motor de cálculo ===== */', engine,
  '/* ===== Base de cenários ===== */', ...DADOS.map((f) => ler('data', f)),
  '/* ===== Interface ===== */', ...UI.map((f) => ler('js', f)),
].join('\n');

if (/<\/script/i.test(js)) throw new Error('Algum arquivo JS contém "</script": isso quebraria o HTML embutido.');

const html = ler('html', 'head.html') + ler('css', 'base.css') + '\n' + ler('css', 'style.css') + '</style>\n</head>\n<body>\n' +
  ler('html', 'body.html') + '\n<script>\n' + js + '\n</script>\n</body>\n</html>\n';

// Confere a sintaxe do JS gerado antes de escrever.
const tmp = path.join(require('os').tmpdir(), 'mitos-build-check.js');
fs.writeFileSync(tmp, js);
try { execFileSync(process.execPath, ['--check', tmp], { stdio: 'pipe' }); }
catch (e) { console.error('Erro de sintaxe no JS gerado:\n' + e.stderr); process.exit(1); }

if (process.argv.includes('--check')) {
  const atual = fs.existsSync(SAIDA) ? fs.readFileSync(SAIDA, 'utf8') : '';
  if (atual !== html) { console.error('index.html está desatualizado. Rode: npm run build'); process.exit(1); }
  console.log('index.html está em dia.');
} else {
  fs.writeFileSync(SAIDA, html);
  console.log('OK: index.html gerado (' + Math.round(html.length / 1024) + ' KB).');
}
