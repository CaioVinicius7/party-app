import { prisma } from "@database/prismaClient";
import { IPartyConfirmationRepository } from "@modules/parties/repositories/IPartyConfirmationRepository";
import { PartyConfirmation } from "@prisma/client";

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

	async findByUserAndPartyId(
		userId: string,
		partyId: string
	): Promise<PartyConfirmation | null> {
		const partyConfirmation = await prisma.partyConfirmation.findFirst({
			where: {
				userId,
				partyId
			}
		});

		return partyConfirmation;
	}
}

export { PartyConfirmationRepository };
