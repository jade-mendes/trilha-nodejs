import type { Prisma } from "@/@types/prisma/client.js";
import type { IUsersRepository } from "../users-repository.js";
import { prisma } from "@/libs/prisma.js";

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({ data });
  }

  async findByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        OR: [{ email }],
      },
    });
  }

  async findBy(where: Prisma.UserWhereInput) {
    return await prisma.user.findFirst({ where });
  }
}
