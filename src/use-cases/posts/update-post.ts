import type { Post } from "@/@types/prisma/client.js";
import type { IPostsRepository } from "@/repositories/posts-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface UpdatePostUseCaseRequest {
  publicId: string;
  title?: string;
  content?: string;
}

type UpdatePostUseCaseResponse = {
  post: Post;
};

export class UpdatePostUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async execute({
    publicId,
    title,
    content,
  }: UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse> {
    const postToUpdate = await this.postsRepository.findBy({ publicId });
    if (!postToUpdate) {
      throw new ResourceNotFoundError();
    }

    const post = await this.postsRepository.update(postToUpdate.id, {
        title,
        content
    })
    return { post }
  }
}
