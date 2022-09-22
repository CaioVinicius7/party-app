import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepository: UsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
	beforeEach(() => {
		usersRepository = new UsersRepository();
		createUserUseCase = new CreateUserUseCase(usersRepository);
	});

	it("Should be able to create a new user", async () => {
		usersRepository.findByEmail = jest.fn().mockReturnValue(null);
		usersRepository.findByPhone = jest.fn().mockReturnValue(null);
		usersRepository.create = jest.fn().mockReturnValue({
			id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			name: "Caio Vinícius",
			email: "Caio@gmail.com",
			phone: "(12) 94402-8922",
			password: "$2a$10$I9fo.7l01Gln4cya9AuZV..Jtr6C7194YJlffd6a6z0Hnnti.wHl6",
			banner: null,
			created_at: "2022-09-22T21:50:47.290Z",
			updated_at: "2022-09-22T21:50:47.290Z"
		});

		const result = await createUserUseCase.execute({
			name: "Caio Vinícius",
			email: "Caio@gmail.com",
			phone: "(12) 94402-8922",
			password: "test123"
		});

		expect(typeof result).toBe("object");
		expect(result).toHaveProperty("id");
		expect(result).toHaveProperty("created_at");
		expect(result).toHaveProperty("updated_at");
	});

	it("Should not be able to create a new user with the e-mail already exists in another user record", async () => {
		usersRepository.findByEmail = jest.fn().mockReturnValue({
			id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			name: "Caio Vinícius",
			email: "Caio@gmail.com",
			phone: "(12) 94402-8922",
			password: "$2a$10$I9fo.7l01Gln4cya9AuZV..Jtr6C7194YJlffd6a6z0Hnnti.wHl6",
			banner: null,
			created_at: "2022-09-22T21:50:47.290Z",
			updated_at: "2022-09-22T21:50:47.290Z"
		});

		await expect(
			createUserUseCase.execute({
				name: "Caio Vinícius",
				email: "Caio@gmail.com",
				phone: "(12) 94402-8922",
				password: "test123"
			})
		).rejects.toEqual(new AppError("A user with this email already exists"));
	});

	it("Should not be able to create a new user with the phone already exists in another user record", async () => {
		usersRepository.findByEmail = jest.fn().mockReturnValue(null);
		usersRepository.findByPhone = jest.fn().mockReturnValue({
			id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			name: "Caio Vinícius",
			email: "Caio@gmail.com",
			phone: "(12) 94402-8922",
			password: "$2a$10$I9fo.7l01Gln4cya9AuZV..Jtr6C7194YJlffd6a6z0Hnnti.wHl6",
			banner: null,
			created_at: "2022-09-22T21:50:47.290Z",
			updated_at: "2022-09-22T21:50:47.290Z"
		});

		await expect(
			createUserUseCase.execute({
				name: "Caio Vinícius",
				email: "Caio.vinicius@gmail.com",
				phone: "(12) 94402-8922",
				password: "test123"
			})
		).rejects.toEqual(new AppError("A user with this phone already exists"));
	});
});
