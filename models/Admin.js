const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../config/database');

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: 'admin@admin.com',
    validate: {
      isEmail: {
        msg: 'Email deve ter um formato válido'
      },
      notEmpty: {
        msg: 'O email é obrigatório'
      }
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'A senha é obrigatória'
      }
    }
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Administrador',
    validate: {
      notEmpty: {
        msg: 'O nome é obrigatório'
      }
    }
  },
  situacao: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    validate: {
      notNull: {
        msg: 'A situação é obrigatória'
      }
    }
  }
}, {
  tableName: 'admins',
  timestamps: true, // createdAt e updatedAt serão criados automaticamente
  hooks: {
    // Hook para criptografar a senha antes de salvar
    beforeCreate: async (admin) => {
      if (admin.senha) {
        const saltRounds = 10;
        admin.senha = await bcrypt.hash(admin.senha, saltRounds);
      }
    },
    beforeUpdate: async (admin) => {
      if (admin.changed('senha')) {
        const saltRounds = 10;
        admin.senha = await bcrypt.hash(admin.senha, saltRounds);
      }
    }
  }
});

// Método para verificar senha
Admin.prototype.verificarSenha = async function(senha) {
  return await bcrypt.compare(senha, this.senha);
};

module.exports = Admin;
