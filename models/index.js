const { sequelize } = require('../config/database');
const TipoUsuario = require('./TipoUsuario');
const Usuario = require('./Usuario');

// Definir associações
Usuario.belongsTo(TipoUsuario, {
  foreignKey: 'tipoDeProfissional',
  as: 'tipoProfissional'
});

TipoUsuario.hasMany(Usuario, {
  foreignKey: 'tipoDeProfissional',
  as: 'usuarios'
});

// Sincronizar banco de dados
const syncDatabase = async () => {
  try {
    // Sincronizar todas as tabelas
    await sequelize.sync({ 
      force: false, 
      alter: false 
    });
    
    console.log('✅ Tabelas sincronizadas com sucesso!');
    console.log('📋 Tabelas criadas/verificadas:');
    console.log('   - tipos_usuarios');
    console.log('   - usuarios');
    
    // Verificar se as tabelas foram criadas
    const tables = await sequelize.getQueryInterface().showAllTables();
    console.log(`📊 Total de tabelas no banco: ${tables.length}`);
    
  } catch (error) {
    console.error('❌ Erro ao sincronizar banco de dados:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  TipoUsuario,
  Usuario,
  syncDatabase
};
