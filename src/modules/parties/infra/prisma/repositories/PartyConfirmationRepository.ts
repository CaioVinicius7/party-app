import { prisma } from "@database/prismaClient";
import { IPartyConfirmationRepository } from "@modules/parties/repositories/IPartyConfirmationRepository";

class PartyConfirmationRepository implements IPartyConfirmationRepository {
	async create(userId: string, partyId: string): Promise<any> {
		const partyConfirmation = await prisma.partyConfirmation.create({
			data: {
				userId,
				partyId
			}
		});

		return partyConfirmation;
	}
}

export { PartyConfirmationRepository };
