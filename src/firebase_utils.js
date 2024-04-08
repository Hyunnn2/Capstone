import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore";

// Firebase 설정 및 초기화
const firebaseConfig = {
    apiKey: "AIzaSyBH5PzCv5ngtp0shvyH-xZ8xyOdZ8aSXFA",
    authDomain: "capdrone-55616.firebaseapp.com",
    projectId: "capdrone-55616",
    storageBucket: "capdrone-55616.appspot.com",
    messagingSenderId: "1019199984726",
    appId: "1:1019199984726:web:3749839ab27ed4d0be17f7",
    measurementId: "G-WZ9RNCFPRM"
  };
 // Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore 참조 가져오기
const db = getFirestore(app);
  
  // 클릭한 위치를 Firebase에 업로드하는 함수
export function uploadMarkerLocation(latitude, longitude) {
    const docRef = doc(db, "Capston", "map");
    setDoc(docRef, {
        lat: latitude,
        lon: longitude
    })
    .then(function() {
      console.log("Marker location uploaded successfully!");
    })
    .catch(function(error) {
      console.error("Error uploading marker location: ", error);
    });
  }

export async function fetchDroneState() {
    try {
        const docRef = doc(db, 'Capston', 'state'); // 'Capstone' 컬렉션 내 'state' 문서 참조
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data(); // 문서 내용 반환
        } else {
            console.error('No such document!');
            return null;
        }
    } catch (error) {
        console.error('Error fetching drone state:', error);
        throw error;
    }
}

