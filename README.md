# Guyzelh Ramos: Ao vivo

Proposta de website para o empresário Guyzelh Ramos. Não é uma biografia nem um portfólio: o site **é uma transmissão em directo**.
O visitante "entra na live", vê cinco episódios do percurso e termina no chat, que é o contacto.

## Correr

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

Stack: Next.js 15 (App Router) + React 19 + TypeScript. Sem dependências de animação.
O ring light é um shader WebGL próprio (`components/SignalCanvas.tsx`), as transições usam a Web Animations API e o scroll é nativo.
Tipografia: Archivo (eixo de largura variável) via `next/font`.

## Como funciona

| Parte | Ficheiro | O que faz |
|---|---|---|
| Preloader | `components/Preloader.tsx` | "A ligar a transmissão", contagem 3-2-1, o ring light acende |
| Ring light | `components/SignalCanvas.tsx` | Anel de luz atrás do ecrã vertical; muda de cor por episódio; interferência e separação RGB crescem com a velocidade do scroll |
| Palco | `components/Stage.tsx` | Secção sticky: hero + 5 episódios dentro do ecrã 9:16; corte de régie (glitch) em cada mudança; o nome estica com o scroll |
| Chat da régie | `components/Feed.tsx` | Notas que aparecem no chat a cada episódio (só factos, nada de comentários inventados) |
| HUD | `components/Hud.tsx` | Badge ao vivo, tempo real que o visitante está no site, barra de progresso com capítulos clicáveis |
| Chat (contacto) | `components/Chat.tsx` | Escolhe assunto, escreve como numa live; gera mensagem pronta para WhatsApp ou e-mail |
| Fim | `components/Outro.tsx` | "Terminar transmissão": o ecrã desliga como um tubo antigo e mostra quanto tempo ficaste |

No mobile, o ecrã vertical ocupa o telemóvel inteiro e o texto sobrepõe-se como numa live do Instagram.
`prefers-reduced-motion` desliga o glitch, a interferência e as transições.

## Conteúdo

Todo o texto está em `lib/content.ts`. Para trocar um placeholder por media real, coloca o ficheiro em `/public` e preenche `media`:

```ts
media: { type: "video", src: "/ep-bailao.mp4", alt: "Público a cantar no Bailão" }
```

Cada episódio tem um campo `shot`: a descrição do plano a filmar, que funciona como briefing de produção.

### Factos a confirmar com o Guyzelh antes de publicar

- [ ] Guyzelh Fashion (2015): confirmar como quer apresentar (é sócio, não gerente, segundo o registo)
- [ ] Best Promoter of Africa, Africa Entertainment Awards USA (2018): só confirmado pela imprensa
- [ ] Embaixador da Uzeir Trade Center (2020)
- [ ] Gshow, +10 mil inscrições em 24h (2021). A Gshow foi descontinuada; decidir se entra
- [ ] 1 milhão de seguidores no Instagram (dado de 2022)
- [ ] Bailão: lista de artistas (MC PH, MC IG, Nilo MC, MC Ryan SP) e cidades
- [ ] Episódio 5: o que anunciar (Guyzelh Produções, Lirandzo?)
- [ ] Contactos reais em `CONTACT` (WhatsApp, e-mail, Instagram)

Ficaram de fora, de propósito: G-Cut (sem confirmação de que abriu) e todas as controvérsias de 2025–2026.
