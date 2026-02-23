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

    async delete(id: number) {
        await prisma.post.delete({
            where: {id}
        })
    }

    async findBy(where: Prisma.PostWhereInput){
        return await prisma.post.findFirst({where});
    }

    async update(id: number, data: Prisma.PostUpdateInput) {
        return await prisma.post.update({
            where: {id},
            data
        })
    }

    async findByUser(id: number) {
        return await prisma.post.findMany({
            where: {userId: id}
        })
    }
}