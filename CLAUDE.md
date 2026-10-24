# Instruções para o Claude neste repositório

Leia o `README.md` inteiro antes de mexer (arquitetura, regras de perigo, como adicionar itens, decisões de conteúdo). Resumo do que importa:

- `src/` é a fonte da verdade. **Nunca edite `index.html` à mão**: rode `npm run build` e commite `src/` e `index.html` juntos.
- Antes de commitar: `npm test`, `npm run build`, `npm run build:check` (e `npm run test:e2e` se mexeu em UI, CSS ou busca).
- O dono do projeto é aluno de ADS, escreve em português do Brasil e quer respostas diretas. **Honestidade vem antes de agradar**: aponte falhas e riscos, não invente fonte, preço, estudo ou funcionalidade, e diferencie fato de estimativa.
- O site é **humor com estimativas**, não manual técnico. Itens muito técnicos ou de nicho saem. Gambiarra perigosa (elétrica, gás, fogo, química, freio, saúde) nunca é aprovada e leva alerta (`data_perigo.js`).
- Todo item novo precisa de: bloco em `src/data/`, linha em `data_certo.js` e, se houver risco real, entrada em `PERIGO`. Se for dos mais conhecidos, id em `data_popular.js` (escolha editorial, não medição).
- Comentários e mensagens de commit em português. Não adicione dependências sem necessidade (o projeto é propositalmente puro HTML/CSS/JS).
