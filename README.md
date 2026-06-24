# AgroGestor — API

> Projeto em desenvolvimento ativo

Backend da plataforma **AgroGestor** — sistema web voltado ao agronegócio para monitoramento climático, sugestão de janelas de aplicação de defensivos agrícolas, gestão de propriedades e talhões.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat-square&logo=prisma&logoColor=white)

---

## Funcionalidades

- **Monitoramento climático** — consulta de condições meteorológicas por propriedade
- **Janelas de aplicação** — sugestão de períodos ideais para aplicação de defensivos com base no clima
- **Gestão de propriedades e talhões** — cadastro, edição e acompanhamento de propriedades rurais e seus talhões
- **Registro de aplicações** — controle de produtos, doses, tipos (Fungicida, Herbicida, Inseticida, etc.) e notas por aplicação
- **Geração de documentos** — exportação dos registros de aplicação
- **IA (em breve)** — integração com a Claude API para assistência inteligente ao produtor

---

## Stack

| Camada | Tecnologia |
|---|---|
| Linguagem | TypeScript |
| Runtime | Node.js |
| Framework | Express v5 |
| ORM | Prisma v7 |
| Banco de dados | Neon |
| Autenticação | JWT + bcrypt |
| Validação | validator.js |
| Documentação | Swagger UI |

---

## Arquitetura

A API segue uma arquitetura em camadas com separação clara de responsabilidades:

```
src/
├── controllers/     # Recebe requisições HTTP e retorna respostas
├── use-cases/       # Regras de negócio da aplicação
├── repository/      # Acesso ao banco de dados via Prisma
├── factories/       # Injeção de dependências via factory functions
├── routes/          # Definição das rotas da API
├── helpers/         # Funções auxiliares reutilizáveis
├── error/           # Tratamento centralizado de erros
└── db/              # Configuração da conexão com o banco
```

O fluxo de uma requisição segue o caminho:

```
Route → Controller → Use Case → Repository → Banco de dados
```

As dependências são compostas via **factory functions**, evitando acoplamento direto entre as camadas.

---

## Modelo de Dados

```
User
 └── Ownership (Propriedade)
      ├── Field (Talhão)
      └── Application (Aplicação de Defensivo)
           └── Field? (opcional — aplicação pode ser por propriedade ou talhão específico)
```

**Tipos de defensivos suportados:** Fungicida · Herbicida · Inseticida · Acaricida · Nematicida · Bactericida · Rodenticida

**Unidades de dose suportadas:** `l/ha` · `g/ha` · `mL/ha` · `kg/ha`

---

## Como executar localmente

### Pré-requisitos

- Node.js 18+
- PostgreSQL

### Instalação

```bash
# Clone o repositório
git clone https://github.com/LuisG-santos/spodop-api.git
cd spodop-api

# Instale as dependências
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/agrogestor"
JWT_SECRET_KEY="sua_chave_secreta"
```

### Banco de dados

```bash
# Executa as migrations
npx prisma migrate dev

# (Opcional) Abre o Prisma Studio
npx prisma studio
```

### Rodando o servidor

```bash
# Modo desenvolvimento (com hot reload via nodemon)
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

---

## Rotas disponíveis

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/user` | Criação de usuário |
| `GET` | `/user/:id` | Busca usuário por ID |
| `PUT` | `/user/:id` | Atualização de usuário |
| `POST` | `/auth/login` | Autenticação e geração de token JWT |

> A documentação completa das rotas está disponível via Swagger em `/api-docs` (quando o servidor estiver rodando).

---

## Roadmap

- [x] Autenticação com JWT
- [x] CRUD de usuários
- [x] Modelagem de Propriedades, Talhões e Aplicações
- [ ] CRUD de propriedades e talhões
- [ ] CRUD de aplicações de defensivos
- [ ] Integração com API climática
- [ ] Sugestão de janelas de aplicação
- [ ] Geração de documentos (PDF)
- [ ] Integração com Claude API (IA)

---

## Licença

Este projeto está licenciado sob a **MIT License** — veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
