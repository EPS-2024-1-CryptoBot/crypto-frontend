import { createContext, useEffect, useState } from 'react';
import { app } from '../config/firebase';
import {
  getAuth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential
} from 'firebase/auth';
import { api } from '../config/api';

interface AuthContextType {
  user: any;
  logout: () => Promise<void>;
  signUpWithMailAndPassword: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<boolean>;
  signInWithMailAndPassword: (email: string, password: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  setLoading: (loading: boolean) => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [loading, setLoading] = useState(false);

  // Signs in on firebase with email and password and then validates the user on the backend
  const signInWithMailAndPassword = async (email: string, password: string) => {
    setLoading(true);
    const auth = getAuth(app);
    const result = await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        return true;
      })
      .catch(() => {
        setLoading(false);
        return false;
      });
    setLoading(false);
    return result;
  };

  const signUpWithMailAndPassword = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    setLoading(true);
    const auth = getAuth(app);
    const result = await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential: UserCredential) => {
        const user = userCredential.user;
        // setCurrentUser(user);

        try {
          const result = await api.post('/auth/register', {
            email,
            token: await userCredential.user.getIdToken(),
            firstName,
            lastName,
            firebaseUid: user.uid
          });

          setCurrentUser(user);

          if (result.data.token) {
            localStorage.setItem('token', result.data.token);
          }
        } catch (error) {
          console.error(error);
        }
        setLoading(false);

        return true;
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        return false;
      });
    setLoading(false);
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
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const getUserSession = async () => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      try {
        const result = await api.post('/auth/login', {
          email: user.email,
          token
        });
        setCurrentUser(result.data.user);
        if (result.data.token) {
          localStorage.setItem('token', result.data.token);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getUserSession();
      }
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
        signInWithGoogle,
        setLoading,
        loading
      }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
