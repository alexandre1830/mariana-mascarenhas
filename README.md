# Teacher Mari — Site institucional

Site institucional de múltiplas páginas para a professora de inglês **Mariana Mascarenhas (Teacher Mari)**.
HTML + CSS + JavaScript puro (vanilla), **sem framework e sem build**. Mobile-first, focado em converter o tráfego do Instagram em **pré-inscrições** via formulário.

---

## 1. Como rodar localmente

O cabeçalho e o rodapé são injetados por um único arquivo (`js/components.js`) para evitar duplicação. Por isso, **rode um servidor local** (não abra direto por duplo-clique para ter o comportamento ideal de navegação):

```bash
# opção 1 — Node (recomendado)
npx serve

# opção 2 — Python
python -m http.server 8000

# opção 3 — VS Code: extensão "Live Server" → "Go Live"
```

Depois abra `http://localhost:3000` (serve) ou `http://localhost:8000` (python).

> Como a injeção usa `innerHTML` (e não `fetch`), o site também funciona em `file://`, mas um servidor local garante caminhos e cache corretos.

---

## 2. Estrutura de arquivos

```
index.html              HOME (página principal)
sobre.html              Quem é a Mari
metodologia.html        Motivos + Como funcionam as aulas + Study Plan
planos.html             Modalidades + Informações importantes
depoimentos.html        Depoimentos (grade com hover)
inscricao.html          FORMULÁRIO de pré-inscrição (destino do CTA principal)
politica-privacidade.html  Política de Privacidade (LGPD)
css/tokens.css          Variáveis de marca (cores, fontes, espaçamento)
css/styles.css          Estilos e componentes
js/components.js        Header + footer + menu hambúrguer (fonte única)
js/main.js              Scroll reveal, contadores, acordeão, carrossel, formulário
assets/icons/           Ícones SVG autorais
assets/img/             Fotos (placeholders SVG — substituir por fotos reais)
assets/logo/            Wordmark
favicon.svg
```

---

## 3. Editar textos, preços e contatos

| O que mudar | Onde |
|---|---|
| **Textos das páginas** | direto no `.html` correspondente |
| **Preços dos planos** | `planos.html` e a prévia em `index.html` (procure por `R$`) |
| **Telefone / Instagram / e-mail** | topo de `js/components.js` (`WHATS_URL`, `INSTAGRAM_URL`, `EMAIL`) — atualiza header, footer e botão flutuante de uma vez |
| **Itens do menu** | array `NAV` em `js/components.js` |
| **Logo** | `assets/logo/teacher-mari.png` (referenciado em `js/components.js`). É recortado por CSS (`.brand-logo`) para remover o espaço em branco interno; ajuste `object-position`/`width`/`height` em `css/styles.css` se trocar por outra arte |
| **FAQ** | seção `#faq` em `index.html` (acordeão). Já não existe página separada — o link do menu/rodapé aponta para `index.html#faq` |
| **Cores e fontes** | `css/tokens.css` |
| **Tamanho geral da fonte** | `html { font-size: ... }` no topo de `css/styles.css` (controla a escala global) |
| **Ano da campanha (“2026”)** | `inscricao.html` (campo "Por que você decidiu estudar inglês em 2026?") e textos de CTA |

O **estado ativo** do menu (página atual) é detectado automaticamente pelo nome do arquivo.

---

## 4. Trocar as fotos

Os arquivos em `assets/img/*.svg` são **placeholders**. Para usar fotos reais:

1. Exporte as fotos em **WebP** (ou AVIF) otimizado. Proporções sugeridas:
   - `mari-hero` → **4:5** (ex.: 1080×1350)
   - `mari-sobre` → **4:5**
   - `mari-sobre-2` → **1:1**
   - `mari-contato` → **4:5**
2. Salve em `assets/img/` (ex.: `mari-hero.webp`).
3. No HTML, troque o `src` do `<img class="ph-photo" ...>`. Para responsividade ideal, use `<picture>`/`srcset`:

