import { PartyConfirmation } from "@prisma/client";

interface IPartyConfirmationRepository {
	create(userId: string, partyId: string): Promise<PartyConfirmation>;
	findByUserAndPartyId(
		userId: string,
		partyId: string
	): Promise<PartyConfirmation | null>;
}

export { IPartyConfirmationRepository };