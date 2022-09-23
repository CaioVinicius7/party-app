import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepository: UsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate User", () => {
	beforeEach(() => {
		usersRepository = new UsersRepository();
		authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
	});

	it("Should be able to authenticate an user", async () => {
		usersRepository.findByEmail = jest.fn().mockReturnValue({
			id: "807b0d89-685e-49fe-8b3a-0ad8f80403c9",
			name: "caio",
			email: "caio@gmail.com",
			phone: "(12) 94002-8922",
			password: "$2a$10$.iHxh36xGn0VD4xefWCxdOviAcY/fj3XiwYs7G/IZ6Ga9hxt1NDEO",
			banner: "https://github.com/caiovinicius7.png",
			created_at: "2022-09-05T19:15:02.118Z",
			updated_at: "2022-09-05T19:15:02.118Z"
		});

		const result = await authenticateUserUseCase.execute(
			"caio@gmail.com",
			"teste123"
		);

		expect(result);
		expect(typeof result).toBe("string");
	});

	it("Should not be able to authenticate an nonexistent user", async () => {
		usersRepository.findByEmail = jest.fn().mockReturnValue(null);

		await expect(
			authenticateUserUseCase.execute("caio@gmail.com", "teste123")
		).rejects.toEqual(new AppError("Email or password incorrect.", 401));
	});

	it("Should not be able to authenticate with incorrect password", async () => {
		usersRepository.findByEmail = jest.fn().mockReturnValue({
			id: "807b0d89-685e-49fe-8b3a-0ad8f80403c9",
			name: "caio",
			email: "caio@gmail.com",
			phone: "(12) 94002-8922",
			password: "$2a$10$.iHxh36xGn0VD4xefWCxdOviAcY/fj3XiwYs7G/IZ6Ga9hxt1NDEO",
			banner: "https://github.com/caiovinicius7.png",
			created_at: "2022-09-05T19:15:02.118Z",
			updated_at: "2022-09-05T19:15:02.118Z"
		});

		await expect(
			authenticateUserUseCase.execute("caio@gmail.com", "password123")
		).rejects.toEqual(new AppError("Email or password incorrect.", 401));
	});
});
