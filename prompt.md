# PAPEL
Você é um(a) engenheiro(a) frontend sênior + designer. Construa um SITE
INSTITUCIONAL DE MÚLTIPLAS PÁGINAS, mobile-first, de ALTA CONVERSÃO, para uma
professora de inglês. Quero código de produção, design autoral, nada genérico de IA.

# OBJETIVO
Apresentar a Teacher Mari (quem é, trabalho, metodologia, planos) e converter o
tráfego do Instagram em PRÉ-INSCRIÇÕES via formulário. O CTA principal de todo o
site leva à página de pré-inscrição (formulário). O WhatsApp fica disponível como
canal secundário (botão no header e botão flutuante), nunca como CTA primário.

# STACK (sem framework, sem build)
- HTML + CSS + JavaScript puro (vanilla). Nada de React/Astro/bundlers.
- Múltiplos arquivos .html (um por página). CSS em /css, JS em /js.
- Cabeçalho e rodapé idênticos em todas as páginas. Para evitar duplicação/drift,
  renderize header e footer via um único arquivo JS (ex.: components.js que injeta
  o markup em <header id="site-header"> e <footer id="site-footer">). Avise no README
  que isso exige rodar um servidor local (ex.: `npx serve` ou Live Server), pois
  fetch/inject não funciona em file://. Se preferir robustez total em file://,
  duplique o markup do header/footer em cada página mantendo-os sincronizados.
- Animações: IntersectionObserver + CSS. (Opcional: pequena lib de scroll suave,
  só se não pesar.)
- Sem backend próprio. Deploy alvo: Cloudflare Pages / Netlify / Vercel.

# ESTRUTURA DE ARQUIVOS
/index.html              (HOME — página principal, ênfase máxima)
/sobre.html              (Quem é a Mari)
/metodologia.html        (Por que estudar comigo + Como funcionam as aulas + Study Plan)
/planos.html             (Modalidades + Informações importantes)
/depoimentos.html        (Depoimentos)
/faq.html                (Dúvidas frequentes)
/inscricao.html          (FORMULÁRIO de pré-inscrição — destino do CTA principal)
/css/tokens.css          (variáveis de marca)
/css/styles.css          (estilos)
/js/components.js        (header + footer + menu/hambúrguer)
/js/main.js              (scroll reveal, contadores, acordeão, carrossel, validação do form)
/assets/img/             (fotos — placeholders nomeados)
/assets/icons/           (ícones SVG autorais)
/assets/logo/            (wordmark)

# NAVEGAÇÃO (todas as páginas)
- Header sticky com: wordmark "Teacher Mari" (link p/ Home) à esquerda; nav à direita:
  Home · Sobre · Metodologia · Planos · Depoimentos · FAQ; e botão de destaque
  "Fazer pré-inscrição" (→ inscricao.html). Ao lado, um botão/ícone WhatsApp secundário.
- Estado ativo: marque visualmente o item da página atual (aria-current="page").
- MOBILE: menu hambúrguer acessível (botão com aria-expanded, aria-controls), painel
  que desliza, fecha no ESC e ao clicar fora, trava o scroll do body quando aberto,
  foco gerenciado (focus trap simples). O CTA "Fazer pré-inscrição" aparece em destaque
  dentro do menu mobile.
- Header encolhe + ganha sombra ao rolar; scroll suave em âncoras internas.
- Botão flutuante de WhatsApp persistente em todas as páginas (pulso discreto).

# IDENTIDADE DE MARCA (use estes tokens — NÃO invente outra paleta)
Marca: "Mariana Mascarenhas — English Teacher" (assinatura pública: Teacher Mari).
Cores (hex amostrados do material oficial):
  --roxo-profundo:  #4E2782   /* primária: blocos de título, CTA */
  --roxo-escuro:    #371A5E   /* hover/profundidade */
  --lilas:          #AC75C8   /* secundária, realces suaves */
  --magenta:        #9C346D   /* acento quente, palavras-chave, logo */
  --teal:           #1F8FA0   /* acento frio pontual (ex.: "liberdade") */
  --fundo:          #F4F3F4   /* base clara */
  --fundo-alt:      #EAE8EC   /* faixas alternadas */
  --tinta:          #181111   /* texto principal */
  --tinta-suave:    #4A4348   /* texto secundário */
