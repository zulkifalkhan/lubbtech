import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import firestore from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

type User = FirebaseAuthTypes.User;

export type AuthContextData = {
  user: User | null;
  loading: boolean;
  signIn(email: string, password: string): Promise<void>;
  register(
    email: string,
    password: string,
    displayName: string,
    age: string
  ): Promise<void>;
  signOut(): void;
  resetPassword(email: string): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  function onAuthStateChanged(user: User | null) {
    setUser(user);
    if (loading) setLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error: any) => {
        if (error.code === "auth/user-not-found") {
          Toast.show({
            type: "error",
            text1: "There is no existing record for this user.",
          });
        }

        if (error.code === "auth/invalid-credential") {
          Toast.show({
            type: "error",
            text1: "These credentials are invalid.",
          });
        }

        if (error.code === "auth/invalid-email") {
          Toast.show({
            type: "error",
            text1: "This email address is invalid.",
          });
        }

        if (error.code === "auth/wrong-password") {
          Toast.show({ type: "error", text1: "This password is invalid." });
        }

        setLoading(false);
      });
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Toast.show({
          type: "success",
          text1: `We${`'`}ve sent a password reset link to your email.`,
        });
        setLoading(false);
      })
      .catch((error: any) => {
        Toast.show({ type: "error", text1: error.message });
        setLoading(false);
      });
  };

  const register = async (
    email: string,
    password: string,
    displayName: string,
    age: string
  ) => {
    setLoading(true);
    try {
      let userCred = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      await firestore().collection("users").doc(auth().currentUser?.uid).set({
        displayName: displayName,
        name: displayName,
        uid: auth().currentUser?.uid,
        age: age,
        firstPlanPosted: false,
      });

      Toast.show({
        type: "success",
        text1: `Account created. ${displayName}, welcome to Butter.`,
      });
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        Toast.show({
          type: "error",
          text1: "This email address is already in use.",
        });
      }
      if (error.code === "auth/invalid-email") {
        Toast.show({ type: "error", text1: "This email address is invalid." });
      }

      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    auth()
      .signOut()
      .then(() => console.log("User signed out!"));
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider
      value={{ user, loading, register, resetPassword, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthContext, AuthProvider, onGoogleButtonPress, useAuth };
