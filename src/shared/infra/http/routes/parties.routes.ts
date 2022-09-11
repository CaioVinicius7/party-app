import { Router } from "express";

import { CreatePartyController } from "@modules/parties/useCases/createParty/CreatePartyController";
import { ListAvailablePartiesController } from "@modules/parties/useCases/listAvailableParties/ListAvailablePartiesController";

import { ensureAuthenticateUser } from "../middlewares/ensureAuthenticateUser";

const partiesRoutes = Router();

const createPartyUserController = new CreatePartyController();
const listAvailablePartiesController = new ListAvailablePartiesController();

partiesRoutes.get("/", listAvailablePartiesController.handle);

partiesRoutes.post(
	"/",
	ensureAuthenticateUser,
	createPartyUserController.handle
);

export { partiesRoutes };
