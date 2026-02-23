import type { Post } from "@/@types/prisma/client.js";

type HTTPPost = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export class PostPresenter {
  static toHTTP(post: Post): HTTPPost;
  static toHTTP(posts: Post[]): HTTPPost[];
  static toHTTP(input: Post | Post[]): HTTPPost | HTTPPost[] {
    if (Array.isArray(input)) {
      return input.map((post) => this.toHTTP(post));
    }

    return {
      id: input.publicId,
      title: input.title,
      content: input.content,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt
    };
  }
}
