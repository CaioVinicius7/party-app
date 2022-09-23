import { PartiesRepository } from "@modules/parties/infra/prisma/repositories/PartiesRepository";
import { AppError } from "@shared/errors/AppError";
import { ListAvailablePartiesUseCase } from "./ListAvailablePartiesUseCase";

let partiesRepository: PartiesRepository;
let listAvailablePartiesUseCase: ListAvailablePartiesUseCase;

describe("List Available Parties", () => {
	beforeEach(() => {
		partiesRepository = new PartiesRepository();
		listAvailablePartiesUseCase = new ListAvailablePartiesUseCase(
			partiesRepository
		);
	});

	it("Should be able to list all available parties", async () => {
		partiesRepository.findAllAvailable = jest.fn().mockReturnValue([
			{
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
			},
			{
				id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
				name: "Festa Teste 2",
				banner: null,
				price: 50,
				coordination: "Coordenada",
				description: "Descrição Teste 2",
				date: "10/09/2022",
				status: false,
				draft: true,
				created_at: "2022-09-23T02:20:42.943Z",
				updated_at: "2022-09-23T02:20:42.943Z"
			}
		]);

		const result = await listAvailablePartiesUseCase.execute();

		expect(result[0]).toHaveProperty("id");
		expect(result[0]).toHaveProperty("name");
	});

	it("Should be able to return a empty array if not exists available parties", async () => {
		partiesRepository.findAllAvailable = jest.fn().mockReturnValue([]);

		const result = await listAvailablePartiesUseCase.execute();

		expect(result).toEqual([]);
	});
});
