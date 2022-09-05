import { Party } from "@prisma/client";

import { ICreatePartyDTO } from "../dtos/ICreatePartyDTO";

interface IPartiesRepository {
	findByName(name: string): Promise<Party | null>;
	create(data: ICreatePartyDTO): Promise<Party>;
}

export { IPartiesRepository };
