# Hana Chat

Este projeto é uma POC (Proof of Concept) para validar a ideia de um sistema de chat altamente escalável e implantável em diversos projetos pessoas e empresariais.

## Monorepo de Projetos

Este monorepo contém múltiplos projetos agrupados em um único repositório. Ele inclui dois projetos front-end em Angular, dois projetos front-end em Nuxt 3, e uma API em NestJS.

### Estrutura do Repositório

A estrutura do repositório é a seguinte:

./api - Temos api construído em Node.js com framework Nest.js
./apps - Existem 2 projetos front-end. ["client", "admin"] são construídos em Nuxt.js 3

### Instalação e configuração

Instale o gerenciador de pacote "pnpm"

```
npm install -g pnpm@latest
```

Posteriormente entre em cada projeto e instale as dependências.

```
// API
cd api
pnpm install

// Admin em Nuxt.js 3
cd apps/admin
pnpm install

// Client em Nuxt.js 3
cd apps/client
pnpm install
```

### Como rodar os projetos

```
// [Api]
pnpm dev

// [Client]
pnpm dev

// [Admin]
pnpm dev
```

### Documentações e links úteis

- [pnpm](https://pnpm.io)
- [Node.js](https://nodejs.org) (v20 ou superior)
- [Nest.js](https://nestjs.com)
- [MongoDB](https://www.mongodb.com) (NoSQL)
- [Mongoose](https://mongoosejs.com) (ODM)
- [Nuxt.js](https://nuxt.com) (para projetos Nuxt 3)
- [Vue.js](https://vuejs.org) (para projetos Nuxt 3)
- [TailwindCSS](https://tailwindcss.com)
