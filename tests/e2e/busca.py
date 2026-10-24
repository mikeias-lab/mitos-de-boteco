"""Bateria da busca de "parecidos" (modo Minha gambiarra). Uso: python3 tests/e2e/busca.py
Cada caso: (frase, id esperado entre os resultados | None = não deve achar nada)."""
import asyncio
from playwright.async_api import async_playwright
from helpers import abrir, Relatorio

MINIMO = 59  # de 61; ver README (limitações conhecidas)
CASOS = [
 ('colar o retrovisor com durex', None),
 ('celular caiu na água', 'arroz'),
 ('secar iphone molhado', 'arroz'),
 ('usar óleo de cozinha na corrente da minha bike', 'oleo-cozinha-corrente'),
 ('capacete que caiu no chão', 'capacete-queda'),
 ('tapar vazamento no cano com durex', 'fita-cano'),
 ('jogar água fervendo na pia entupida', 'agua-fervente-pvc'),
 ('desentupir ralo com bicarbonato', 'bicarbonato-vinagre-pia'),
 ('soda cáustica no ralo', 'soda-caustica-pia'),
 ('sal grosso para acabar com o mato', 'sal-mata-mato'),
 ('gelo na orquídea', 'gelo-orquidea'),
 ('areia no vaso de planta por causa da dengue', 'areia-prato-vaso'),
 ('ligar bomba da piscina com extensão emendada', 'extensao-emendada-quintal'),
 ('cano na chave de roda pra apertar pneu', 'cano-chave-roda'),
 ('usar chave de fenda para abrir lata de tinta', 'chave-fenda-alavanca'),
 ('cortar o pino da tomada da furadeira', 'pino-terra-cortado'),
 ('misturar cloro com vinagre', 'sanitaria-vinagre'),
 ('papel alumínio no roteador wifi', 'aluminio-roteador'),
 ('colocar pasta de dente no processador', 'pasta-dente-termica'),
 ('deixar carregando de madrugada', 'carga-noite'),
 ('tampar furo do escapamento', 'escapamento'),
 ('pneu careca', 'moeda-pneu'),
 ('carro descendo a serra desengrenado', 'banguela'),
 ('ligar régua em outra régua', 'regua-cascata'),
 ('trocar disjuntor por um maior porque cai', 'disjuntor-maior'),
 ('procurar vazamento de gás com isqueiro', 'gas-fosforo'),
 ('álcool para acender a churrasqueira', 'alcool-churrasqueira'),
 ('misturar álcool com água sanitária', 'alcool-sanitaria'),
 ('carvão dentro de casa para esquentar', 'braseiro-casa'),
 ('faca para tirar o gelo do freezer', 'faca-congelador'),
 ('bateria do celular estufada', 'bateria-estufada'),
 ('celular quente no freezer', 'celular-freezer'),
 ('ligar o fio direto na tomada sem plugue', 'fio-tomada'),
 ('pendurar garrafa com água para espantar mosca', 'mosca-pet'),
 ('limpar janela com jornal', 'jornal-vidro'),
 ('congelar sapato apertado', 'sapato-freezer'),
 ('coca cola para tirar ferrugem do parafuso', 'coca-ferrugem'),
 ('assoprar fita do super nintendo', 'nintendo-soprar'),
 ('modo avião carrega mais rápido', 'modo-aviao'),
 ('fechar os aplicativos economiza bateria', 'apps-segundo-plano'),
 ('chupeta no carro bateria arriada', 'chupeta-carro'),
 ('fósforo na boca para cortar cebola', 'cebola-fosforo'),
 ('descongelar carne na pia', 'descongelar-pia'),
 ('sal na mancha de vinho', 'sal-vinho'),
 ('pasta de dente na queimadura', 'pasta-dente-queimadura'),
 ('vitamina b contra pernilongo', 'vitamina-b-repelente'),
 ('ar condicionado no 16 gela mais rápido', 'ar-condicionado-16'),
 ('esquentar a casa com o forno do fogão', 'fogao-aquecer-casa'),
 ('lápis no zíper que travou', 'lapis-ziper'),
 ('colocar sal e gelo na cerveja', 'cerveja-sal-gelo'),
 ('esqueci a cerveja no freezer', 'cerveja-freezer'),
 ('colher de pau para a água não transbordar', 'colher-pau-panela'),
 ('sal na água do macarrão ferve mais rápido', 'sal-macarrao'),
 ('sopa ficou salgada batata', 'batata-sopa-salgada'),
 ('bicarbonato para tirar cheiro da geladeira', 'bicarbonato-geladeira'),
 ('esponja no micro-ondas', 'esponja-microondas'),
 ('limpar prata com papel alumínio', 'prata-aluminio'),
 ('tirar o carregador da tomada economiza energia', 'carregador-tomada'),
 ('lavar o carro com detergente', 'detergente-carro'),
 ('xyz abc', None),
 ('fio', None),
]


async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg, erros = await abrir(b)
        R = Relatorio()
        acertos = 0
        for frase, esperado in CASOS:
            r = await pg.evaluate("(t)=>parecidosCom(t).map(c=>c.id)", frase)
            ok = (esperado is None and not r) or (esperado is not None and esperado in r)
            acertos += ok
            if not ok:
                print('erro:', frase, '->', r, '(esperado %s)' % esperado)
        print('busca: %d/%d acertos (mínimo %d)' % (acertos, len(CASOS), MINIMO))
        R.check('busca atinge o mínimo', acertos >= MINIMO)
        R.check('sem erros de JS', not erros, erros)
        await b.close()
        R.fim()

asyncio.run(main())
