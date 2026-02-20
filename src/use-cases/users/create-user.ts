import type { User } from "@/@types/prisma/client.js";
import { env } from "@/env/index.js";
import { prisma } from "@/libs/prisma.js";
import { hash } from "bcryptjs";

interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type CreateUserUseCaseResponse = {
  user: User;
};

export class CreateUserUseCase {
  async execute({
    name,
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userWithSameEmail = await prisma.user.findFirst({
      where: {
        OR: [{ email }],
      },
    });

    if (userWithSameEmail) {
      throw new Error("E-mail already taken.");
    }

    const passwordHash = await hash(password, env.HASH_SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    return { user };
  }
}
