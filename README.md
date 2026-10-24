# Rastreador de Mitos de Boteco & Calculadora de Gambiarras

Site de humor em página única: o usuário escolhe uma gambiarra ou mito famoso (ou descreve a própria) e recebe um **laudo carimbado** com viabilidade, risco, durabilidade e custo no longo prazo, mais um teste de estresse animado. É mais comédia do que pesquisa: os números são **estimativas de um modelo simples**, não medições.

- HTML + CSS + JavaScript puros. **Sem framework, sem dependências de execução, sem Tailwind/CDN.**
- O arquivo publicado é um único `index.html` autossuficiente, gerado a partir de `src/`.
- Única dependência externa em tempo de execução: as fontes do Google Fonts (se falharem, o site usa fontes do sistema).
- Idioma: português do Brasil.

> **Regra de ouro do repositório:** `src/` é a fonte da verdade. **Nunca edite o `index.html` à mão**: ele é gerado por `npm run build` e sobrescrito.

## Para quem vai mexer (inclusive o Claude em uma sessão nova)

Não existe memória entre sessões. Este README e o `CLAUDE.md` são o manual. Antes de qualquer mudança: leia as seções "Como o laudo é calculado", "Perigo" e "Decisões de conteúdo".

### Comandos

```bash
npm run build        # gera index.html a partir de src/
npm run build:check  # falha se o index.html estiver desatualizado (roda no CI)
npm test             # testes unitários: estrutura dos dados, regras de perigo, motor (Node >= 18)
npm start            # servidor local em http://localhost:8000
npm run test:e2e     # testes no navegador (precisa de Python + Playwright, ver abaixo)
```

Testes no navegador: `pip install playwright && playwright install chromium`, depois `npm run build && npm run test:e2e`. Eles abrem o `index.html` real em Chromium (desktop e 390 px) e conferem erros de JS, carimbos, alertas, filtro, modo "Minha gambiarra", teste de estresse (amostra) e a busca de parecidos.

### Fluxo para qualquer alteração

1. Editar `src/`.
2. `npm test` e `npm run build`.
3. `npm run test:e2e` (se mexeu em interface, CSS ou busca).
4. Commitar **`src/` e o `index.html` gerado juntos**.

## Estrutura

```
index.html            gerado (é o que o GitHub Pages serve)
og.png                cartão de prévia do link (1200x630), usado nas tags og:image
src/
  html/head.html      <head>: metadados, favicon, fontes
  html/body.html      marcação da página (cabeçalho, catálogo, laudo, rodapé, diálogo)
  css/base.css        reset (equivalente ao preflight do Tailwind 3) + poucas utilitárias
  css/style.css       todo o visual (tokens de cor no :root)
  js/engine.js        motor de cálculo (funções puras, testado em Node)
  js/busca.js         busca de "parecidos" no modo Minha gambiarra
  js/ui.js            estado, laudo, alerta de perigo, cálculo do modo custom
  js/ui2.js           teste de estresse, catálogo, formulário custom, init()
  data/data.js        regras de texto + cenários originais (CENARIOS)
  data/data_b1..b8.js lotes de cenários (cada lote faz CENARIOS.push(...))
  data/data_cats.js   perfis das 11 categorias do modo custom
  data/data_perigo.js nível de perigo por cenário + regras de texto do modo custom
  data/data_certo.js  "jeito certo" de cada cenário
  data/data_popular.js ids do filtro "Mais famosos" (escolha editorial)
scripts/build.js      concatena tudo em index.html
tests/unit.test.js    testes em Node
tests/e2e/            testes em navegador (Python + Playwright)
```

A **ordem dos arquivos** no build importa (tudo vira um único `<script>`): motor → dados → `busca.js` → `ui.js` → `ui2.js`. Ela está listada em `scripts/build.js`. Um arquivo de dados novo precisa ser adicionado a essa lista **e** à lista `ARQUIVOS` em `tests/unit.test.js`.

## Como o laudo é calculado (`src/js/engine.js`)

Cada cenário tem três fatores entre 0 e 1: **A** (a ideia funciona na física/química?), **M** (o material improvisado serve?), **C** (as condições de uso ajudam?).

- **Viabilidade** = `round(100 × (0,40·A + 0,35·M + 0,25·C))`.
- **Risco do modelo** = `round(100 × (1 − Π(1 − pᵢ)))` sobre quatro riscos (`calor`, `eletrico`, `terceiros`, `colateral`), cada um de 0 a 1. Níveis: abaixo de 30 Baixo, abaixo de 60 Médio, 60 ou mais Extremo.
- **Durabilidade** = `nominal × (viabilidade/100)²`.
- **Economia**: compara o gasto repetido da gambiarra (limitado a 12 repetições) com o custo do jeito certo mais o dano colateral esperado.
- **Carimbo** (`calcSelo`): ver tabela abaixo. O carimbo é decidido por viabilidade, risco **e perigo**.

