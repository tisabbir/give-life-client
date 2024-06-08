import { createContext, useEffect, useState} from "react";
import auth from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";

export const AuthContext = createContext(auth);
const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser =(email, password) => {
        setLoading(true);
       return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        });
      };

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=> {
           
                setUser(currentUser);
                setLoading(false);
        });

        return () => {
            unsubscribe();
        }
    },[])

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        updateUserProfile,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;