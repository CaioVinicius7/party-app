import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { User } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface ICreateUser {
	name: string;
	email: string;
	password: string;
}

@injectable()
class CreateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}

	async execute({ name, email, password }: ICreateUser): Promise<User> {
		const userExists = await this.usersRepository.findByEmail(email);

		if (userExists) {
			throw new AppError("A user with this email already exists");
		}

		const hashPassword = await hash(password, 10);

		const user = await this.usersRepository.create(name, email, hashPassword);

		return user;
	}
}

export { CreateUserUseCase };
