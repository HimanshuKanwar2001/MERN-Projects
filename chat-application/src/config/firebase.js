import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc,getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBU29fWi-Eo7qoXnAevGtThvMDAqlNsq-8",
  authDomain: "chat-app-live-c2b06.firebaseapp.com",
  projectId: "chat-app-live-c2b06",
  storageBucket: "chat-app-live-c2b06.appspot.com",
  messagingSenderId: "708096435468",
  appId: "1:708096435468:web:3fb4b0cb8ebf6605341529",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//sign up method
const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword (auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey, There i am using chat application",
      lastSeen: Date.now(),
    });
    await setDoc(doc(db, "chats", user.uid), {
      chatData: [],
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};


//login

const login= async (email,password)=>{

    try{

        await signInWithEmailAndPassword(auth,email,password);


    }
    catch(error){
            console.error(error);
            toast.error(error.code.split('/')[1].split('-').join(' '));
    }

}

const logout=async()=>{
    try{

        await signOut(auth)
    }
    catch(error){
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}



export { signup,login,logout,auth,db };
