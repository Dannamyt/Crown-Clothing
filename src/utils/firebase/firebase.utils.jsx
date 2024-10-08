import { initializeApp } from "firebase/app";
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
      
} from "firebase/auth";
import { 
  getFirestore,
  doc,
  getDoc,
  setDoc ,
  collection,
  writeBatch,
  query,
  getDocs
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDQSpKkV7xCm4VT07GLGN6txcybbPdo0hE",
    authDomain: "crownclothing-db-9d8be.firebaseapp.com",
    projectId: "crownclothing-db-9d8be",
    storageBucket: "crownclothing-db-9d8be.appspot.com",
    messagingSenderId: "889658458767",
    appId: "1:889658458767:web:c239a99a195ab83d6926fa"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({
    prompt: 'select_account'
  })

  export const auth = getAuth()
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider)
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)
  
  export const db = getFirestore()

  export const addCollectionAndDocs = async(collectionKey,objectsToAdd) =>{
  const collectionRef = collection(db,collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object)=> {
    const docRef = doc(collectionRef,object.title.toLowerCase())
    batch.set(docRef,object)
  })
  await batch.commit()
  console.log('done')
}

export const getCategoriesAndDocuments = async() =>{
  const collectionRef = collection(db,'categories')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  
  const categoryMap =  querySnapshot.docs.reduce((acc,docSnapshot)=> {
    const{title, items} = docSnapshot.data()
    acc[title.toLowerCase()] = items;
    return acc;
  },{})
  return categoryMap
}
  export const createUserDocumentFromAuth = async(userAuth,additionalInformation ={}) => {
      
    if(!userAuth) return;
    const userDocRef = doc(db,'users',userAuth.uid)
      console.log(userDocRef)

      const userSnapshot = await getDoc(userDocRef)
      // console.log(userSnapshot)
      // console.log(userSnapshot.exists())

    if(!userSnapshot.exists()){
      const {displayName, email} = userAuth
      const createdAt = new Date()

      try{
        await setDoc(userDocRef,{
          displayName,
          email,
          createdAt,
          ...additionalInformation
        });
      }catch(error){
        console.log('error creating the user', error.message)
      }
    }
    return userDocRef
  }

  export const createAuthUserWithEmailAndPassword = async(email,password) => {
    if(!email || !password) return;
    console.log(email,password)
    return await createUserWithEmailAndPassword(auth,email,password)
  }

  export const signInUserWithEmailAndPassword = async (email,password)=>{
  if(!email || !password) return;
  console.log(email,password)
  return await signInWithEmailAndPassword(auth,email,password)
}
// export const userLogInAuth = async (userAuth,addInfos)=>{
//   const useDocRef = doc(db,'users',userAuth.uid)
//   console.log(useDocRef)
// }

export const signOutUser= async()=> await signOut(auth)

export const onAuthStateChangedListener =(callback)=> 
  onAuthStateChanged(auth,callback)