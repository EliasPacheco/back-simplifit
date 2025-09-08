# Backend Simplifit

## 🛠️ Instalação e Execução

### 1. Configurar banco de dados
Certifique-se de que o PostgreSQL está instalado e rodando. O sistema criará automaticamente o banco de dados `simplifit` se não existir.

### 2. Instalar dependências
```bash
npm install
```

### 3. Executar o servidor
```bash
# Modo desenvolvimento (com nodemon)
npm run dev

# Modo produção
npm start
```

O servidor será iniciado na porta 3000 por padrão.

## 🔗 Endpoints da API

### Tipos de Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/tipos-usuarios` | Listar todos os tipos de usuários |
| GET | `/tipos-usuarios/:id` | Buscar tipo de usuário por ID |
| POST | `/tipos-usuarios` | Criar novo tipo de usuário |
| PUT | `/tipos-usuarios/:id` | Atualizar tipo de usuário |
| DELETE | `/tipos-usuarios/:id` | Deletar tipo de usuário |

### Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/usuarios` | Listar todos os usuários |
| GET | `/usuarios/:id` | Buscar usuário por ID |
| POST | `/usuarios` | Criar novo usuário |
| PUT | `/usuarios/:id` | Atualizar usuário |
| DELETE | `/usuarios/:id` | Deletar usuário |

### Administradores

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/admins` | Listar todos os administradores |
| GET | `/admins/:id` | Buscar administrador por ID |
| POST | `/admins` | Criar novo administrador |
| PUT | `/admins/:id` | Atualizar administrador |
| DELETE | `/admins/:id` | Deletar administrador |
| POST | `/admins/login` | Login de administrador |

## 🗄️ Banco de Dados

O banco de dados PostgreSQL será criado automaticamente com o nome `simplifit` quando o servidor for iniciado pela primeira vez.

### Tabelas criadas:
- `tipos_usuarios` - Armazena os tipos de usuários
- `usuarios` - Armazena os usuários
- `admins` - Armazena os administradores

## 🔧 Configuração

O servidor pode ser configurado através de variáveis de ambiente:

- `PORT`: Porta do servidor (padrão: 3000)
- `NODE_ENV`: Ambiente de execução (development/production)

### Configuração do Banco de Dados

O sistema está configurado para usar PostgreSQL com as seguintes configurações padrão:
- **Host**: localhost
- **Porta**: 5432
- **Usuário**: postgres
- **Senha**: root
- **Banco**: simplifit (criado automaticamente)

Para alterar essas configurações, edite o arquivo `config/database.js`.

