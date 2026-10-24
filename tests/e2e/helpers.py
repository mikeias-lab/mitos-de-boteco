"""Utilidades dos testes E2E. Abre o index.html real (sem stubs de CSS) via file://.
Requer: pip install playwright && playwright install chromium"""
import pathlib
from playwright.async_api import async_playwright

RAIZ = pathlib.Path(__file__).resolve().parents[2]
URL = (RAIZ / 'index.html').as_uri()
EXTERNOS = ('fonts.googleapis.com', 'fonts.gstatic.com')  # fontes do Google: bloqueadas em ambientes sem internet


async def abrir(browser, largura=1280, altura=900, movimento_reduzido=True):
    ctx = await browser.new_context(viewport={'width': largura, 'height': altura},
                                    reduced_motion='reduce' if movimento_reduzido else 'no-preference')
    pg = await ctx.new_page()
    erros = []
    pg.on('pageerror', lambda e: erros.append('PAGEERROR ' + str(e)))
    pg.on('console', lambda m: erros.append('CONSOLE ' + m.text) if m.type == 'error' and not any(x in m.text for x in EXTERNOS) else None)

    async def rota(route):
        if any(x in route.request.url for x in EXTERNOS):
            await route.fulfill(status=200, content_type='text/css', body='')
        else:
            await route.continue_()
    await pg.route('**/*', rota)
    await pg.goto(URL, wait_until='domcontentloaded')
    await pg.wait_for_selector('#lista .cen', state='attached')
    return pg, erros


class Relatorio:
    def __init__(self):
        self.falhas = []
        self.total = 0

    def check(self, nome, ok, detalhe=''):
        self.total += 1
        print(('OK    ' if ok else 'FALHA ') + nome + (('  -> ' + str(detalhe)) if (detalhe and not ok) else ''))
        if not ok:
            self.falhas.append(nome)

    def fim(self):
        print('\n%d verificações, %d falhas' % (self.total, len(self.falhas)))
        raise SystemExit(1 if self.falhas else 0)
