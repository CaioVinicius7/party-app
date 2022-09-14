import { PartyPresence } from "@prisma/client";

interface IPartyPresenceRepository {
	findById(id: string): Promise<PartyPresence | null>;
	findByUserAndPartyId(
		userId: string,
		partyId: string
	): Promise<PartyPresence | null>;
	create(userId: string, partyId: string): Promise<PartyPresence>;
	delete(id: string): Promise<PartyPresence>;
}

export { IPartyPresenceRepository };
