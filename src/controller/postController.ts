import { Request, Response } from 'express';
import { createPost, patchPost, deletePost } from '../business/postBusiness';
import { saveNewPost } from '../data/postData';

// [POST - EXERCÍCIO 3] Criar post
export const createPostController = (req: Request, res: Response) => {
  const { title, content, authorId } = req.body;

  // Validação de Entrada
  if (!title || title.length < 3 || !content || content.length < 10 || isNaN(parseInt(authorId))) {
    return res.status(400).json({ success: false, message: 'Dados inválidos. Título (min 3) e Conteúdo (min 10) são obrigatórios, e AuthorId deve ser um número.' });
  }

  try {
    const newPost = createPost(title, content, parseInt(authorId));

    // Persiste o dado (Camada de Dados)
    saveNewPost(newPost);

    // 201 Created
    res.status(201).json({ success: true, message: 'Post criado com sucesso!', data: newPost });
  } catch (error) {
    // Trata o erro de "Autor não encontrado" (Regra de Negócio)
    return res.status(404).json({ success: false, message: error instanceof Error ? error.message : 'Erro desconhecido ao criar o post.' });
  }
};

// [PATCH - EXERCÍCIO 5] Atualização parcial
export const patchPostController = (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  const updateData = req.body;

  const allowedFields = ['title', 'content', 'published'];
  const fieldsToUpdate = {};

  // Validação: Garante que apenas campos permitidos sejam processados
  for (const key of Object.keys(updateData)) {
    if (allowedFields.includes(key)) {
      fieldsToUpdate[key] = updateData[key];
    } else if (['id', 'authorId', 'createdAt'].includes(key)) {
      return res.status(400).json({ success: false, message: `O campo '${key}' não pode ser alterado via PATCH.` });
    }
  }

  if (Object.keys(fieldsToUpdate).length === 0) {
    return res.status(400).json({ success: false, message: 'Nenhum campo válido para atualização fornecido.' });
  }

  const result = patchPost(postId, fieldsToUpdate);

  if (!result) {
    return res.status(404).json({ success: false, message: 'Post não encontrado.' });
  }

  res.status(200).json({ success: true, message: 'Post atualizado parcialmente.', data: result });
};

// [DELETE - EXERCÍCIO 6] Remoção com autorização
export const deletePostController = (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  // Simulação de Autorização via Header
  const userId = parseInt(req.headers['user-id'] as string);

  if (isNaN(postId)) {
    return res.status(400).json({ success: false, message: 'ID de post inválido.' });
  }
  if (isNaN(userId)) {
    return res.status(401).json({ success: false, message: 'O cabeçalho User-Id é obrigatório para esta operação.' });
  }

  try {
    const deleted = deletePost(postId, userId);

    if (deleted) {
      // 204 No Content: Resposta ideal para DELETE bem-sucedido
      return res.status(204).send();
    }

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido.';

    if (message.includes('não encontrado')) {
      return res.status(404).json({ success: false, message });
    }
    if (message.includes('Acesso negado')) {
      // 403 Forbidden: Usuário não tem permissão
      return res.status(403).json({ success: false, message });
    }
    return res.status(500).json({ success: false, message: 'Erro interno.' });
  }
};