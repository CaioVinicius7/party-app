import { prisma } from "@database/prismaClient";
import { ICreatePartyDTO } from "@modules/parties/dtos/ICreatePartyDTO";
import { IPartiesRepository } from "@modules/parties/repositories/IPartiesRepository";
import { Party } from "@prisma/client";

class PartiesRepository implements IPartiesRepository {
	async findAllAvailable(): Promise<Party[]> {
		const parties = await prisma.party.findMany({
			where: {
				draft: false
			}
		});

		return parties;
	}

	async findByName(name: string): Promise<Party | null> {
		const party = await prisma.party.findFirst({
			where: {
				name
			}
		});

		return party;
	}

	async create({
		name,
		banner,
		price,
		coordination,
		description,
		date,
		userId
	}: ICreatePartyDTO): Promise<Party> {
		const party = await prisma.party.create({
			data: {
				name,
				banner,
				price,
				coordination,
				description,
				date,
				userId
			}
		});

		return party;
	}
}

export { PartiesRepository };
