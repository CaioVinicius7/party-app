import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository";
import { S3StorageProvider } from "@shared/container/providers/storageProvider/implementations/S3StorageProvider";
import { AppError } from "@shared/errors/AppError";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

let usersRepository: UsersRepository;
let storageProvider: S3StorageProvider;
let updateUserAvatarUseCase: UpdateUserAvatarUseCase;

describe("Update User Avatar", () => {
	beforeEach(() => {
		usersRepository = new UsersRepository();
		storageProvider = new S3StorageProvider();
		updateUserAvatarUseCase = new UpdateUserAvatarUseCase(
			usersRepository,
			storageProvider
		);

		storageProvider.save = jest.fn().mockReturnValue(null);
		storageProvider.delete = jest.fn().mockReturnValue(null);
	});

	it("Should be able to add a user avatar", async () => {
		usersRepository.findById = jest.fn().mockReturnValue({
			id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			name: "Caio Vinícius",
			email: "Caio@gmail.com",
			phone: "(12) 94402-8922",
			password: "$2a$10$I9fo.7l01Gln4cya9AuZV..Jtr6C7194YJlffd6a6z0Hnnti.wHl6",
			banner: null,
			created_at: "2022-09-22T21:50:47.290Z",
			updated_at: "2022-09-22T21:50:47.290Z"
		});
		usersRepository.alterAvatarImageUrl = jest.fn().mockReturnValue(null);

		const saveAvatarImageInS3 = jest.spyOn(storageProvider, "save");
		const saveAvatarImagePathInDB = jest.spyOn(
			usersRepository,
			"alterAvatarImageUrl"
		);

		const userId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
		const avatarFile = "e938be56bb62d3ac307f04e99c579599-profile.png";

		await updateUserAvatarUseCase.execute({
			userId,
			avatarFile
		});

		expect(saveAvatarImageInS3).toHaveBeenCalled();
		expect(saveAvatarImagePathInDB).toHaveBeenCalled();
	});

	it("Should be able to update a user avatar", async () => {
		usersRepository.findById = jest.fn().mockReturnValue({
			id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			name: "Caio Vinícius",
			email: "Caio@gmail.com",
			phone: "(12) 94402-8922",
			password: "$2a$10$I9fo.7l01Gln4cya9AuZV..Jtr6C7194YJlffd6a6z0Hnnti.wHl6",
			banner:
				"https://party-app-s3.s3.sa-east-1.amazonaws.com/avatar/28d8872c1bed0c508fbb6b6156b257ce-profile.png",
			created_at: "2022-09-22T21:50:47.290Z",
			updated_at: "2022-09-22T21:50:47.290Z"
		});
		usersRepository.alterAvatarImageUrl = jest.fn().mockReturnValue(null);

		const saveAvatarImageInS3 = jest.spyOn(storageProvider, "save");
		const deleteAvatarImageInS3 = jest.spyOn(storageProvider, "delete");
		const saveAvatarImagePathInDB = jest.spyOn(
			usersRepository,
			"alterAvatarImageUrl"
		);

		const userId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
		const avatarFile = "e938be56bb62d3ac307f04e99c579599-profile.png";

		await updateUserAvatarUseCase.execute({
			userId,
			avatarFile
		});

		expect(deleteAvatarImageInS3).toHaveBeenCalled();
		expect(saveAvatarImageInS3).toHaveBeenCalled();
		expect(saveAvatarImagePathInDB).toHaveBeenCalled();
	});

	it("Should not be able to update a user avatar if don't get the file name", async () => {
		await expect(
			updateUserAvatarUseCase.execute({
				userId: "4a43ba74-6947-4e3b-bcec-a5e085a6342f",
				avatarFile: ""
			})
		).rejects.toEqual(new AppError("Avatar image is undefined", 400));
	});
});
