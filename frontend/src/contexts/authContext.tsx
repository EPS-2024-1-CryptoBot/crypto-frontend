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
  signUpWithMailAndPassword: (email: string, password: string, username: string) => Promise<boolean>;
  signInWithMailAndPassword: (username: string, password: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);

  // Signs in on firebase with email and password and then validates the user on the backend
  const signInWithMailAndPassword = async (email: string, password: string) => {
    const auth = getAuth(app);
    const result = await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential: UserCredential) => {
        const user = userCredential.user;
        setCurrentUser(user);

        try {
          const result = await api.post('/auth/login', {
            email,
            token: await userCredential.user.getIdToken()
          });

          if (result.data.token) {
            localStorage.setItem('token', result.data.token);
          }
        } catch (error) {
          console.error(error);
        }

        return true;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
    return result;
  };

  // Signs up on firebase with email and password.
  const signUpWithMailAndPassword = async (email: string, password: string, username: string) => {
    
    const auth = getAuth(app);
    const result = await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser({ ...user, displayName: username });
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
    localStorage.removeItem('token');
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
