import { inject, injectable } from "tsyringe";

import { IPartiesRepository } from "@modules/parties/repositories/IPartiesRepository";
import { Party } from "@prisma/client";

@injectable()
class ListAvailablePartiesUseCase {
	constructor(
		@inject("PartiesRepository")
		private partiesRepository: IPartiesRepository
	) {}

	async execute(): Promise<Party[]> {
		const parties = await this.partiesRepository.findAllAvailable();

		return parties;
	}
}

export { ListAvailablePartiesUseCase };
