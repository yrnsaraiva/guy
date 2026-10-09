# Guyzelh Ramos: site institucional

Site de uma página para o empresário Guyzelh Ramos: menu fixo, apresentação, Sobre, Negócios, Eventos, Percurso, Parcerias e Contacto.
Estilo claro e limpo: fundo branco, tipografia Archivo e uma cor de marca (vermelho `#d8262f`).

> O conceito anterior ("Ao vivo") está guardado no ramo `ao-vivo`.

## Correr

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

Stack: Next.js 15 (App Router) + React 19 + TypeScript, sem outras dependências.

## Estrutura

| Ficheiro | Conteúdo |
|---|---|
| `lib/content.ts` | Todo o texto, números, eventos, percurso e contactos |
| `components/Home.tsx` | As secções da página |
| `components/Header.tsx` | Menu fixo, com menu em ecrã inteiro no mobile |
| `components/ContactForm.tsx` | Formulário com validação; abre o e-mail com a mensagem preenchida |
| `components/Photo.tsx` | Foto real ou espaço reservado com a descrição da foto a colocar |
| `app/globals.css` | Estilos e tokens de cor |

## Fotos

Coloca as fotos em `/public` e preenche `src` no objecto `photo` correspondente em `lib/content.ts`:

```ts
photo: { src: "/retrato.jpg", alt: "Retrato de Guyzelh Ramos", note: "" }
```

Fotos necessárias: retrato (hero), bastidores (Sobre), uma por evento (3) e logótipos de parceiros (até 5).

## Formulário

Sem servidor, o formulário abre o programa de e-mail do visitante. Para receber as mensagens directamente, liga-o a um serviço como Netlify Forms ou Formspree.

## Factos a confirmar com o Guyzelh antes de publicar

- [ ] Best Promoter of Africa, Africa Entertainment Awards USA (2018): só confirmado pela imprensa
- [ ] Guyzelh Fashion (2015): é sócio; confirmar como quer apresentar
- [ ] Embaixador da Uzeir Trade Center (2020)
- [ ] Gshow (2021): foi descontinuada; decidir se entra no percurso
- [ ] 1 milhão de seguidores no Instagram (dado de 2022)
- [ ] Eventos Bailão: datas, cidades e artistas
- [ ] Logótipos de parceiros autorizados
- [ ] Contactos reais em `CONTACT`

Ficaram de fora, de propósito: G-Cut (sem confirmação de que abriu) e as controvérsias de 2025–2026.
