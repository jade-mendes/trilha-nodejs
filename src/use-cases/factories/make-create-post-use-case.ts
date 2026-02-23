import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository.js";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { CreatePostUseCase } from "../posts/create-post.js";

export function makeCreatePostUseCase() {
  const postsRepository = new PrismaPostsRepository();
  const usersRepository = new PrismaUsersRepository();

  const createPostUseCase = new CreatePostUseCase(
    postsRepository,
    usersRepository,
  );
  return createPostUseCase
}
