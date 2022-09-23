import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository";

import { GetUserProfileUseCase } from "./GetUserProfileUseCase";

let usersRepository: UsersRepository;
let getUserProfileUseCase: GetUserProfileUseCase;

describe("Get User Profile", () => {
	beforeEach(() => {
		usersRepository = new UsersRepository();
		getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);
	});

	it("Should be able to get a user profile", async () => {
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

		const id = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

		const result = await getUserProfileUseCase.execute(id);

		expect(typeof result).toBe("object");
		expect(result.id).toBe(id);
	});
});
