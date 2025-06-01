
# 🖥️ Front-end - Gerenciador de Tarefas

Este é o front-end da aplicação de gerenciamento de tarefas, desenvolvido com [Angular](https://angular.io/). Ele consome uma API REST desenvolvida em Quarkus e está integrado com diferentes perfis de ambientes: `dev`, `test` e `prod`.

---

## 🎯 Funcionalidades

- Listagem de tarefas
- Criação de novas tarefas
- Edição e exclusão de tarefas
- Integração com API por ambiente

---

## 🔗 Integração com Back-end

O front-end comunica-se com a API de tarefas utilizando variáveis de ambiente definidas nos arquivos:

```
src/environments/
├── environment.ts           → Ambiente de desenvolvimento
├── environment.test.ts      → Ambiente de homologação/testes
└── environment.prod.ts      → Ambiente de produção
```

Cada arquivo define a URL base da API:

```ts
// Exemplo do environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080' // dev
};
```

---

## 🚀 Como executar

### Pré-requisitos
- Node.js (versão 16+)
- Angular CLI (`npm install -g @angular/cli`)

### Instalar dependências
```bash
npm install
```

### Rodar em modo desenvolvimento
```bash
ng serve
```

A aplicação estará disponível em `http://localhost:4200`.

---

## 🌍 Perfis de ambiente

| Perfil   | Arquivo                | URL base da API                   |
|----------|------------------------|-----------------------------------|
| dev      | `environment.ts`       | `http://localhost:8080`           |
| test     | `environment.test.ts`  | `http://homolog.frontend.com`     |
| prod     | `environment.prod.ts`  | `https://app.minhaempresa.com.br` |

Para **buildar** para cada ambiente:

```bash
ng build                 # ambiente dev
ng build --configuration=test   # ambiente de homologação
ng build --configuration=production  # ambiente produção
```

---

## 🔧 Estrutura básica

```
frontend/
├── src/
│   ├── app/
│   ├── assets/
│   ├── environments/
│   │   ├── environment.ts
│   │   ├── environment.test.ts
│   │   └── environment.prod.ts
├── angular.json
├── package.json
└── README.md
```

---

## 📌 Autora

Joana – Projeto prático para a disciplina de Computação Orientada a Serviços  
Curso de Sistemas de Informação

---

## 📚 Referência técnica

Este front-end integra com uma API baseada no estudo de caso:  
**Spotify – Padronização de Ambientes com DevOps e CI/CD**
