import { Router } from 'express';
import { createPostController, patchPostController,deletePostController} from '../controller/postController';

const router = Router();

// EXERCÍCIO 3: POST /posts (Criar post)
router.post('/', createPostController); 

// EXERCÍCIO 5: PATCH /posts/:id (Atualização parcial)
router.patch('/:id', patchPostController);

// EXERCÍCIO 6: DELETE /posts/:id (Remoção com autorização)
router.delete('/:id', deletePostController);

export default router;