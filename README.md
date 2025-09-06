# Backend Simplifit

Backend em Node.js para gerenciamento de tipos de usuários e usuários do sistema Simplifit.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Sequelize** - ORM para banco de dados
- **SQLite** - Banco de dados
- **CORS** - Middleware para CORS

## 📋 Estrutura do Projeto

```
back-simplifit/
├── config/
│   └── database.js          # Configuração do banco de dados
├── models/
│   ├── TipoUsuario.js       # Modelo do tipo de usuário
│   ├── Usuario.js           # Modelo do usuário
│   └── index.js             # Configuração dos modelos e associações
├── routes/
│   ├── tipoUsuario.js       # Rotas para tipos de usuários
│   └── usuario.js           # Rotas para usuários
├── database/
│   └── simplifit.sqlite     # Banco de dados SQLite (criado automaticamente)
├── package.json
├── server.js                # Arquivo principal do servidor
└── README.md
```

## 🛠️ Instalação e Execução

### 1. Instalar dependências
```bash
npm install
```

### 2. Executar o servidor
```bash
# Modo desenvolvimento (com nodemon)
npm run dev

# Modo produção
npm start
```

O servidor será iniciado na porta 3000 por padrão.

## 📊 Estrutura dos Dados

### Tipo de Usuário
```json
{
  "id": 1,
  "descricao": "Médico",
  "situacao": true,
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T10:00:00.000Z"
}
```

### Usuário
```json
{
  "id": 1,
  "nome": "Dr. João Silva",
  "telefone": "(11) 99999-9999",
  "email": "joao@email.com",
  "tipoDeProfissional": 1,
  "situacao": true,
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T10:00:00.000Z",
  "tipoProfissional": {
    "id": 1,
    "descricao": "Médico"
  }
}
```

## 🔗 Endpoints da API

### Tipos de Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /tipos-usuarios` | Listar todos os tipos de usuários |
| GET | /tipos-usuarios/:id` | Buscar tipo de usuário por ID |
| POST | /tipos-usuarios` | Criar novo tipo de usuário |
| PUT | /tipos-usuarios/:id` | Atualizar tipo de usuário |
| DELETE | /tipos-usuarios/:id` | Deletar tipo de usuário |

### Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /usuarios` | Listar todos os usuários |
| GET | /usuarios/:id` | Buscar usuário por ID |
| POST | /usuarios` | Criar novo usuário |
| PUT | /usuarios/:id` | Atualizar usuário |
| DELETE | /usuarios/:id` | Deletar usuário |

## 📝 Exemplos de Uso

### Criar um tipo de usuário
```bash
curl -X POST http://localhost:3000/tipos-usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "descricao": "Médico",
    "situacao": true
  }'
```

### Criar um usuário
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Dr. João Silva",
    "telefone": "(11) 99999-9999",
    "email": "joao@email.com",
    "tipoDeProfissional": 1,
    "situacao": true
  }'
```

### Listar todos os usuários
```bash
curl http://localhost:3000/api/usuarios
```

## 🗄️ Banco de Dados

O banco de dados SQLite será criado automaticamente na pasta `database/` com o nome `simplifit.sqlite` quando o servidor for iniciado pela primeira vez.

### Tabelas criadas:
- `tipos_usuarios` - Armazena os tipos de usuários
- `usuarios` - Armazena os usuários

## ⚠️ Validações

### Tipo de Usuário
- `descricao`: Obrigatório, não pode ser vazio
- `situacao`: Obrigatório, valor padrão `true`

### Usuário
- `nome`: Obrigatório, não pode ser vazio
- `tipoDeProfissional`: Obrigatório, deve referenciar um tipo de usuário existente
- `email`: Opcional, mas se fornecido deve ter formato válido
- `situacao`: Obrigatório, valor padrão `true`

## 🔧 Configuração

O servidor pode ser configurado através de variáveis de ambiente:

- `PORT`: Porta do servidor (padrão: 3000)
- `NODE_ENV`: Ambiente de execução (development/production)

## 📄 Licença

ISC
