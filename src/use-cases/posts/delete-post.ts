import type { IPostsRepository } from "@/repositories/posts-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface DeletePostUseCaseRequest {
    publicId: string;
}

export class DeletePostUseCase {
    constructor(private postsRepository: IPostsRepository){}
    async execute({publicId}: DeletePostUseCaseRequest){
        const post = await this.postsRepository.findBy({publicId});
        if (!post) {
            throw new ResourceNotFoundError();
        }
        await this.postsRepository.delete(post.id)
    }
}