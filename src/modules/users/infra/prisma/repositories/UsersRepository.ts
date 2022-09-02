import { prisma } from "@database/prismaClient";
import { User } from "@prisma/client";

import { IUsersRepository } from "../../../repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		});

		return user;
	}

	async create(name: string, email: string, password: string): Promise<User> {
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password
			}
		});

		return user;
	}
}

export { UsersRepository };
