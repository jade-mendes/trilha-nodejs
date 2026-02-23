import type { Post } from "@/@types/prisma/client.js";
import type { IPostsRepository } from "@/repositories/posts-repository.js";
import type { IUsersRepository } from "@/repositories/users-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface ListPostsByUserUseCaseRequest {
    publicId: string;
}

type ListPostsByUserUseCaseResponse = {
    posts: Post[]
}

export class ListPostsByUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private postsRepository: IPostsRepository
    ){}

    async execute({publicId}:ListPostsByUserUseCaseRequest): Promise<ListPostsByUserUseCaseResponse> {
        const user = await this.usersRepository.findBy({publicId})
        if (!user) {
            throw new ResourceNotFoundError()
        }

        const posts = await this.postsRepository.findByUser(user.id)
        return { posts }
    }
}