Tipografia:
  - Títulos (display): serifada expressiva (ex.: "Fraunces" ou "Playfair Display").
  - Corpo: sans limpa (ex.: "Inter" ou "Plus Jakarta Sans").
  - Wordmark com traço de assinatura em magenta; não use cursiva no corpo.
Voz: calorosa, próxima, encorajadora, sem julgamentos. Fala com "você". Foca em
CONFIANÇA e LIBERDADE, não só em "aulas de inglês".

# DIREÇÃO DE ARTE (anti-genérico de IA)
O material de origem (carrossel de Instagram) usa papel rasgado roxo + emojis.
ELEVE a marca:
- MANTENHA: paleta roxo/magenta/teal; a assinatura visual do "bloco de título"
  (retângulo roxo com texto branco em caixa-alta) como elemento recorrente.
- EVITE: textura de papel amassado, emojis literais, excesso de cores num mesmo bloco.
- Layout EDITORIAL e assimétrico, muito espaço em branco, hierarquia forte, grid 12 col.
- Fotos reais da Mari como protagonistas. Detalhe de marca: "marca-texto" desenhado
  sob palavras-chave (sublinhado irregular em magenta/teal) — eco fino do estilo caderno.
- Resultado: marca pessoal PREMIUM, confiável e inconfundível.

# ÍCONES (substituem os emojis do material)
NÃO use emojis. Use um sistema coeso, em duas camadas:
1) Ícones AUTORAIS em SVG (crie em /assets/icons/), traço de ~1.75px, cantos suaves,
   na cor da marca, para os 4–6 conceitos centrais: ritmo/relógio, alvo/objetivo,
   diálogo/conversa, coração-acolhimento, livro/Oxford, plano/checklist.
2) Para o resto da interface, use uma biblioteca aberta (escolha UMA e seja
   consistente). Recomendações (todas MIT/open-source):
     - Lucide (lucide.dev) — recomendada, traço limpo e moderno.
     - Phosphor Icons (phosphoricons.com) — variação de pesos.
     - Tabler Icons (tabler.io/icons).
     - Heroicons (heroicons.com).
     - Feather (feathericons.com).
   Inclua os SVGs inline (não via CDN com JS) para performance e acessibilidade
   (role="img" + <title>, ou aria-hidden quando decorativo).

# CONTEÚDO POR PÁGINA (copy definitiva, já revisada)

## index.html — HOME (página principal, rica, conduz para inscrição)
A Home é um resumo persuasivo que apresenta o essencial de cada página e empurra
para a pré-inscrição. Seções:

1) HERO
   - Sobretítulo: "Professora de inglês • 9 anos de experiência"
   - Headline (display, com realce):
     "Aprenda o inglês da vida real e conquiste mais LIBERDADE em qualquer lugar do mundo."
   - Subheadline:
     "Aulas online ao vivo, com metodologia comunicativa e um ambiente acolhedor e
      livre de julgamentos. Seu ritmo, seus objetivos, seu plano sob medida."
   - CTA primário: "Fazer pré-inscrição" → inscricao.html
   - CTA secundário: "Conhecer os planos" → planos.html
   - Microssinais: "Bate-papo inicial gratuito • Sem taxa de matrícula • Suporte 24h no WhatsApp"
   - Faixa de números (contadores animados): "9 anos ensinando" • "Certificada por Cambridge"
     • "Material Oxford" • "100% online ao vivo"
   - 【FOTO: hero — placeholder /assets/img/mari-hero.webp (foto de alta qualidade)】

