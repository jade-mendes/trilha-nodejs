import type { Post } from "@/@types/prisma/client.js";
import type { IPostsRepository } from "@/repositories/posts-repository.js";
import type { IUsersRepository } from "@/repositories/users-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface CreatePostUseCaseRequest {
    title: string;
    content: string;
    userPublicId: string;
}

type CreatePostUseCaseResponse = {
    post: Post;
}

export class CreatePostUseCase {
    constructor(
        private postsRepository: IPostsRepository,
        private usersRepository: IUsersRepository
    ){}
    async execute({
        title,
        content,
        userPublicId
    }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
        try {
            const user = await this.usersRepository.findBy({
                publicId: userPublicId
            })

            if (!user) {
                throw new ResourceNotFoundError
            }

            const post = await this.postsRepository.create({
                title,
                content,
                userId: user.id
            })

            return { post }

        } catch (error) {
            throw error
        }
    }
}