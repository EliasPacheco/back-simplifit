const express = require('express');
const router = express.Router();
const { Admin } = require('../models');

// Rota para listar todos os admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.findAll({
      attributes: { exclude: ['senha'] } // Excluir senha da resposta
    });
    res.json(admins);
  } catch (error) {
    console.error('Erro ao buscar admins:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para buscar admin por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id, {
      attributes: { exclude: ['senha'] } // Excluir senha da resposta
    });

    if (!admin) {
      return res.status(404).json({ error: 'Admin não encontrado' });
    }

    res.json(admin);
  } catch (error) {
    console.error('Erro ao buscar admin:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para criar novo admin
router.post('/', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verificar se email já existe
    const adminExistente = await Admin.findOne({ where: { email } });
    if (adminExistente) {
      return res.status(400).json({ error: 'Email já está em uso' });
    }

    const admin = await Admin.create({
      email,
      senha
    });

    // Retornar admin sem a senha
    const adminResponse = admin.toJSON();
    delete adminResponse.senha;

    res.status(201).json(adminResponse);
  } catch (error) {
    console.error('Erro ao criar admin:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: 'Dados inválidos', 
        details: error.errors.map(err => err.message) 
      });
    }
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para atualizar admin
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, senha, situacao } = req.body;

    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin não encontrado' });
    }

    // Verificar se email já existe em outro admin
    if (email && email !== admin.email) {
      const adminExistente = await Admin.findOne({ 
        where: { 
          email,
          id: { [require('sequelize').Op.ne]: id }
        } 
      });
      if (adminExistente) {
        return res.status(400).json({ error: 'Email já está em uso' });
      }
    }

    await admin.update({
      email: email || admin.email,
      senha: senha || admin.senha,
      situacao: situacao !== undefined ? situacao : admin.situacao
    });

    // Retornar admin sem a senha
    const adminResponse = admin.toJSON();
    delete adminResponse.senha;

    res.json(adminResponse);
  } catch (error) {
    console.error('Erro ao atualizar admin:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: 'Dados inválidos', 
        details: error.errors.map(err => err.message) 
      });
    }
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para deletar admin
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);

    if (!admin) {
      return res.status(404).json({ error: 'Admin não encontrado' });
    }

    await admin.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar admin:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para login de admin
router.post('/login', async (req, res) => {
  try {
    const { email, senha, password } = req.body;
    
    // Aceitar tanto 'senha' quanto 'password' para compatibilidade
    const senhaFinal = senha || password;

    if (!email || !senhaFinal) {
      return res.status(400).json({ error: 'Email ou senha incorretos' });
    }

    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    if (!admin.situacao) {
      return res.status(401).json({ error: 'Conta desativada' });
    }

    // Verificar se a senha está correta
    const senhaValida = await admin.verificarSenha(senhaFinal);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    // Retornar admin sem a senha
    const adminResponse = admin.toJSON();
    delete adminResponse.senha;

    res.json({
      message: 'Login realizado com sucesso',
      admin: adminResponse
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
