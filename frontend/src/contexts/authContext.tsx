import {
  GoogleAuthProvider,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { api } from '../config/api';
import { app } from '../config/firebase';

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
  setCurrentUser: (user: User | null) => void;
  newCurrentUser: (user: User) => void;
  currentUser: any;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const saveToken = (token: string) => {
  localStorage.setItem('token', token);
}

const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Signs in on firebase with email and password and then validates the user on the backend
  const signInWithMailAndPassword = async (email: string, password: string) => {
    setLoading(true);
    const auth = getAuth(app);
    const result = await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential: UserCredential) => {
        try {
          const result = await api.post('/auth/login', {
            email,
            token: await userCredential.user.getIdToken()
          });
          setCurrentUser(result.data.user);
          console.log('result', result.data);

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
          
          setCurrentUser(result.data.user);

          if (result.data.token) {
            saveToken(result.data.token); 
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

  const newCurrentUser = async (user: any) => {
    console.log('newCurrentUser', user);
    const token = localStorage.getItem('token');
    console.log('token', token);
    const res = await api.get(`/users/${user.id}`);
    console.log('res', res);
    console.log('newCurrentUser', res.data);
    setCurrentUser(res.data);
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
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      setLoading(false);

      const tokenFromStorage = localStorage.getItem('token');

      if (user && tokenFromStorage) {
        try {
          const result = await api.post('/auth/login', {
            email: user.email,
            token: (await user.getIdToken())
          });
          setCurrentUser(result.data.user);

          if (result.data.token) {
            saveToken(result.data.token); 
          }
        } catch (error) {
          console.error(error);
        }
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
        setCurrentUser,
        loading,
        newCurrentUser,
        currentUser,
      }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
