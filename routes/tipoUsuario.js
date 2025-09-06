const express = require('express');
const router = express.Router();
const { TipoUsuario } = require('../models');

// GET /tipos-usuarios - Listar todos os tipos de usuários
router.get('/', async (req, res) => {
  try {
    const tiposUsuarios = await TipoUsuario.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(tiposUsuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tipos de usuários', details: error.message });
  }
});

// GET /tipos-usuarios/:id - Buscar tipo de usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tipoUsuario = await TipoUsuario.findByPk(id);
    
    if (!tipoUsuario) {
      return res.status(404).json({ error: 'Tipo de usuário não encontrado' });
    }
    
    res.json(tipoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tipo de usuário', details: error.message });
  }
});

// POST /tipos-usuarios - Criar novo tipo de usuário
router.post('/', async (req, res) => {
  try {
    const { descricao, situacao = true } = req.body;
    
    if (!descricao) {
      return res.status(400).json({ error: 'A descrição é obrigatória' });
    }
    
    const novoTipoUsuario = await TipoUsuario.create({
      descricao,
      situacao
    });
    
    res.status(201).json(novoTipoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tipo de usuário', details: error.message });
  }
});

// PUT /tipos-usuarios/:id - Atualizar tipo de usuário
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, situacao } = req.body;
    
    const tipoUsuario = await TipoUsuario.findByPk(id);
    
    if (!tipoUsuario) {
      return res.status(404).json({ error: 'Tipo de usuário não encontrado' });
    }
    
    // Atualizar apenas os campos fornecidos
    if (descricao !== undefined) tipoUsuario.descricao = descricao;
    if (situacao !== undefined) tipoUsuario.situacao = situacao;
    
    await tipoUsuario.save();
    
    res.json(tipoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tipo de usuário', details: error.message });
  }
});

// DELETE /tipos-usuarios/:id - Deletar tipo de usuário
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const tipoUsuario = await TipoUsuario.findByPk(id);
    
    if (!tipoUsuario) {
      return res.status(404).json({ error: 'Tipo de usuário não encontrado' });
    }
    
    await tipoUsuario.destroy();
    
    res.json({ message: 'Tipo de usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar tipo de usuário', details: error.message });
  }
});

module.exports = router;
