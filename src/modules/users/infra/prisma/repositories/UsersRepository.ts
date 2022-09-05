import { prisma } from "@database/prismaClient";
import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
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

	async findByPhone(phone: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				phone
			}
		});

		return user;
	}

	async create({
		name,
		email,
		phone,
		password
	}: ICreateUserDTO): Promise<User> {
		const user = await prisma.user.create({
			data: {
				name,
				email,
				phone,
				password
			}
		});

		return user;
	}
}

export { UsersRepository };
