import { PartiesRepository } from "@modules/parties/infra/prisma/repositories/PartiesRepository";
import { AppError } from "@shared/errors/AppError";
import { CreatePartyUseCase } from "./CreatePartyUseCase";

let partiesRepository: PartiesRepository;
let createPartyUseCase: CreatePartyUseCase;

describe("Create party", () => {
	beforeEach(() => {
		partiesRepository = new PartiesRepository();
		createPartyUseCase = new CreatePartyUseCase(partiesRepository);
	});

	it("Should be able to create a party", async () => {
		partiesRepository.findByName = jest.fn().mockReturnValue(null);
		partiesRepository.create = jest.fn().mockReturnValue({
			id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			name: "Festa Teste",
			banner: null,
			price: 50,
			coordination: "Coordenada",
			description: "Descrição Teste",
			date: "05/09/2022",
			status: false,
			draft: true,
			created_at: "2022-09-23T02:09:42.943Z",
			updated_at: "2022-09-23T02:09:42.943Z"
		});

		const result = await createPartyUseCase.execute({
			name: "Festa Teste",
			description: "Descrição teste",
			coordination: "Coordenada",
			date: "05/09/2022",
			price: 50,
			userId: "185d93ca-9b9a-4d61-bb7d-1388a76486c3"
		});

		expect(typeof result).toBe("object");
		expect(result).toHaveProperty("id");
		expect(result).toHaveProperty("created_at");
		expect(result).toHaveProperty("updated_at");
		expect(result.draft).toBe(true);
		expect(result.status).toBe(false);
	});

	it("Should not be able to create a party if a party with same name exists", async () => {
		partiesRepository.findByName = jest.fn().mockReturnValue({
			id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			name: "Festa Teste",
			banner: null,
			price: 50,
			coordination: "Coordenada",
			description: "Descrição Teste",
			date: "05/09/2022",
			status: false,
			draft: true,
			created_at: "2022-09-23T02:09:42.943Z",
			updated_at: "2022-09-23T02:09:42.943Z"
		});

		await expect(
			createPartyUseCase.execute({
				name: "Festa Teste",
				description: "Descrição teste",
				coordination: "Coordenada",
				date: "05/09/2022",
				price: 50,
				userId: "185d93ca-9b9a-4d61-bb7d-1388a76486c3"
			})
		).rejects.toEqual(new AppError("A party with this name already exists"));
	});
});
