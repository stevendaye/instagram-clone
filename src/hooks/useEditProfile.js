import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/useUserProfileStore";

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const setProfileUser = useUserProfileStore((state) => state.setUserProfile);
  let URL = "";

  const showToast = useShowToast();

  const editProfile = async (inputs, selectedFile) => {
    if (isUpdating || !authUser) return;
    setIsUpdating(true);

    const storageRef = ref(storage, `{profilePics/${authUser.uuid}}`); // Define a storage reference for a the image URL
    const userDocRef = doc(firestore, "users", authUser.uuid);

    try {
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url"); // Upload the img string URL
        URL = await getDownloadURL(
          ref(storage, `{profilePics/${authUser.uuid}}`)
        ); // Get the newly stored URL reference
      }

      const updatedUser = {
        ...authUser,
        fullName: inputs.fullName || authUser.fullName,
        username: inputs.username || authUser.username,
        bio: inputs.bio || authUser.bio,
        profilePicUrl: URL || authUser.profilePicUrl,
      };

      await updateDoc(userDocRef, updatedUser);
      localStorage.setItem("user-info", JSON.stringify(updatedUser));
      setAuthUser(updatedUser);
      setProfileUser(updatedUser);
      showToast("Success", "Profile Updated Successfully!", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return { editProfile, isUpdating };
};

export default useEditProfile;
