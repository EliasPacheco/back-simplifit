const { sequelize } = require('../config/database');
const TipoUsuario = require('./TipoUsuario');
const Usuario = require('./Usuario');
const Admin = require('./Admin');

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
    console.log('   - admins');
    
    // Verificar se as tabelas foram criadas
    const tables = await sequelize.getQueryInterface().showAllTables();
    console.log(`📊 Total de tabelas no banco: ${tables.length}`);
    
    // Criar admin padrão se não existir
    await criarAdminPadrao();
    
  } catch (error) {
    console.error('❌ Erro ao sincronizar banco de dados:', error);
    throw error;
  }
};

// Função para criar admin padrão
const criarAdminPadrao = async () => {
  try {
    const adminExistente = await Admin.findOne({
      where: { email: 'admin@admin.com' }
    });

    if (!adminExistente) {
      await Admin.create({
        email: 'admin@admin.com',
        senha: '123456'
      });
    } else {
      console.log('✅ Admin padrão já existe!');
    }
  } catch (error) {
    console.error('❌ Erro ao criar admin padrão:', error);
  }
};

module.exports = {
  sequelize,
  TipoUsuario,
  Usuario,
  Admin,
  syncDatabase
};
