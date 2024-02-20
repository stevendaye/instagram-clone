import { Flex, Image, Text, useToast } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import useAuthStore from "../../store/useAuthStore";
import { doc, getDoc, setDoc } from "firebase/firestore";

const GoogleAuth = ({ prefix }) => {
  const showToast = useToast();
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
  const loginUser = useAuthStore((state) => state.login);

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();

      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }

      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // Login if user already exists
        const userDoc = userSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      } else {
        // Signup if not
        const userDoc = {
          uuid: newUser.user.uid,
          email: newUser.user.email,
          fullName: newUser.user.displayName,
          username: newUser.user.email.split("@")[0],
          bio: "",
          profilePicUrl: newUser.user.photoURL,
          posts: [],
          followers: [],
          following: [],
          createdAt: Date.now(),
        };

        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    } catch (err) {
      showToast("Error", err.message, "error");
    }
  };

  return (
    <>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        cursor={"pointer"}
        onClick={handleGoogleAuth}
      >
        <Image src="/google.png" w={5} alt="Google Logo" />
        <Text mx={2} color={"blue.500"}>
          {prefix} with Google
        </Text>
      </Flex>
    </>
  );
};

export default GoogleAuth;
