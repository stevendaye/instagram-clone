import { create } from "zustand";

/* userProfileStore is the store used on Porfile Header for
 * followwers count
 * following count
 * posts count
 */
const useUserProfileStore = create((set) => ({
  userProfile: null,
  setUserProfile: (userProfile) => set({ userProfile }),
  addPost: (post) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        posts: [post.id, ...state.userProfile.posts],
      },
    })),
  removePost: (id) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        posts: state.userProfile.posts.filter((postId) => postId !== id),
      },
    })),
}));

export default useUserProfileStore;
