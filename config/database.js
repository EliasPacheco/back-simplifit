const { Sequelize } = require('sequelize');

// Configurações do banco de dados
const DB_CONFIG = {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false
};

// Função para criar o banco de dados se não existir
const createDatabaseIfNotExists = async () => {
  try {
    // Conecta ao PostgreSQL sem especificar um banco específico
    const tempSequelize = new Sequelize('postgres', 'postgres', 'root', {
      ...DB_CONFIG
    });

    // Verifica se o banco 'simplifit' existe
    const [results] = await tempSequelize.query(
      "SELECT 1 FROM pg_database WHERE datname = 'simplifit'"
    );

    // Se não existir, cria o banco
    if (results.length === 0) {
      await tempSequelize.query('CREATE DATABASE simplifit');
      console.log('✅ Banco de dados "simplifit" criado com sucesso!');
    } else {
      console.log('✅ Banco de dados "simplifit" já existe!');
    }

    await tempSequelize.close();
  } catch (error) {
    console.error('❌ Erro ao verificar/criar banco de dados:', error.message);
    throw error;
  }
};

// Configuração principal do Sequelize
const sequelize = new Sequelize('simplifit', 'postgres', 'root', {
  ...DB_CONFIG,
  define: {
    timestamps: true, // Habilita createdAt e updatedAt automaticamente
    underscored: false,
    freezeTableName: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = { sequelize, createDatabaseIfNotExists };
