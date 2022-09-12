import { PartyConfirmation } from "@prisma/client";

interface IPartyConfirmationRepository {
	create(userId: string, partyId: string): Promise<PartyConfirmation>;
}

export { IPartyConfirmationRepository };
