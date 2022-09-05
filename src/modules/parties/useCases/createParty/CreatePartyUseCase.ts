import { inject, injectable } from "tsyringe";

import { ICreatePartyDTO } from "@modules/parties/dtos/ICreatePartyDTO";
import { IPartiesRepository } from "@modules/parties/repositories/IPartiesRepository";
import { Party } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreatePartyUseCase {
	constructor(
		@inject("PartiesRepository")
		private partiesRepository: IPartiesRepository
	) {}

	async execute({
		name,
		banner,
		price,
		coordination,
		description,
		date,
		userId
	}: ICreatePartyDTO): Promise<Party> {
		const partyExists = await this.partiesRepository.findByName(name);

		if (partyExists) {
			throw new AppError("A party with this name already exists");
		}

		const party = await this.partiesRepository.create({
			name,
			banner,
			price,
			coordination,
			description,
			date,
			userId
		});

		return party;
	}
}

export { CreatePartyUseCase };
