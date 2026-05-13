# Vegan SP

Site estático em Bootstrap para recomendações de restaurantes, bares, lanchonetes e mercados veganos em São Paulo.

## Estrutura

```txt
vegan-sp/
├── index.html
├── generate-pages.js
├── package.json
├── README.md
├── data/
│   └── places.json
├── templates/
│   └── local-template.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── restaurantes/
```

## Como usar

1. Instale o Node.js.
2. Abra a pasta no VS Code.
3. Rode:

```bash
npm install
npm run generate
npm run start
```

## Como cadastrar um novo local

Edite o arquivo:

```txt
data/places.json
```

Adicione um novo objeto com:

```json
{
  "slug": "nome-do-local",
  "categorySlug": "restaurantes",
  "name": "Nome do Local"
}
```

Depois rode:

```bash
npm run generate
```

O script vai criar automaticamente:

```txt
/restaurantes/nome-do-local/index.html
```

A URL final fica:

```txt
seudominio.com.br/restaurantes/nome-do-local/
```
