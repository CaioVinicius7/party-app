import { PartyConfirmation } from "@prisma/client";

interface IPartyConfirmationRepository {
	findById(id: string): Promise<PartyConfirmation | null>;
	findByUserAndPartyId(
		userId: string,
		partyId: string
	): Promise<PartyConfirmation | null>;
	create(userId: string, partyId: string): Promise<PartyConfirmation>;
	delete(id: string): Promise<PartyConfirmation>;
}

export { IPartyConfirmationRepository };
