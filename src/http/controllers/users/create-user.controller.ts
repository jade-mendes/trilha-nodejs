import { z } from "zod";
import { prisma } from "@/libs/prisma.js";
import { hash } from 'bcryptjs'
import { env } from "@/env/index.js";
import type { FastifyRequest, FastifyReply } from "fastify";
import {
  MIN_PASSWORD_SIZE,
  MAX_PASSWORD_SIZE,
  MIN_USERNAME_SIZE,
  MAX_USERNAME_SIZE
} from "@/constants/validation-constants.js";


export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().trim().min(MIN_USERNAME_SIZE).max(MAX_USERNAME_SIZE),
    email: z.email(),
    password: z.string().min(MIN_PASSWORD_SIZE).max(MAX_PASSWORD_SIZE),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);
  
  const passwordHash = await hash(password, env.HASH_SALT_ROUNGS)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });

  return reply.status(201).send(user);
}
