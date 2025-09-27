// João Vitor Façanha Neves

import { users } from '../db';
import { User } from '../types/userTypes';
import { findUserByEmail, deleteUsersData } from '../data/userData';
import { findPostsByAuthorId } from '../data/postData';

// [GET - EXERCÍCIO 2] Filtra usuários por faixa etária
export const filterUsersByAgeRange = (min: number, max: number): User[] => {
  return users.filter(u => u.age >= min && u.age <= max);
};

// [PUT - EXERCÍCIO 4] Lógica para substituir usuário
export const replaceUser = (id: number, data: Omit<User, 'id'>): User | undefined => {
  // Regra de Negócio: Verificar conflito de email
  const emailConflict = findUserByEmail(data.email, id);
  if (emailConflict) {
    throw new Error('Este email já está sendo usado por outro usuário.');
  }
  // Chama a camada de dados (Repository) para a substituição
  return users.find(u => u.id === id) ? { id, ...data } : undefined;
};

// [DELETE - EXERCÍCIO 7] Lógica para limpeza condicional
export const cleanupInactiveUsers = (): number => {
  const usersToDelete: number[] = [];

  for (const user of users) {
    // Regra 1: Não remover administradores
    if (user.role === 'admin') {
      continue;
    }

    // Regra 2: Remover usuários sem posts
    const userPosts = findPostsByAuthorId(user.id);
    if (userPosts.length === 0) {
      usersToDelete.push(user.id);
    }
  }

  // Chama a camada de dados para a remoção em lote
  return deleteUsersData(usersToDelete);
};



