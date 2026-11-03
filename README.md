# Página de vendas — Estrutura inicial

Projeto independente, genérico e responsivo (prioridade mobile). Não contém qualquer conteúdo ou referência ao Mapa do Inglês.

## Arquivos

- `index.html`: estrutura e conteúdo demonstrativo.
- `styles.css`: visual e estilos responsivos.
- `script.js`: configuração do link de checkout e ano do rodapé.
- `assets/README.md`: instruções para imagens e mídias.
- `docs/PERSONALIZACAO.md`: checklist de publicação.
- `package.json`: comandos de desenvolvimento com Vite.
- `.gitignore`: arquivos locais ignorados pelo Git.

## Desenvolvimento

Requer Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
```

Para gerar a versão estática:

```bash
npm run build
npm run preview
```

Também é possível visualizar a estrutura simples abrindo `index.html` no navegador. Nenhum backend, login ou integração de pagamento foi configurado.

## Antes de publicar

Troque todos os textos de exemplo, a marca, as cores se necessário, os termos e informações comerciais, a imagem do produto e configure o endereço HTTPS de checkout em `script.js`. Não publique com preços fictícios, promessas não verificadas ou dados de empresa incompletos.