2) DOR / IDENTIFICAÇÃO
   "Você entende inglês, mas trava na hora de falar? Estuda 'quando dá' e sente que
    não evolui? Aqui o caminho é outro: conteúdo sob medida, no seu ritmo, sem cobranças
    que te paralisam."

3) PRÉVIA "QUEM É A MARI" (resumo + link p/ sobre.html)
   "Professora há 9 anos, formada em Letras Português/Inglês pela PUCPR, certificada
    pela Universidade de Cambridge e pós-graduanda em Metodologias para o Ensino de
    Língua Inglesa." + botão "Conhecer minha história" → sobre.html
   【FOTO: /assets/img/mari-sobre.webp】

4) PRÉVIA METODOLOGIA (os 4 pilares em cards, resumidos) + link p/ metodologia.html

5) PRÉVIA PLANOS (2 cards resumidos, com badge "Mais recomendado" no Grupo)
   + link "Ver todos os detalhes" → planos.html

6) DEPOIMENTO EM DESTAQUE (1 depoimento forte) + link → depoimentos.html

7) CTA FINAL (faixa)
   "Let's learn English! As vagas são limitadas." + botão "Fazer pré-inscrição"
   → inscricao.html (WhatsApp como link secundário).

## sobre.html — QUEM É A TEACHER MARI
Título: "Quem é a Teacher Mari?"
"Professora há 9 anos ministrando aulas de língua inglesa, formada em Letras
Português/Inglês pela PUCPR. Foi Coordenadora Pedagógica em uma instituição de
ensino de línguas, é certificada pela Universidade de Cambridge e, atualmente, é
pós-graduanda em Metodologias para o Ensino de Língua Inglesa."
Citação em destaque:
"Meu objetivo é ajudar você a ter a oportunidade de aprender inglês — para ter mais
chances no mercado de trabalho, entender aquela série, filme ou música, e também ter
mais LIBERDADE em qualquer lugar do mundo!"
Chips de credencial: "9 anos de experiência" • "PUCPR — Letras" • "Certificada por
Cambridge" • "Ex-Coordenadora Pedagógica" • "Pós-graduanda em Metodologias de Ensino".
CTA ao final: "Fazer pré-inscrição".
【FOTOS: /assets/img/mari-sobre.webp e uma foto de apoio adicional】

## metodologia.html — COMO EU ENSINO
Bloco A — "Motivos para estudar comigo" (4 cards com ícones autorais):
1. "Seu ritmo é respeitado" — "Entendo que cada aluno tem suas dificuldades. Por isso,
   encaixo o estudo na sua rotina, com ferramentas e estratégias que facilitam o aprendizado."
2. "Seu objetivo em primeiro lugar" — "Todo o material é pensado na sua necessidade,
   buscando fluência por meio de metodologias ativas e um ensino dinâmico e eficaz."
3. "Inglês da vida real" — "Abordagem comunicativa: trabalhamos a gramática de forma
   contextualizada, para você aprender o inglês real sem decorar regras."
4. "Ambiente acolhedor" — "Um espaço leve e livre de julgamentos, onde errar faz parte
   de aprender."

Bloco B — "Como funcionam as aulas?":
- "Aulas online ao vivo, em que você recebe a linguagem, a motivação e a oportunidade
  para falar com confiança."
- "Essa confiança vem do equilíbrio entre gramática, vocabulário, pronúncia e
  desenvolvimento de habilidades em cada aula."
