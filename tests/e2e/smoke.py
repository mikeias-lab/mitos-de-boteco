"""Teste de fumaça E2E do index.html gerado. Uso: python3 tests/e2e/smoke.py"""
import asyncio
from playwright.async_api import async_playwright
from helpers import abrir, Relatorio

R = Relatorio()


async def estresse(pg, id_):
    await pg.click('#lista .cen[data-id="%s"]' % id_)
    await pg.click('#btn-stress')
    await pg.wait_for_function("document.querySelector('#btn-stress span').textContent==='Simular de novo'", timeout=15000)
    return await pg.inner_text('#rig-result')


async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()

        # ---------- desktop ----------
        pg, erros = await abrir(b, 1280, 900)
        R.check('html lang=pt-BR', await pg.evaluate("document.documentElement.lang") == 'pt-BR')
        N = await pg.evaluate('CENARIOS.length')
        R.check('catálogo mostra todos os cenários', await pg.locator('#lista .cen').count() == N, N)
        R.check('CSS próprio aplicado (flex + fundo escuro)',
                await pg.evaluate("getComputedStyle(document.querySelector('.flex')).display") == 'flex'
                and await pg.evaluate("getComputedStyle(document.body).backgroundColor") == 'rgb(20, 17, 15)')
        R.check('aviso de humor visível', await pg.locator('.aviso').is_visible())
        R.check('sem barra horizontal (desktop)', await pg.evaluate("document.documentElement.scrollWidth<=document.documentElement.clientWidth"))

        # desktop: só a lista rola; busca e categorias ficam parados
        info = await pg.evaluate("""()=>{const f=document.querySelector('.ficha'),l=document.getElementById('lista'),b=document.getElementById('busca');
          const y0=b.getBoundingClientRect().top; l.scrollTop=400; const y1=b.getBoundingClientRect().top;
          return {fichaRola:f.scrollHeight>f.clientHeight+1, listaRola:l.scrollHeight>l.clientHeight+1, buscaMoveu:Math.abs(y1-y0)>1}}""")
        R.check('desktop: lista rola sozinha', info['listaRola'], info)
        R.check('desktop: busca fica parada ao rolar a lista', not info['buscaMoveu'], info)
        R.check('desktop: ficha sem segunda barra', not info['fichaRola'], info)
        chips = await pg.evaluate("(()=>{const c=document.getElementById('cat-chips');return {rola:c.scrollWidth>c.clientWidth, nowrap:getComputedStyle(c).flexWrap}})()")
        R.check('categorias em barra horizontal', chips['rola'] and chips['nowrap'] == 'nowrap', chips)
        sobre = await pg.evaluate("[...document.querySelectorAll('#lista .cen')].filter(e=>e.scrollHeight>e.clientHeight+1).length")
        R.check('linhas da lista sem texto vazando (desktop)', sobre == 0, sobre)

        # selos e alertas
        await pg.click('#lista .cen[data-id="gas-fosforo"]')
        R.check('item crítico: selo PERIGO GRAVE', 'PERIGO GRAVE' in await pg.inner_text('#selo'), await pg.inner_text('#selo'))
        R.check('item crítico: alerta visível', await pg.locator('#alerta').is_visible())
        await pg.click('#lista .cen[data-id="coca-ferrugem"]')
        R.check('item sem perigo: alerta oculto', not await pg.locator('#alerta').is_visible())

        # teste de estresse (amostra)
        for id_ in ('arroz', 'gas-fosforo', 'vitamina-b-repelente'):
            res = await estresse(pg, id_)
            R.check('estresse %s termina com resultado' % id_, len(res.strip()) > 5, res)

        # filtro: clicar de novo desmarca
        todos = await pg.locator('#lista .cen').count()
        await pg.click('#cat-chips button[data-c="Elétrica"]')
        filtrado = await pg.locator('#lista .cen').count()
        await pg.click('#cat-chips button[data-c="Elétrica"]')
        R.check('filtro Elétrica reduz e segundo clique volta a Todos', 0 < filtrado < todos and await pg.locator('#lista .cen').count() == todos)
        for chip, nome in (('__perigo', 'Com alerta'), ('__famosos', 'Mais famosos'), ('__aprovados', 'Aprovados')):
            await pg.click('#cat-chips button[data-c="%s"]' % chip)
            n = await pg.locator('#lista .cen').count()
            R.check('chip "%s" filtra' % nome, 0 < n < todos, n)
        sel = await pg.evaluate("[...document.querySelectorAll('#lista .cen .sb')].map(e=>e.textContent)")
        R.check('"Aprovados" só tem carimbo APROVADO', len(sel) > 0 and all(x.strip().upper().startswith('APROV') for x in sel), sel)
        await pg.click('#cat-chips button[data-c="Todos"]')

        # link direto e compartilhar
        await pg.click('#lista .cen[data-id="sal-macarrao"]')
        R.check('escolher item grava #c=id no endereço', (await pg.evaluate('location.hash')) == '#c=sal-macarrao')
        await pg.click('#btn-compartilhar')
        R.check('"Compartilhar" abre o diálogo', await pg.evaluate("document.getElementById('dlg-share').open"))
        url = await pg.input_value('#share-url')
        R.check('link compartilhado leva o id do laudo', url.endswith('#c=sal-macarrao'), url)
        hrefs = await pg.eval_on_selector_all('#share-redes a', 'els=>els.map(e=>e.href)')
        R.check('redes: WhatsApp, Facebook, X, Telegram e e-mail',
                len(hrefs) == 5 and any('wa.me' in h for h in hrefs) and any('facebook.com/sharer' in h for h in hrefs)
                and any('twitter.com/intent' in h for h in hrefs) and any('t.me/share' in h for h in hrefs) and any(h.startswith('mailto:') for h in hrefs), hrefs)
        await pg.keyboard.press('Escape')
        pl, el = await abrir(b, 1280, 900)
        await pl.goto(url.replace('file://', 'file://'), wait_until='domcontentloaded')
        await pl.reload()
        await pl.wait_for_selector('#lista .cen', state='attached')
        R.check('abrir o link seleciona o laudo certo', (await pl.inner_text('#t-laudo')).startswith('Sal na água'), await pl.inner_text('#t-laudo'))

        # laudo completo (diálogo)
        await pg.click('#lista .cen[data-id="gas-fosforo"]')
        await pg.click('#btn-ler')
        R.check('"Ler laudo completo" abre o diálogo', await pg.evaluate("document.getElementById('dlg-laudo').open"))
        await pg.keyboard.press('Escape')

        # modo "Minha gambiarra"
        await pg.click('#tab-custom')
        vis = await pg.evaluate("[...document.querySelectorAll('#laudo > *')].filter(e=>getComputedStyle(e).display!=='none').map(e=>e.id)")
        R.check('custom vazio: só a mensagem de espera', vis == ['vazio-custom'], vis)
        await pg.fill('#in-ideia', 'ligar o fio direto na tomada sem plugue')
        await pg.wait_for_timeout(300)
        R.check('custom: digitar revela o laudo', not await pg.locator('#vazio-custom').is_visible())
        R.check('custom: texto de fio na tomada dispara alerta', await pg.locator('#alerta').is_visible())
        R.check('custom: busca de parecidos mostra algo', await pg.locator('#parecidos .cen, #parecidos a').count() > 0)

        R.check('sem erros de JS/console (desktop)', not erros, erros)

        # ---------- celular ----------
        pm, erros_m = await abrir(b, 390, 800)
        R.check('sem barra horizontal (390px)', await pm.evaluate("document.documentElement.scrollWidth<=document.documentElement.clientWidth"),
                await pm.evaluate("document.documentElement.scrollWidth"))
        await pm.click('#cat-toggle')
        sobre_m = await pm.evaluate("[...document.querySelectorAll('#lista .cen')].filter(e=>e.scrollHeight>e.clientHeight+1).length")
        R.check('linhas da lista sem texto vazando (celular)', sobre_m == 0, sobre_m)
        await pm.click('#lista .cen[data-id="regua-cascata"]')
        R.check('celular: selo visível após escolher item', await pm.locator('#selo').is_visible())
        R.check('sem erros de JS/console (celular)', not erros_m, erros_m)

        await b.close()
    R.fim()

asyncio.run(main())
