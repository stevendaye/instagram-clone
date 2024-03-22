import { create } from "zustand";

const usePostStore = create((set) => ({
  posts: [],
  createPost: (post) => set((state) => ({ post, ...state.posts })),
  deletePost: (id) =>
    set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, comment],
          };
        }

        return post;
      }),
    })),
  addLikes: (postId, userId) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          if (post.likes.includes(userId)) {
            return {
              ...post,
              likes: post.likes.filter((uuid) => uuid != userId),
            };
          }

          return {
            ...post,
            likes: [...post.likes, userId],
          };
        }

        return post;
      }),
    })),
  setPosts: (posts) => set({ posts }),
}));

export default usePostStore;
