import type { Prisma } from "@/@types/prisma/client.js";
import type { IPostsRepository } from "../posts-repository.js";
import { prisma } from "@/libs/prisma.js";

export class PrismaPostsRepository implements IPostsRepository {
    async create(data: Prisma.PostUncheckedCreateInput) {
        return await prisma.post.create({data})
    }

    async list() {
        return await prisma.post.findMany()
    }
}