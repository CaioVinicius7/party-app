import { User } from "@prisma/client";

interface IUsersRepository {
	findByEmail(email: string): Promise<User | null>;
	create(name: string, email: string, password: string): Promise<User>;
}

export { IUsersRepository };
