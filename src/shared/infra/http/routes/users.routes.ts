import { Router } from "express";
import multer from "multer";

import { multerConfig } from "@config/upload";
import { AuthenticateUserController } from "@modules/users/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/users/useCases/updateUserAvatar/UpdateUserAvatarController";

import { ensureAuthenticateUser } from "../middlewares/ensureAuthenticateUser";
import { GetUserProfileController } from "@modules/users/useCases/getUserProfile/GetUserProfileController";

const uploadAvatar = multer(multerConfig);

const usersRoutes = Router();

const getUserProfileController = new GetUserProfileController();
const authenticateUserController = new AuthenticateUserController();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/authenticate", authenticateUserController.handle);
usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", ensureAuthenticateUser, getUserProfileController.handle);
usersRoutes.patch(
	"/avatar",
	ensureAuthenticateUser,
	uploadAvatar.single("avatar"),
	updateUserAvatarController.handle
);

export { usersRoutes };
