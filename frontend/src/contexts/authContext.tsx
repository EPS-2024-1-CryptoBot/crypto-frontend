import { createContext, useEffect, useState } from 'react';
import { app } from '../config/firebase';
import {
  getAuth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

interface AuthContextType {
  user: any;
  logout: () => Promise<void>;
  signUpWithMailAndPassword: (email: string, password: string) => Promise<boolean>;
  signInWithMailAndPassword: (username: string, password: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);

  // Signs in on firebase with email and password.
  const signInWithMailAndPassword = async (email: string, password: string) => {
    const auth = getAuth(app);
    const result = await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        const user = userCredential.user;
        setCurrentUser(user);
        return true;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
    return result;
  };

  // Signs up on firebase with email and password.
  const signUpWithMailAndPassword = async (email: string, password: string) => {
    const auth = getAuth(app);
    const result = await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user);
        return true;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
    return result;
  };

  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('token', await user.getIdToken());
        setCurrentUser(user);
        return true;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
    return result;
  };

  const logout = async () => {
    const auth = getAuth(app);
    await auth.signOut();
  };

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        signUpWithMailAndPassword,
        logout,
        signInWithMailAndPassword,
        signInWithGoogle
      }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
