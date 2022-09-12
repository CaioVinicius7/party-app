import { container } from "tsyringe";

import "@shared/container/providers";

import { PartiesRepository } from "@modules/parties/infra/prisma/repositories/PartiesRepository";
import { IPartiesRepository } from "@modules/parties/repositories/IPartiesRepository";
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IPartyConfirmationRepository } from "@modules/parties/repositories/IPartyConfirmationRepository";
import { PartyConfirmationRepository } from "@modules/parties/infra/prisma/repositories/PartyConfirmationRepository";

container.registerSingleton<IUsersRepository>(
	"UsersRepository",
	UsersRepository
);
container.registerSingleton<IPartiesRepository>(
	"PartiesRepository",
	PartiesRepository
);

container.registerSingleton<IPartyConfirmationRepository>(
	"PartyConfirmationRepository",
	PartyConfirmationRepository
);
