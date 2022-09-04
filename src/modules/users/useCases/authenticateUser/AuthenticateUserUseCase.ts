import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}

	async execute(email: string, password: string): Promise<string> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError("Email or password incorrect.", 401);
		}

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw new AppError("Email or password incorrect.", 401);
		}

		const token = sign(
			{
				name: user.name,
				email: user.email
			},
			process.env.JWT_SECRET as string,
			{
				subject: user.id,
				expiresIn: "24h"
			}
		);

		return token;
	}
}

export { AuthenticateUserUseCase };
