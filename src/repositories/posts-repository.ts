import type { Prisma, Post } from "@/@types/prisma/client.js";

export interface IPostsRepository {
    create(data: Prisma.PostUncheckedCreateInput): Promise<Post>
    findBy(where: Prisma.PostWhereInput): Promise<Post | null>
    findByUser(id: number): Promise<Post[]>
    list(): Promise<Post[]>
    delete(id: number): Promise<void>
    update(id: number, data: Prisma.PostUpdateInput): Promise<Post>
}