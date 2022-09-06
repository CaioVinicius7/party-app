import { User } from "@prisma/client";

import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IUsersRepository {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	findByPhone(phone: string): Promise<User | null>;
	create(data: ICreateUserDTO): Promise<User>;
	alterAvatarImageUrl(id: string, avatarUrl: string): Promise<void>;
}

export { IUsersRepository };
