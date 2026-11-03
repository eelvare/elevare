# Checklist antes de publicar (Elevare English)

Tudo em `src/config/upsell.ts`:

- [ ] `vsl` — vídeo real (9:16 ou 16:9), sem autoplay.
- [ ] `demoVideo`, `platformScreenshots`, `materialSamples` — mídias reais do curso.
- [ ] `testimonials` — apenas depoimentos autênticos (seção oculta se vazia).
- [ ] `checkout.mode` + `checkout.url` (HTTPS). One-click exige autorização explícita de R$37,90.
- [ ] `declineUrl` — destino real da recusa.
- [ ] `renewalTerms`, `deliveryInfo`, `guarantee`, `supportInfo` — só condições reais.
- [ ] `links.support`, `links.terms`, `links.privacy`.
- [ ] Mudar `previewMode` para `false`.
- [ ] Testar em celular (360–430px) e computador.