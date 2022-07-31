import Router from 'express';
import { userController } from '../controllers/userController.js';
import { registerValidation, loginValidation } from '../validations/authValidate.js';
import { checkAuth } from '../utils/checkAuth.js';
import { handleErrors } from '../utils/handleErrors.js';
const userRouter = new Router();

userRouter.post('/registration', registerValidation, handleErrors, userController.registration);
userRouter.post('/login', loginValidation, handleErrors, userController.login);
userRouter.get('/check', checkAuth, userController.check);

export { userRouter };
