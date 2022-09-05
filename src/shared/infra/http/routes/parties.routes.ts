import { Router } from "express";

import { CreatePartyController } from "@modules/parties/useCases/createParty/CreatePartyController";

import { ensureAuthenticateClient } from "../middlewares/ensureAuthenticateClient";

const partiesRoutes = Router();

const createPartyUserController = new CreatePartyController();

partiesRoutes.post(
	"/",
	ensureAuthenticateClient,
	createPartyUserController.handle
);

export { partiesRoutes };
