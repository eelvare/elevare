# Elevare English — Página de upsell pós-compra

Oferta opcional para compradores do Mapa do Inglês: 183 aulas em vídeo, 14 módulos (13 + 1 extra), 352 materiais de apoio, 12 meses de acesso por R$37,90 ao ano.

## Onde editar

- `src/config/upsell.ts`: **todos** os dados configuráveis (VSL, vídeo demo, capturas, materiais, depoimentos, checkout, recusa, renovação, entrega, garantia, suporte, termos e privacidade). Campos `null`/`[]` estão pendentes.
- `src/routes/index.tsx`: estrutura e textos da página.
- `src/upsell.css`: estilos escopados (`.up`).

## Antes de publicar

`previewMode: true` mostra marcadores de prévia. Só mude para `false` e publique depois de configurar checkout real (HTTPS), destino de recusa, condição de renovação e links institucionais. Sem checkout, os botões de compra não simulam cobrança.

Checklist: `docs/PERSONALIZACAO.md`. Mídias: veja `assets/README.md`.