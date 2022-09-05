import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { User } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";

import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}

	async execute({
		name,
		email,
		phone,
		password
	}: ICreateUserDTO): Promise<User> {
		const userWithEmailExists = await this.usersRepository.findByEmail(email);

		if (userWithEmailExists) {
			throw new AppError("A user with this email already exists");
		}

		const userWithPhoneExists = await this.usersRepository.findByPhone(phone);

		if (userWithPhoneExists) {
			throw new AppError("A user with this phone already exists");
		}

		const hashPassword = await hash(password, 10);

		const user = await this.usersRepository.create({
			name,
			email,
			phone,
			password: hashPassword
		});

		return user;
	}
}

export { CreateUserUseCase };
