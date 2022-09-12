import { IPartiesRepository } from "@modules/parties/repositories/IPartiesRepository";
import { IPartyConfirmationRepository } from "@modules/parties/repositories/IPartyConfirmationRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class ConfirmPartyPresenceUseCase {
	constructor(
		@inject("PartyConfirmationRepository")
		private partyConfirmationRepository: IPartyConfirmationRepository,
		@inject("PartiesRepository")
		private partiesRepository: IPartiesRepository
	) {}

	async execute(userId: string, partyId: string) {
		const party = await this.partiesRepository.findById(partyId);

		if (!party) {
			throw new AppError("Party with this id does not exist!");
		}

		const partyConfirmation = await this.partyConfirmationRepository.create(
			userId,
			partyId
		);

		return partyConfirmation;
	}
}

export { ConfirmPartyPresenceUseCase };