| Condição (nesta ordem) | Carimbo |
|---|---|
| perigo crítico | PERIGO GRAVE |
| risco ≥ 60 | REPROVADO |
| viabilidade ≥ 75 e risco < 30 | APROVADO |
| viabilidade < 30 | MITO CONFIRMADO |
| viabilidade < 45 e risco < 35 | FUNCIONA POUCO |
| viabilidade ≥ 45 | COM RESSALVAS |
| demais | REPROVADO |

Se o perigo for de **atenção**, um APROVADO vira COM RESSALVAS.

Todos os números dos cenários (fatores, riscos, R$, tempos do teste de estresse) são **estimativas do projeto**, calibradas para o carimbo "fazer sentido" e para o humor funcionar. Não são resultados de ensaio. Isso está dito na página, e deve continuar dito.

## Perigo (`src/data/data_perigo.js`)

Princípio do projeto: **uma gambiarra perigosa nunca pode ser aprovada, e o risco precisa ficar claro.**

- `PERIGO[id] = { nivel: 'critico' | 'atencao', tipos: [...], quando, nunca }`.
- **Piso de risco**: `PISO_PERIGO = { critico: 60, atencao: 30 }`. O risco exibido é `máx(risco do modelo, piso)`. Assim um item perigoso não parece "baixo risco" só porque os números do modelo ficaram otimistas.
- Crítico força o carimbo **PERIGO GRAVE** e um painel vermelho. Atenção mostra um alerta laranja e impede o APROVADO.
- O teste unitário garante: todo crítico tem carimbo PERIGO GRAVE, nenhum item com alerta é APROVADO, e todo id em `PERIGO` existe.
- **Modo "Minha gambiarra"**: o alerta é automático, por palavras-chave (`PERIGO_TEXTO`, comparadas sem acento) somadas aos controles deslizantes e à categoria. **Pode errar para os dois lados** (deixar passar algo perigoso ou alertar à toa). O rodapé avisa isso.

## Como adicionar um mito ou gambiarra

Mexa só em dados. **O motor e a interface não mudam.**

1. **Bloco do cenário** em um lote novo (`src/data/data_b8.js`, começando com `CENARIOS.push(`) ou no fim do último lote. Modelo:

```js
{
  id: 'sal-vinho',                         // minúsculas, sem acento, com hífen; único
  categoria: 'Cozinha e limpeza',          // categoria existente (ou nova: o chip aparece sozinho)
  titulo: 'Sal na mancha de vinho tinto',
  resumo: 'Frase curta e bem-humorada.',
  unidadeDurab: 'horas',                   // 'km' ou 'horas'
  durabRotulo: 'Janela para agir antes da mancha fixar',
  horizonte: 168, horizonteTxt: '1 semana',
  fatores: { A: 0.55, M: 0.50, C: 0.40 },
  riscos: { calor: 0, eletrico: 0, terceiros: 0, colateral: 0.10 },
  durabNominal: 12, custoGambiarra: 1, custoCorreto: 20, danoColateral: 300,
  ficha: [ ['Segundo a fonte', '...'], ['Ressalvas', '...'], ['Outros métodos (fonte)', '...'], ['Evidência', '...'] ],  // exatamente 4
  estresse: {
    variavel: 'Minutos até começar a agir', unidade: 'min', de: 0, ate: 60, falhaEm: 30,   // falhaEm: null = nunca falha
    passos: [ { a: 2, t: 'texto' }, { a: 15, t: 'texto' } ],   // 'a' crescente, >= de e < falhaEm
    falha: 'Texto quando falha.', ok: ''                        // 'ok' é obrigatório se falhaEm for null
  },
  veredito: ['parágrafo 1 (HTML, use <b>)', 'parágrafo 2', 'parágrafo 3'],   // exatamente 3
  fontes: [{ t: 'Título da fonte', u: 'https://...' }]
}
```
   Opcional: `variantes: [...]` (ver `data.js`) para versões do mesmo cenário.

2. **`data_certo.js`**: uma linha `'id': 'Como seria o jeito certo, em uma frase.'` (obrigatório; o teste falha sem ela).
3. **`data_perigo.js`**, **se houver risco real** (eletricidade, gás, fogo, produto químico, freio/direção, remédio/saúde): entrada em `PERIGO` com `nivel`, `tipos`, `quando` e `nunca` (a regra de ouro). Na dúvida, marque `atencao`.
4. `npm test` (valida estrutura, ordem dos passos, alertas) e depois `npm run build`.
5. Se criou arquivo novo de lote: incluí-lo em `scripts/build.js` e em `tests/unit.test.js`.
6. Opcional: se o item for dos mais conhecidos, acrescente o id em `data_popular.js` (filtro "Mais famosos").

