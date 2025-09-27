// João Vitor Façanha Neves

import express from 'express';
import { users } from '../db';
import { Request, Response } from 'express';
import { filterUsersByAgeRange } from '../business/userBusiness';
import { replaceUser } from '../business/userBusiness';
import { cleanupInactiveUsers } from '../business/userBusiness';


// Exercício 1 - Buscar usuário por ID (sem parseInt)
export const getUserById = (req: Request, res: Response) => {
  const userId = req.params.id; // pega o id como string

  const user = users.find((u) => String(u.id) === userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Usuário não encontrado",
    });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
};

// Exercício 2 - Filtrar usuários por fachetaria
 export const getUsersByAgeRange = (req: Request, res: Response) => {
  try {
    const min = Number(req.query.min);
    const max = Number(req.query.max);

    const filteredUsers = filterUsersByAgeRange(min, max);

    res.status(200).json({
      success: true,
      total: filteredUsers.length,
      data: filteredUsers,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//  EXERCÍCIO 4 Atualização completa
export const replaceUserController = (req: Request, res: Response) => {
    const userId = parseInt(req.params.id as string, 10); 
    const updatedData = req.body;

    if (isNaN(userId) || !updatedData.name || !updatedData.email || !updatedData.role || updatedData.age === undefined || isNaN(parseInt(updatedData.age))) {
        return res.status(400).json({ 
            success: false, 
            message: 'PUT requer ID válido na URL e todos os campos (name, email, role, age) no corpo da requisição.' 
        });
    }

    try {
        const result = replaceUser(userId, updatedData);

        if (!result) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
        }

        res.status(200).json({ success: true, message: 'Usuário substituído com sucesso.', data: result });
    } catch (error) {
        res.status(409).json({ success: false, message: error instanceof Error ? error.message : "Conflito de dados." });
    }
};

//  EXERCÍCIO 7 Limpeza condicional
export const cleanupInactiveUsersController = (req: Request, res: Response) => {
    const confirm = req.query.confirm;

    if (confirm !== 'true') {
        return res.status(400).json({ success: false, message: "Ação de limpeza deve ser confirmada. Adicione '?confirm=true' na URL." });
    }

    const deletedCount = cleanupInactiveUsers();

    res.status(200).json({ 
        success: true, 
        message: `${deletedCount} usuário(s) inativo(s) foram removido(s) com sucesso.`, 
        deletedCount 
    });
};



