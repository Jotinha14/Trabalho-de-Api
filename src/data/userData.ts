// João Vitor Façanha Neves

import { users } from '../db';
import { User } from '../types/userTypes';

export const findUserById = (id: number): User | undefined => {
  return users.find(u => u.id === id);
};

export const findUserByEmail = (email: string, excludeId?: number): User | undefined => {
  return users.find(u => u.email === email && (excludeId ? u.id !== excludeId : true));
};

export const replaceUserData = (id: number, updatedUser: User): User | undefined => {
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { ...updatedUser, id: id };
    return users[index];
  }
  return undefined;
};

//  EXERCÍCIO 7 Remove usuários por lista de IDs
export const deleteUsersData = (ids: number[]): number => {
  let deletedCount = 0;
  for (const id of ids) {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      // Verifica se é admin e se é o último admin
      if (users[index].role === "admin") {
        const adminCount = users.filter(u => u.role === "admin").length;
        if (adminCount <= 1) {
          // Não remove o último admin
          continue;
        }
      }
      users.splice(index, 1);
      deletedCount++;
    }
  }
  return deletedCount;
};


