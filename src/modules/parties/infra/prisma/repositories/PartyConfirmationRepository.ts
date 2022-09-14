import { prisma } from "@database/prismaClient";
import { IPartyConfirmationRepository } from "@modules/parties/repositories/IPartyConfirmationRepository";
import { PartyConfirmation } from "@prisma/client";

class PartyConfirmationRepository implements IPartyConfirmationRepository {
	async findById(id: string): Promise<PartyConfirmation | null> {
		const partyConfirmation = await prisma.partyConfirmation.findUnique({
			where: {
				id
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

	async create(userId: string, partyId: string): Promise<any> {
		const partyConfirmation = await prisma.partyConfirmation.create({
			data: {
				userId,
				partyId
			}
		});

		return partyConfirmation;
	}

	async delete(id: string): Promise<PartyConfirmation> {
		const deletedPartyConfirmation = await prisma.partyConfirmation.delete({
			where: {
				id
			}
		});

		return deletedPartyConfirmation;
	}
}

export { PartyConfirmationRepository };
