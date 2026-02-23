import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository.js";
import { UpdatePostUseCase } from "../posts/update-post.js";

export function makeUpdatePostUseCase() {
    const postsRepository = new PrismaPostsRepository()
    const updatePostUseCase = new UpdatePostUseCase(postsRepository)
    return updatePostUseCase
}