```html
<picture>
  <source type="image/avif" srcset="assets/img/mari-hero.avif" />
  <source type="image/webp" srcset="assets/img/mari-hero.webp" />
  <img class="ph-photo" src="assets/img/mari-hero.webp" width="1080" height="1350"
       alt="Teacher Mari, professora de inglês" loading="lazy" />
</picture>
```

> Mantenha sempre o atributo `alt` descritivo (acessibilidade/SEO).

**OG image (compartilhamento no WhatsApp/Instagram):** exporte um `assets/img/og-image.jpg` (1200×630) e troque as meta tags `og:image` / `twitter:image` em cada página de `.svg` para `.jpg` (Facebook/WhatsApp não renderizam SVG no preview).

---

## 5. Plugar o serviço de formulário

### Opção escolhida: Formspree (recomendada — funciona em qualquer host)

1. Crie uma conta em [formspree.io](https://formspree.io) e um novo form.
2. Copie o endpoint (algo como `https://formspree.io/f/abcdwxyz`).
3. Abra `js/main.js` e cole na constante no topo:

```js
var FORM_ENDPOINT = "https://formspree.io/f/abcdwxyz";
```

Pronto. O envio é feito via `fetch` (sem recarregar a página) e mostra a tela de sucesso.

> **Modo demonstração:** enquanto `FORM_ENDPOINT` estiver vazio, o formulário valida e mostra a tela de sucesso **sem enviar de verdade** — útil para testar o visual.

### Alternativa: Netlify Forms (se hospedar na Netlify)

O `inscricao.html` já vem preparado: o `<form>` tem `data-netlify="true"`, `netlify-honeypot="_gotcha"` e o campo oculto `form-name`. Para usar o Netlify em vez do Formspree:

1. Deixe `FORM_ENDPOINT = ""` em `js/main.js`.
2. No `js/main.js`, troque a chamada de sucesso do modo demonstração por um `form.submit()` nativo **ou** poste com `fetch` para a própria URL (`action`). O caminho mais simples: remova o `e.preventDefault()` após a validação para deixar o Netlify capturar o POST nativo.
3. Faça deploy na Netlify — os envios aparecem em **Forms** no painel.

### Fallback (sempre disponível)

Abaixo do formulário há um link para o **Google Forms** existente da professora:
`https://forms.gle/FXvgFFuVtUdAfoEP8` — e o **WhatsApp** como canal alternativo.

### Pré-seleção de plano

Os botões dos planos abrem `inscricao.html?plano=vip` ou `?plano=grupo`. O JS marca automaticamente a opção correspondente no formulário.

---

## 6. Deploy (Cloudflare Pages / Netlify / Vercel)

Como é um site estático, basta apontar para a raiz do projeto (sem comando de build).

- **Cloudflare Pages:** conecte o repositório → *Build command:* (vazio) → *Output directory:* `/` (raiz).
- **Netlify:** arraste a pasta no painel **ou** conecte o repo → *Publish directory:* `.`.
- **Vercel:** *Framework Preset:* **Other** → sem build → *Output:* raiz.

Antes de publicar:
- [ ] Configurar `FORM_ENDPOINT` (Formspree) ou ativar Netlify Forms.
- [ ] Substituir os placeholders de foto por fotos reais.
- [ ] Exportar e referenciar o `og-image.jpg`.
- [ ] Ajustar o domínio nos `<link rel="canonical">` e nas meta `og:url`.

---

## 7. Acessibilidade, performance e SEO

- HTML semântico, headings em ordem, `alt` em imagens, foco visível, `aria-*` no menu, acordeão e formulário.
- Menu hambúrguer com foco preso, fecha no ESC e ao clicar fora, trava o scroll do body.
- Animações via IntersectionObserver + CSS, com `prefers-reduced-motion` respeitado.
- `<title>` e `meta description` próprios por página; Open Graph/Twitter; JSON-LD (`Person` na Home, `FAQPage` no FAQ).
- Fontes com `display=swap`.
