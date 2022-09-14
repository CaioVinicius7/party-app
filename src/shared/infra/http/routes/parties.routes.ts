import { Router } from "express";

import { CreatePartyController } from "@modules/parties/useCases/createParty/CreatePartyController";
import { ListAvailablePartiesController } from "@modules/parties/useCases/listAvailableParties/ListAvailablePartiesController";
import { ConfirmPartyPresenceController } from "@modules/parties/useCases/confirmPartyPresence/ConfirmPartyPresenceController";

import { ensureAuthenticateUser } from "../middlewares/ensureAuthenticateUser";
import { DisconfirmPartyPresenceController } from "@modules/parties/useCases/disconfirmPartyPresence/DisconfirmPartyPresenceController";

const partiesRoutes = Router();

const createPartyUserController = new CreatePartyController();
const listAvailablePartiesController = new ListAvailablePartiesController();
const confirmPartyPresenceController = new ConfirmPartyPresenceController();
const disconfirmPartyPresenceController =
	new DisconfirmPartyPresenceController();

partiesRoutes.get("/", listAvailablePartiesController.handle);

partiesRoutes.post(
	"/",
	ensureAuthenticateUser,
	createPartyUserController.handle
);

partiesRoutes.post(
	"/confirm",
	ensureAuthenticateUser,
	confirmPartyPresenceController.handle
);

partiesRoutes.delete(
	"/disconfirm",
	ensureAuthenticateUser,
	disconfirmPartyPresenceController.handle
);

export { partiesRoutes };
