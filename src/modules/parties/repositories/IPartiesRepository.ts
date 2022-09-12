import { Party } from "@prisma/client";

import { ICreatePartyDTO } from "../dtos/ICreatePartyDTO";

interface IPartiesRepository {
	findById(id: string): Promise<Party | null>;
	findAllAvailable(): Promise<Party[]>;
	findByName(name: string): Promise<Party | null>;
	create(data: ICreatePartyDTO): Promise<Party>;
}

export { IPartiesRepository };