- "Você estuda com vídeos, áudios, games e muito mais — no livro físico e na plataforma digital."
- "Material de uma das melhores editoras do mundo: Oxford University Press
  (English File — Student's Book with Online Practice, 4ª edição)."
- "Calendário letivo com atividades temáticas o ano todo: cultura, tradições e
  curiosidades sobre o mundo."
Nota fina: "O material é de responsabilidade do aluno; no momento da matrícula
enviamos links com preços mais acessíveis."

Bloco C — "Study Plan personalizado":
Intro: "Cada aluno é único. Por isso, todos recebem um Plano de Estudo semanal
exclusivo, feito sob medida para:"
1. "Organizar seu aprendizado de forma estratégica" — "Nada de estudar 'quando der'.
   Os conteúdos são organizados conforme seu tempo e prioridades, com foco e sem sobrecarga."
2. "Tornar o estudo leve e divertido" — "Seu plano inclui músicas, filmes, séries e
   jogos que você gosta, escolhidos a dedo para caber na sua rotina."
3. "Seguir uma sequência que faz sentido para você" — "Cada atividade segue uma lógica
   pensada para consolidar seu conhecimento, passo a passo, com clareza e propósito."
CTA ao final: "Fazer pré-inscrição".

## planos.html — MODALIDADES
Título: "Modalidades — do básico ao avançado"
Card A — "Pacote VIP":
  - "Aulas individuais" • "1x por semana (1 hora)" • "12x R$ 437,00"
  - Nota: "Para mais de uma aula por semana, consulte disponibilidade."
Card B — "Grupos (até 5 alunos)"  ← BADGE "Mais recomendado":
  - "Aulas em turma" • "1x por semana (1h15)" • "12x R$ 317,00 por aluno"
  - Nota: "Horários fixos conforme a agenda da teacher, com no máximo 5 alunos."
Faixa de bônus: "Bônus: não há taxa de matrícula!"
CTA em cada card: "Fazer pré-inscrição" → inscricao.html (passe o plano via query
string, ex.: inscricao.html?plano=vip / ?plano=grupo, e pré-selecione no formulário).

Seção "Informações importantes" (na mesma página):
"Antes da matrícula, agendo um bate-papo online gratuito para te conhecer, entender
seus objetivos e garantir que meu método é ideal para o seu perfil."
"Para as aulas você precisa de:" (lista com ícones)
- "Acesso à internet"
- "Uma conta Gmail ativa"
- "Muita vontade de ser bilíngue e conquistar seus sonhos"
- "Bônus: suporte 24h para tirar dúvidas pelo WhatsApp"
"Usamos também o Google Classroom como sala virtual, onde fica o Plano de Estudos,
o link das aulas, o calendário letivo e os recados importantes."

## depoimentos.html — O QUE MEUS ALUNOS DIZEM
Carrossel + grade. Selo: "5,0 ★ — depoimentos reais".
- Sulivan Rodrigues: "A teacher Mari traz o inglês para a nossa vida: ela entende a
  rotina e os afazeres do aluno e leva a realidade dele para dentro da aula, o que torna
  tudo mais atrativo. Os feedbacks depois das provas e durante as aulas são muito
  importantes para sabermos se estamos no caminho certo."
- Raphaela Rodrigues: "Gosto muito das aulas e percebo a evolução, porque estudamos
  assuntos do meu dia a dia. Quando escuto uma música ou assisto a uma série, consigo
  fazer o 'link' com o que estudamos."
- Norma Soares: "A professora Mari faz a aula ser leve, fluida e sem julgamentos sobre
  a pronúncia de palavras difíceis — o tempo passa rápido. Primeiro é uma aula, depois um
  mês, e assim se passaram 4 anos estudando com ela. As aulas vão muito além do inglês."
CTA ao final: "Fazer pré-inscrição".

## faq.html — DÚVIDAS FREQUENTES (acordeão acessível)
- "Quanto tempo dura o curso?" → "Em média 70 horas por nível (aulas ao vivo +
  atividades assíncronas). Pode variar conforme empenho e aptidão; recomendo também
  o estudo independente para um melhor resultado."
- "Como é o nivelamento?" → "Você faz um teste de nivelamento online no início (se
  necessário). O critério é o Quadro Comum Europeu para Línguas (CEFR)."
- "Quais materiais são usados além do livro físico?" → "Google Meet (aulas ao vivo),
  Google Classroom, a plataforma digital English File Online Practice e aplicativos
  gratuitos de interação."
