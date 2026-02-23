import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository.js";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { ListPostsByUserUseCase } from "../posts/list-posts-by-user.js";

export function makeListPostsByUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const postsRepository = new PrismaPostsRepository();
  const listPostsByUserUseCase = new ListPostsByUserUseCase(
    usersRepository,
    postsRepository,
  );
  return listPostsByUserUseCase;
}
