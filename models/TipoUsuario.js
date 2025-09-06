const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TipoUsuario = sequelize.define('TipoUsuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'A descrição é obrigatória'
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
  tableName: 'tipos_usuarios',
  timestamps: true // createdAt e updatedAt serão criados automaticamente
});

module.exports = TipoUsuario;