- "Preciso assinar contrato?" → "Sim. Ao decidir estudar inglês comigo, você assume o
  compromisso de honrar esse acordo. O contrato protege os seus direitos e os meus na
  prestação do serviço."
- "Qual a plataforma das aulas?" → "Google Meet — gratuito e fácil de usar no celular
  ou no computador, de qualquer lugar do Brasil."
CTA ao final: "Fazer pré-inscrição".

## inscricao.html — PRÉ-INSCRIÇÃO (formulário nativo — DESTINO DO CTA PRINCIPAL)
Cabeçalho da página:
  Título: "Pré-inscrição 2026"
  Intro (voz da Mari): "Que alegria que você decidiu dar o primeiro passo rumo ao
  inglês! Preencha os campos abaixo e logo entrarei em contato. Vamos juntos?"
  Selo de urgência real: "As vagas são limitadas."

Construa um FORMULÁRIO NATIVO acessível com EXATAMENTE estes campos (extraídos do
Google Forms atual da professora). Validação client-side, labels associadas,
mensagens de erro claras, aria-* correto.

1. "Nome completo" — input text — OBRIGATÓRIO
2. "Número de celular (com DDD)" — input tel — OBRIGATÓRIO (máscara/validação BR)
3. "Selecione a melhor opção que se encaixa na sua rotina (pode escolher mais de uma):"
   — CHECKBOXES (múltipla escolha) — OBRIGATÓRIO (ao menos 1):
     [ ] "Mini grupo: segunda-feira, das 20:30 às 21:45"
     [ ] "Aulas VIP (individuais) — apenas manhã ou tarde"
   (Se a página foi aberta com ?plano=vip ou ?plano=grupo, pré-marque a opção correspondente.)
4. "Caso tenha marcado 'Aulas VIP', escreva aqui qual seria a melhor possibilidade
   para você:" — textarea — OPCIONAL (exiba/realce condicionalmente quando VIP marcado)
5. "Você declara estar ciente de que as vagas para estudar com a teacher Mari são
   limitadas e que, caso o dia/horário escolhido já esteja preenchido, você ficará na
   lista de espera?" — RADIO — OBRIGATÓRIO:
     ( ) "Sim, estou ciente."
6. "Por que você decidiu estudar inglês em 2026?" — textarea — OBRIGATÓRIO
   (o ano "2026" é da campanha atual; deixe fácil de editar no HTML)
7. "Como você encontrou o meu trabalho? (recomendação, Instagram, etc.)" — input text
   — OBRIGATÓRIO

Botão de envio: "Enviar pré-inscrição".

ENVIO (site estático, sem backend) — implemente assim:
- Use um endpoint configurável no topo do JS (const FORM_ENDPOINT = "..."). Deixe
  preparado para Formspree OU Netlify Forms (inclua os atributos do Netlify:
  data-netlify="true" + campo honeypot anti-spam), com instruções no README de como
  plugar cada um. 【CONFIRMAR qual serviço de formulário será usado】
