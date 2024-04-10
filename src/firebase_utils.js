import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore";


// Firebase 설정 및 초기화
const firebaseConfig = {
    apiKey: "AIzaSyDR6lP5eD5ulw0_agUm0qeDoC0s6Q_8FHU",
    authDomain: "test-82765.firebaseapp.com",
    projectId: "test-82765",
    storageBucket: "test-82765.appspot.com",
    messagingSenderId: "72107612732",
    appId: "1:72107612732:web:9b272fa31467ff81ad8139",
    measurementId: "G-5Z3KZLCF45"
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
        console.log("123", docRef)
        const docSnap = await getDoc(docRef);
        console.log("1", docSnap)
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

