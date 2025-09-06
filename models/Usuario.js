const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O nome é obrigatório'
      }
    }
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: {
        msg: 'Email deve ter um formato válido'
      }
    }
  },
  tipoDeProfissional: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tipos_usuarios',
      key: 'id'
    },
    validate: {
      notNull: {
        msg: 'O tipo de profissional é obrigatório'
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
      },
      notEmpty: {
        msg: 'A situação é obrigatória'
      }
    }
  }
}, {
  tableName: 'usuarios',
  timestamps: true // createdAt e updatedAt serão criados automaticamente
});

module.exports = Usuario;
