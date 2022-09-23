import { PartyPresenceRepository } from "@modules/parties/infra/prisma/repositories/PartyPresenceRepository";
import { AppError } from "@shared/errors/AppError";
import { DisconfirmPartyPresenceUseCase } from "./DisconfirmPartyPresenceUseCase";

let partyPresenceRepository: PartyPresenceRepository;
let disconfirmPartyPresenceUseCase: DisconfirmPartyPresenceUseCase;

describe("Disconfirm Party Presence", () => {
	beforeEach(() => {
		partyPresenceRepository = new PartyPresenceRepository();
		disconfirmPartyPresenceUseCase = new DisconfirmPartyPresenceUseCase(
			partyPresenceRepository
		);
	});

	it("Should be able to disconfirm presence in a party", async () => {
		partyPresenceRepository.findById = jest.fn().mockReturnValue({
			id: "db6e5a7b-df73-4800-8299-fee2adaeba47",
			userId: "c02e3cb9-6a3d-43cf-9c4b-8c779cc7db94",
			partyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			created_at: "2022-09-23T02:44:38.287Z"
		});
		partyPresenceRepository.delete = jest.fn().mockReturnValue({
			id: "db6e5a7b-df73-4800-8299-fee2adaeba47",
			userId: "c02e3cb9-6a3d-43cf-9c4b-8c779cc7db94",
			partyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			created_at: "2022-09-23T02:44:38.287Z"
		});

		const id = "db6e5a7b-df73-4800-8299-fee2adaeba47";

		const result = await disconfirmPartyPresenceUseCase.execute(id);

		expect(result).toHaveProperty("id");
		expect(result).toHaveProperty("userId");
		expect(result).toHaveProperty("partyId");
	});

	it("Should not be able to disconfirm presence in nonexistent party", async () => {
		partyPresenceRepository.findById = jest.fn().mockReturnValue(null);

		const id = "c02e3cb9-6a3d-43cf-9c4b-8c779cc7db94";

		await expect(disconfirmPartyPresenceUseCase.execute(id)).rejects.toEqual(
			new AppError("A party confirmation with this id not exists!")
		);
	});
});
