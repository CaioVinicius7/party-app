import { Router } from "express";

import { AuthenticateUserController } from "@modules/users/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";

const usersRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const createUserController = new CreateUserController();

usersRoutes.post("/authenticate", authenticateUserController.handle);
usersRoutes.post("/", createUserController.handle);

export { usersRoutes };
