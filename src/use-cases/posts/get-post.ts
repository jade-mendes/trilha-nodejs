import type { Post } from "@/@types/prisma/client.js";
import type { IPostsRepository } from "@/repositories/posts-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface GetPostUseCaseRequest {
    publicId: string;
}

type GetPostUseCaseResponse = {
    post: Post
}

export class GetPostUseCase {
    constructor(private postsRepository: IPostsRepository){}

    async execute({
        publicId
    }: GetPostUseCaseRequest): Promise<GetPostUseCaseResponse> {
       const post = await this.postsRepository.findBy({publicId})
       if (!post) {
        throw new ResourceNotFoundError()
       }
       return { post }
    }
}