// João Vitor Façanha Neves

import { Router } from 'express';
import { getUserById, getUsersByAgeRange,} from '../controller/userController';
import { replaceUserController } from '../controller/userController';
import { cleanupInactiveUsersController } from '../controller/userController';

const router = Router();

router.get("/:id", getUserById);
router.get("/age-range/filter", getUsersByAgeRange);
router.put("/:id", replaceUserController);
router.delete("/cleanup", cleanupInactiveUsersController);


export default router;





