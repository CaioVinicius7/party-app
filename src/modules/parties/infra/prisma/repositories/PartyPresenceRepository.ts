import { prisma } from "@database/prismaClient";
import { IPartyPresenceRepository } from "@modules/parties/repositories/IPartyPresenceRepository";
import { PartyPresence } from "@prisma/client";

class PartyPresenceRepository implements IPartyPresenceRepository {
	async findById(id: string): Promise<PartyPresence | null> {
		const partyConfirmation = await prisma.partyPresence.findUnique({
			where: {
				id
			}
		});

		return partyConfirmation;
	}

	async findByUserAndPartyId(
		userId: string,
		partyId: string
	): Promise<PartyPresence | null> {
		const partyConfirmation = await prisma.partyPresence.findFirst({
			where: {
				userId,
				partyId
			}
		});

		return partyConfirmation;
	}

	async create(userId: string, partyId: string): Promise<any> {
		const partyConfirmation = await prisma.partyPresence.create({
			data: {
				userId,
				partyId
			}
		});

		return partyConfirmation;
	}

	async delete(id: string): Promise<PartyPresence> {
		const deletedPartyConfirmation = await prisma.partyPresence.delete({
			where: {
				id
			}
		});

		return deletedPartyConfirmation;
	}
}

export { PartyPresenceRepository };
