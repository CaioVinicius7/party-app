import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IStorageProvider } from "@shared/container/providers/storageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

interface IUpdateUserAvatarRequest {
	userId: string;
	avatarFile: string | undefined;
}

@injectable()
class UpdateUserAvatarUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository,
		@inject("StorageProvider")
		private storageProvider: IStorageProvider
	) {}

	async execute({
		userId,
		avatarFile
	}: IUpdateUserAvatarRequest): Promise<void> {
		if (!avatarFile) {
			throw new AppError("Avatar image is undefined");
		}

		const user = await this.usersRepository.findById(userId);

		if (user?.banner) {
			const currentAvatarImage = user.banner.split("/").at(-1);
			await this.storageProvider.delete(currentAvatarImage!, "avatar");
		}

		await this.storageProvider.save(avatarFile, "avatar");

		await this.usersRepository.alterAvatarImageUrl(
			userId,
			`${process.env.AWS_BUCKET_URL}/avatar/${avatarFile}`
		);
	}
}

export { UpdateUserAvatarUseCase };
