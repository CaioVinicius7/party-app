import { prisma } from "@database/prismaClient";
import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { User } from "@prisma/client";

import { IUsersRepository } from "../../../repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
	async findById(id: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				id
			}
		});

		return user;
	}

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

	async alterAvatarImageUrl(id: string, avatarUrl: string): Promise<void> {
		await prisma.user.update({
			where: {
				id
			},
			data: {
				banner: avatarUrl
			}
		});
	}
}

export { UsersRepository };
