# shoptet-deisirup

Custom CSS/JS pro e-shop **deisirup** na platformě Shoptet.

## Soubory
- `shoptet.css` – vizuální úpravy (scoped selektory)
- `shoptet.js` – chování (quantity widget, upsell, popupy …)

## Hosting
GitHub Pages, branch `main`:
- `https://czdsgnr.github.io/shoptet-deisirup/shoptet.css`
- `https://czdsgnr.github.io/shoptet-deisirup/shoptet.js`

## Deploy workflow
Edit → commit → push. GitHub Pages build trvá ~1–2 min, pak stačí refresh e-shopu.

## Vložení do Shoptetu (vývojový režim – bez cache)
Do **Vzhled a obsah → Editor HTML → `<head>`** vlož načítací skript, který
přidává `?t=` timestamp, takže každé načtení bere čerstvou verzi (řeší cache na
mobilu i desktopu):

```html
<script>
(function(){
  var t = '?t=' + Date.now();
  var base = 'https://czdsgnr.github.io/shoptet-deisirup/';
  var l = document.createElement('link');
  l.rel = 'stylesheet'; l.href = base + 'shoptet.css' + t;
  document.head.appendChild(l);
  var s = document.createElement('script');
  s.src = base + 'shoptet.js' + t; s.defer = true;
  document.head.appendChild(s);
})();
</script>
```

Až bude hotovo, přepnout na statický `<link>`/`<script>` s pevným `?v=` (rychlejší
pro návštěvníky, využije cache).

> Pozn.: externí hosting je kvůli limitu Shoptet `<head>` (8192 znaků) – inline
> CSS/JS ho přetéká ("Zkrácený HTML kód").