**Cuidados com a fonte:** só afirme na ficha e no veredito o que a fonte realmente diz; o que for raciocínio nosso deve estar marcado como tal ("observação do projeto"). Prefira fonte forte (órgão público, fabricante, universidade, imprensa séria). Site de dicas e estilo de vida serve para provar que o mito é *popular*, não que ele *funciona*. Não invente fonte, preço nem estudo.

## Filtros do catálogo

Chips acima da lista (numa barra que rola na horizontal; no computador a roda do mouse também rola de lado). Clicar de novo no chip ativo volta a "Todos".

- **Mais famosos:** escolha editorial do projeto (`data_popular.js`). **Não é medição de popularidade.**
- **Aprovados:** só os que recebem o carimbo APROVADO. Ficam poucos de propósito: o carimbo é difícil de ganhar. COM RESSALVAS não entra.
- **Com alerta:** itens com aviso de perigo (`PERIGO`).
- Uma categoria por chip.

## Compartilhar

- Cada laudo tem um link direto: `.../#c=<id>` (o endereço da barra já muda ao escolher um item). Abrir o link seleciona o laudo.
- O botão **Compartilhar** abre um diálogo com o link, "Copiar link" e atalhos para WhatsApp, Facebook, X, Telegram e e-mail. Em celular com suporte, aparece também o menu nativo de compartilhar (que inclui o Instagram).
- **Limites:** o Instagram não oferece link de compartilhamento para sites, então só há "copiar e colar" ou o menu nativo. A prévia do link (título, descrição e `og.png`) é **a mesma para qualquer laudo**, porque o site é estático e os servidores das redes não leem o `#`. Prévia por laudo exigiria uma página por item.
- As tags `og:url`, `og:image` e `canonical` apontam para `https://mikeias-lab.github.io/mitos-de-boteco/`. Se o endereço mudar, atualize `src/html/head.html`.

## Decisões de conteúdo (resumo do que foi combinado)

- **Tom:** comédia leve com base em fonte, não manual técnico. Itens muito técnicos ou de nicho foram removidos (por exemplo: esmerilhadeira sem proteção, óleo de carro em moto, WD-40 em corrente, gato de energia, terra no neutro).
- **Segurança:** o site nunca ensina a executar procedimento perigoso passo a passo; ele diz por que é perigoso e qual é o jeito certo.
- **Fonte fraca, item fora:** ideias sem fonte aproveitável não entram (ficaram de fora, por exemplo, Super Bonder em corte e esmalte incolor na trinca do para-brisa).
- **Só entram mitos que "funcionam ou não funcionam".** As métricas medem "o truque dá resultado?". Crenças puras (simpatia, superstição) ficaram de fora; um formato "mito ou verdade" separado seria o caminho, se um dia fizer falta.

## Limitações conhecidas (honestidade)

- Números de R$, tempos do teste de estresse, fatores e níveis de perigo são **estimativas do projeto**, não dados medidos.
- Várias fontes são sites de notícia/estilo de vida, não estudos. Valem para "o mito existe", e não para "o mito funciona".
- A busca de parecidos casa **palavras, não sentido**: 59 de 61 frases da bateria de teste (`tests/e2e/busca.py`) dão o resultado esperado. Falhas conhecidas: "colar o retrovisor com durex" (acha itens de fita sem relação) e frases de uma palavra só ("fio").
- Testado em Chromium (desktop e 390 px). **Safari e Firefox não foram testados.**
- O alerta automático do modo "Minha gambiarra" é heurístico.
- As fontes (Google Fonts) dependem de internet. Offline, entram as fontes do sistema.
- A prévia de compartilhamento é a mesma para todos os laudos (ver "Compartilhar").
- Quase todas as fontes do lote 5 são reportagens de um site só por item; a ficha de cada item diz o que a fonte afirma e o que é observação do projeto.

## Hospedagem (GitHub Pages)

1. No repositório: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`**.
2. O arquivo `.nojekyll` já existe; o `index.html` na raiz é servido como está.
3. O endereço sai como `https://<usuario>.github.io/<repositorio>/`. Todos os caminhos do site são relativos (não há arquivos externos próprios), então funciona em subpasta.
4. Alternativas equivalentes: Netlify ou Cloudflare Pages (publicar a raiz, sem comando de build, já que o `index.html` está versionado).
5. Depois de publicar: abrir no celular e no desktop, testar um item de perigo, o modo "Minha gambiarra" e o botão "Ler laudo completo".

## Licença

Ainda **não definida** (`"license": "UNLICENSED"` no `package.json`): sem licença, ninguém mais pode reutilizar o código. Escolha uma antes de divulgar, se quiser permitir reutilização (MIT é a mais comum).
