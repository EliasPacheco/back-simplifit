const express = require('express');
const cors = require('cors');
const { syncDatabase } = require('./models');
const { createDatabaseIfNotExists } = require('./config/database');

// Importar rotas
const tipoUsuarioRoutes = require('./routes/tipoUsuario');
const usuarioRoutes = require('./routes/usuario');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para log de requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rotas da API
app.use('/tipos-usuarios', tipoUsuarioRoutes);
app.use('/usuarios', usuarioRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({
    message: 'API Simplifit funcionando!',
    version: '1.0.0',
    endpoints: {
      tiposUsuarios: '/tipos-usuarios',
      usuarios: '/usuarios'
    }
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Middleware para tratamento de erros
app.use((error, req, res, next) => {
  console.error('Erro:', error);
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    details: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// Inicializar servidor
const startServer = async () => {
  try {
    // Criar banco de dados se não existir
    console.log('🔍 Verificando se o banco de dados "simplifit" existe...');
    await createDatabaseIfNotExists();
    
    // Sincronizar banco de dados (criar tabelas)
    console.log('🔄 Sincronizando tabelas do banco de dados...');
    await syncDatabase();
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📊 API disponível em: http://localhost:${PORT}`);
      console.log(`📋 Endpoints disponíveis:`);
      console.log(`   - GET    /tipos-usuarios`);
      console.log(`   - POST   /tipos-usuarios`);
      console.log(`   - GET    /tipos-usuarios/:id`);
      console.log(`   - PUT    /tipos-usuarios/:id`);
      console.log(`   - DELETE /tipos-usuarios/:id`);
      console.log(`   - GET    /usuarios`);
      console.log(`   - POST   /usuarios`);
      console.log(`   - GET    /usuarios/:id`);
      console.log(`   - PUT    /usuarios/:id`);
      console.log(`   - DELETE /usuarios/:id`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();
