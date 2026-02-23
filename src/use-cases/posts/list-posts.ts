import type { Post } from "@/@types/prisma/client.js";
import type { IPostsRepository } from "@/repositories/posts-repository.js";


type ListPostsUseCaseResponse = {
    posts: Post[];
};

export class ListPostsUseCase {
  constructor(private postsRepository: IPostsRepository) {}
  async execute(): Promise<ListPostsUseCaseResponse> {
    const posts = await this.postsRepository.list()
    return { posts }
  }
}
