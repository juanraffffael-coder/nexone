# Nexo — Landing Page

Landing page da Nexo (automação de atendimento no WhatsApp, painel de gestão e conteúdo para redes sociais), feita em React + TypeScript + Vite.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:5173

## Build de produção

```bash
npm run build
npm run preview
```

## Estrutura

```
nexo-landing/
├── index.html
├── src/
│   ├── main.tsx      # entrada da aplicação
│   ├── App.tsx        # landing page completa (Nav, Hero, Pillars, Carousel, etc.)
│   └── index.css      # reset básico
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Stack

- React 18 + TypeScript
- Vite
- lucide-react (ícones)
- Fontes: Playfair Display, Inter, JetBrains Mono (Google Fonts)

## Deploy

O projeto gera arquivos estáticos em `dist/` após `npm run build`, prontos para Vercel, Netlify, GitHub Pages ou qualquer hospedagem estática.
