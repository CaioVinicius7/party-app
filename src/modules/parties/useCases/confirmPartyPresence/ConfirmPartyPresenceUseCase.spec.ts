import { PartiesRepository } from "@modules/parties/infra/prisma/repositories/PartiesRepository";
import { PartyPresenceRepository } from "@modules/parties/infra/prisma/repositories/PartyPresenceRepository";
import { AppError } from "@shared/errors/AppError";
import { ConfirmPartyPresenceUseCase } from "./ConfirmPartyPresenceUseCase";

let partyPresenceRepository: PartyPresenceRepository;
let partiesRepository: PartiesRepository;
let confirmPartyPresenceUseCase: ConfirmPartyPresenceUseCase;

describe("Confirm Party Presence", () => {
	beforeEach(() => {
		partyPresenceRepository = new PartyPresenceRepository();
		partiesRepository = new PartiesRepository();
		confirmPartyPresenceUseCase = new ConfirmPartyPresenceUseCase(
			partyPresenceRepository,
			partiesRepository
		);
	});

	it("Should be able to confirm presence in a party", async () => {
		partiesRepository.findById = jest.fn().mockReturnValue({
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
		partyPresenceRepository.findByUserAndPartyId = jest
			.fn()
			.mockReturnValue(null);
		partyPresenceRepository.create = jest.fn().mockReturnValue({
			id: "db6e5a7b-df73-4800-8299-fee2adaeba47",
			userId: "c02e3cb9-6a3d-43cf-9c4b-8c779cc7db94",
			partyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			created_at: "2022-09-23T02:44:38.287Z"
		});

		const userId = "c02e3cb9-6a3d-43cf-9c4b-8c779cc7db94";
		const partyId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

		const result = await confirmPartyPresenceUseCase.execute(userId, partyId);

		expect(result).toHaveProperty("id");
		expect(result).toHaveProperty("userId");
		expect(result).toHaveProperty("partyId");
	});

	it("Should not be able to confirm presence in nonexistent party", async () => {
		partiesRepository.findById = jest.fn().mockReturnValue(null);

		const userId = "c02e3cb9-6a3d-43cf-9c4b-8c779cc7db94";
		const partyId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

		await expect(
			confirmPartyPresenceUseCase.execute(userId, partyId)
		).rejects.toEqual(new AppError("Party with this id does not exist!"));
	});

	it("Should not be able to confirm presence if you already confirm presence in the same party", async () => {
		partiesRepository.findById = jest.fn().mockReturnValue({
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
		partyPresenceRepository.findByUserAndPartyId = jest.fn().mockReturnValue({
			id: "db6e5a7b-df73-4800-8299-fee2adaeba47",
			userId: "c02e3cb9-6a3d-43cf-9c4b-8c779cc7db94",
			partyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			created_at: "2022-09-23T02:44:38.287Z"
		});

		const userId = "c02e3cb9-6a3d-43cf-9c4b-8c779cc7db94";
		const partyId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

		await expect(
			confirmPartyPresenceUseCase.execute(userId, partyId)
		).rejects.toEqual(
			new AppError("Presence already confirmed for this party!")
		);
	});
});
