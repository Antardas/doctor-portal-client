import initializeFirebase from "../Pages/Login/Firebase/firebase.initialization"
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, getIdToken } from 'firebase/auth'
import { useEffect, useState } from "react";
initializeFirebase();

const useFirebase = () => {
    const auth = getAuth();
    const [user, setUser] = useState({});
    const [admin, setAdmin] = useState(false);
    const [error, setError] = useState('');
    const [token, setToken] = useState('');
    // Loading check state
    const [isLoading, setIsLoading] = useState(true);


    // Sign up using email & password
    const registerWithEmailPassword = (email, password, name, location, history) => {
        setIsLoading(true);
        console.log(name)
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const destination = location?.state?.from || '/';
                const photourl = 'https://smcatalog.ru/upload/resize_cache/iblock/44c/60_60_1/44c96c6e612e94e45489acce024c8d76.png'
                const newUser = {
                    email,
                    displayName: name,
                    photoURL: photourl
                }
                setUser(newUser);
                // Save user to databse 
                saveUser(email, name, 'POST');


                // Update profile after creation
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: photourl
                }).then(() => {
                    // Profile updated!
                    // ...
                }).catch((error) => {
                    // An error occurred
                    // ...
                });
                setError('');
                history.replace(destination);
            }).catch(error => {
                setError(error.message);
                console.log(error.message);
            }).finally(() => setIsLoading(false));
        console.log(user);
    }



    // Sign in User 

    const signInUser = (email, password, location, history) => {
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                const destination = location?.state?.from || '/';
                setUser(user);
                setError('');
                console.log(user);
                console.log(location);
                history.replace(destination);
            }).catch(error => {
                setError(error.message);
                console.log(error.message);
            }).finally(() => setIsLoading(false))
    }

    // Sign in with Google
    const SignInWithGoogle = (location, history) => {
        setIsLoading(true);
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                setUser(user);
                setError('');
                saveUser(user.email, user.displayName, 'PUT')
                const destination = location?.state?.from || '/';
                console.log(location);
                history.replace(destination);
            }).catch(error => setError(error.message))
            .finally(() => setIsLoading(false));
    }

    // user log out
    const logOut = (history) => {
        setIsLoading(true)
        signOut(auth).then(() => {
            setUser({});
            setError('');
            history.replace('/')
        }).catch((error) => {
            setError(error.message);
        }).finally(() => setIsLoading(false));
    }

    // Observe user state

    useEffect(() => {
        setIsLoading(true);
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                getIdToken(user)
                    .then(idToken => {
                        setToken(idToken);
                    })
            } else {
                setUser({});
            }
            setIsLoading(false);
        });
        console.log(isLoading);
        return () => unSubscribe;
    }, []);
console.log(user.email)

    //  set user admin or not admin
    useEffect(() => {
        const url = `http://localhost:5000/users/${user?.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
            .catch(error => setError(error))
            .finally(() => setIsLoading(false))
    }, [user?.email]);


    // Save user db
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('http://localhost:5000/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
            .then(data => console.log(data));
    }

    return {
        user,
        setUser,
        registerWithEmailPassword,
        error,
        isLoading,
        logOut,
        signInUser,
        SignInWithGoogle,
        admin,
        token
    }
}
export default useFirebase;