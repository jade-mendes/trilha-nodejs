import type { Prisma, User } from "@/@types/prisma/client.js";


export interface IUsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findByEmail(email: string): Promise<User | null>
    findBy(where: Prisma.UserWhereInput): Promise<User | null>
}