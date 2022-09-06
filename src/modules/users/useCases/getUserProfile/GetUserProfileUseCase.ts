import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { User } from "@prisma/client";
import { inject, injectable } from "tsyringe";

@injectable()
class GetUserProfileUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}

	async execute(id: string): Promise<User> {
		const user = await this.usersRepository.findById(id);

		return user!;
	}
}

export { GetUserProfileUseCase };
