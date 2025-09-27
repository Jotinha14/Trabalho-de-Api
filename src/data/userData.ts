// João Vitor Façanha Neves

import { users } from '../db';
import { User } from '../types/userTypes';

// [GET, DELETE] Busca usuário por ID
export const findUserById = (id: number): User | undefined => {
  return users.find(u => u.id === id);
};

// [PUT] Busca usuário por e-mail (para checar conflito)
export const findUserByEmail = (email: string, excludeId?: number): User | undefined => {
  return users.find(u => u.email === email && (excludeId ? u.id !== excludeId : true));
};

// [PUT] Substitui o usuário completamente
export const replaceUserData = (id: number, updatedUser: User): User | undefined => {
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { ...updatedUser, id: id };
    return users[index];
  }
  return undefined;
};

// [DELETE - EXERCÍCIO 7] Remove usuários por lista de IDs
export const deleteUsersData = (ids: number[]): number => {
  let deletedCount = 0;
  for (const id of ids) {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      deletedCount++;
    }
  }
  return deletedCount;
};