- Ao enviar com sucesso: mostre uma tela/estado de sucesso ("Pré-inscrição recebida!
  A Mari vai te responder em breve.") sem recarregar bruscamente.
- FALLBACK: inclua, abaixo do form, um link discreto "Prefere o formulário do Google?"
  → https://forms.gle/FXvgFFuVtUdAfoEP8 (o Google Forms já existente dela).
- Inclua também o WhatsApp como canal alternativo nesta página (secundário).

# DADOS DE CONTATO (use exatamente)
- WhatsApp (secundário): +55 41 99971-5742
  Deep link: https://wa.me/5541999715742?text=Oi%20Mari!%20Vim%20pelo%20site%20e%20quero%20saber%20mais%20sobre%20as%20aulas.
- Instagram: https://instagram.com/teachermarimascarenhas
- E-mail (placeholder): contato@marimascarenhas.com.br
- Google Forms (fallback): https://forms.gle/FXvgFFuVtUdAfoEP8

# ANIMAÇÕES (suaves, com propósito, performáticas)
- Scroll reveal: fade + translateY leve, em stagger (IntersectionObserver).
- Hero: revelação do título por máscara/clip; foto com parallax sutil.
- Header: shrink + sombra ao rolar.
- Contadores numéricos animam ao entrar na viewport.
- Cards: hover com elevação + leve escala; foco visível p/ teclado.
- Depoimentos: carrossel suave, pausa no hover, arrastável no touch.
- Botão WhatsApp flutuante: pulso discreto.
- Durations 200–600ms, easing consistente.
- OBRIGATÓRIO: respeitar prefers-reduced-motion (atenua/desliga tudo).

# RESPONSIVIDADE (mobile-first)
- Breakpoints: ≤480 / 481–768 / 769–1024 / ≥1280.
- Menu hambúrguer no mobile (ver seção NAVEGAÇÃO). Touch targets ≥ 44px.
- Tipografia fluida com clamp(); imagens responsivas (srcset/<picture>), WebP/AVIF,
  loading="lazy". Sem overflow horizontal. Testar de 320px a 1440px+.
- O botão flutuante não pode cobrir CTAs nem campos do formulário.

# SEO + PERFORMANCE + ACESSIBILIDADE
- Cada página com <title> e meta description próprios. Ex. Home:
  <title>Teacher Mari Mascarenhas — Professora de Inglês Online</title>
  description: "Aulas de inglês online ao vivo com a Teacher Mari: 9 anos de
  experiência, certificada por Cambridge, metodologia comunicativa e plano de estudo
  personalizado. Faça sua pré-inscrição."
- Open Graph + Twitter card (og:image com foto da Mari).
- JSON-LD Person/LocalBusiness na Home (nome, área, contato, redes).
- HTML semântico, headings em ordem, alt em todas as imagens, foco visível,
  aria no acordeão, no menu e no formulário. Acessibilidade AA.
- Lighthouse 90+ em todas as categorias. Fontes com display=swap.
- LGPD: link de política de privacidade no footer; banner de cookies só se houver tracking.

# ASSETS (deixe placeholders nomeados e de alta qualidade)
- /assets/img/mari-hero.webp        (foto principal — alta qualidade)
- /assets/img/mari-sobre.webp       (foto de apoio)
- /assets/img/mari-contato.webp     (foto do bloco de contato/inscrição)
- /assets/img/og-image.jpg
- /assets/logo/teacher-mari.svg     (wordmark; se não houver, gere um wordmark
  tipográfico elegante: "Teacher Mari" em magenta + "ENGLISH TEACHER" em caixa-alta
  espaçada)
- /assets/icons/*.svg               (ícones autorais)
- favicon.svg
Para cada placeholder de imagem, deixe dimensões/proporção sugeridas em comentário e
um placeholder visual neutro (não use banco de imagens genérico).

# ENTREGÁVEIS
1. Site multi-página completo e rodável (instruções de servidor local no README).
2. tokens.css com todas as variáveis de marca.
3. Header/footer/menu consistentes em todas as páginas.
4. Formulário de pré-inscrição funcional (endpoint configurável + fallback Google Forms).
5. README: como editar textos/preços, trocar fotos, plugar o serviço de formulário
   e fazer deploy.
6. Acessível, responsivo, Lighthouse 90+.

# REGRAS
- CTA primário = pré-inscrição (formulário). WhatsApp só secundário.
- Sem emojis (use ícones autorais + 1 biblioteca aberta).
- Não use visual genérico de SaaS (dark + gradiente roxo de template).
- Não invente depoimentos, credenciais ou preços além dos fornecidos.
- Todo texto em português do Brasil, na voz calorosa da Mari.
- Comece confirmando o plano de arquivos e a estrutura de navegação; depois construa.