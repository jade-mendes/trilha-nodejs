import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository.js";
import { GetPostUseCase } from "../posts/get-post.js";

export function makeGetPostUseCase() {
  const postsRepository = new PrismaPostsRepository();
  const getPostUseCase = new GetPostUseCase(postsRepository);
  return getPostUseCase;
}
