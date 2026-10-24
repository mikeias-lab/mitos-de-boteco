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
        R.check('catálogo tem 59 itens', await pg.locator('#lista .cen').count() == 59, await pg.locator('#lista .cen').count())
        R.check('CSS próprio aplicado (flex + fundo escuro)',
                await pg.evaluate("getComputedStyle(document.querySelector('.flex')).display") == 'flex'
                and await pg.evaluate("getComputedStyle(document.body).backgroundColor") == 'rgb(20, 17, 15)')
        R.check('aviso de humor visível', await pg.locator('.aviso').is_visible())
        R.check('sem barra horizontal (desktop)', await pg.evaluate("document.documentElement.scrollWidth<=document.documentElement.clientWidth"))

        # lista não cria segunda barra de rolagem no desktop
        ov = await pg.evaluate("getComputedStyle(document.getElementById('lista')).overflowY")
        R.check('lista sem rolagem interna (desktop)', ov in ('visible', 'clip'), ov)

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
        await pg.click('#cat-chips button[data-c="__perigo"]')
        R.check('chip "Com alerta" filtra', 0 < await pg.locator('#lista .cen').count() < todos)
        await pg.click('#cat-chips button[data-c="Todos"]')

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
        await pm.click('#lista .cen[data-id="regua-cascata"]')
        R.check('celular: selo visível após escolher item', await pm.locator('#selo').is_visible())
        R.check('sem erros de JS/console (celular)', not erros_m, erros_m)

        await b.close()
    R.fim()

asyncio.run(main())
