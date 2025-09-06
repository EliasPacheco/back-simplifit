const express = require('express');
const router = express.Router();
const { Usuario, TipoUsuario } = require('../models');

// GET /api/usuarios - Listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [{
        model: TipoUsuario,
        as: 'tipoProfissional',
        attributes: ['id', 'descricao']
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários', details: error.message });
  }
});

// GET /api/usuarios/:id - Buscar usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id, {
      include: [{
        model: TipoUsuario,
        as: 'tipoProfissional',
        attributes: ['id', 'descricao']
      }]
    });
    
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário', details: error.message });
  }
});

// POST /api/usuarios - Criar novo usuário
router.post('/', async (req, res) => {
  try {
    const { nome, telefone, email, tipoDeProfissional, situacao = true } = req.body;
    
    if (!nome) {
      return res.status(400).json({ error: 'O nome é obrigatório' });
    }
    
    if (!tipoDeProfissional) {
      return res.status(400).json({ error: 'O tipo de profissional é obrigatório' });
    }
    
    if (situacao === undefined || situacao === null) {
      return res.status(400).json({ error: 'A situação é obrigatória' });
    }
    
    // Verificar se o tipo de profissional existe
    const tipoExiste = await TipoUsuario.findByPk(tipoDeProfissional);
    if (!tipoExiste) {
      return res.status(400).json({ error: 'Tipo de profissional não encontrado' });
    }
    
    const novoUsuario = await Usuario.create({
      nome,
      telefone,
      email,
      tipoDeProfissional,
      situacao
    });
    
    // Buscar o usuário criado com o tipo de profissional
    const usuarioCompleto = await Usuario.findByPk(novoUsuario.id, {
      include: [{
        model: TipoUsuario,
        as: 'tipoProfissional',
        attributes: ['id', 'descricao']
      }]
    });
    
    res.status(201).json(usuarioCompleto);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
  }
});

// PUT /api/usuarios/:id - Atualizar usuário
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone, email, tipoDeProfissional, situacao } = req.body;
    
    const usuario = await Usuario.findByPk(id);
    
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    // Verificar se o tipo de profissional existe (se fornecido)
    if (tipoDeProfissional) {
      const tipoExiste = await TipoUsuario.findByPk(tipoDeProfissional);
      if (!tipoExiste) {
        return res.status(400).json({ error: 'Tipo de profissional não encontrado' });
      }
    }
    
    // Atualizar apenas os campos fornecidos
    if (nome !== undefined) usuario.nome = nome;
    if (telefone !== undefined) usuario.telefone = telefone;
    if (email !== undefined) usuario.email = email;
    if (tipoDeProfissional !== undefined) usuario.tipoDeProfissional = tipoDeProfissional;
    if (situacao !== undefined) usuario.situacao = situacao;
    
    await usuario.save();
    
    // Buscar o usuário atualizado com o tipo de profissional
    const usuarioAtualizado = await Usuario.findByPk(id, {
      include: [{
        model: TipoUsuario,
        as: 'tipoProfissional',
        attributes: ['id', 'descricao']
      }]
    });
    
    res.json(usuarioAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário', details: error.message });
  }
});

// DELETE /api/usuarios/:id - Deletar usuário
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const usuario = await Usuario.findByPk(id);
    
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    await usuario.destroy();
    
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário', details: error.message });
  }
});

module.exports = router;
