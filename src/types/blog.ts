export type Author = {
    id: string;
    name: string;
    profilePicture: string;
    createdAt: string;
    updatedAt: string;
  };
  
  export type Category = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    postId: string;
  };
  
  export type Post = {
    id: string;
    title: string;
    content: string;
    thumbnail_url: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
  
    categories: Category[];
    author: Author;
  };
  
  export type PostList = Post[];
  