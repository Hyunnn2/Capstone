import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc,updateDoc, onSnapshot } from "firebase/firestore";


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
export function uploadMarkerLocation(latitude, longitude, altitude) {
    const docRef = doc(db, "Capston", "map");
    getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const newData = {
          ...data,
          lat: latitude,
          lon: longitude,
          alt: altitude
        };
        return updateDoc(docRef, newData);
      } else {
        return setDoc(docRef, {
          lat: latitude,
          lon: longitude,
          alt: altitude
        });
      }
    })
    .then(function() {
      console.log("location uploaded successfully!");
    })
    .catch(function(error) {
      console.error("Error uploading location: ", error);
    });
}
export function uploadCondition(condition) {
  const docRef = doc(db, "Capston", "map");
  getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const newData = {
          ...data,
          condition: condition
        };
        return updateDoc(docRef, newData);
      } else {
        return setDoc(docRef, {
          condition: condition
        });
      }
    })
    .then(function() {
      console.log("Mission uploaded successfully!");
    })
    .catch(function(error) {
      console.error("Error uploading mission: ", error);
    });
}


export function uploadMission(mission) {
  const docRef = doc(db, "Capston", "drone");
  getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const newData = {
          ...data,
          header: mission
        };
        return updateDoc(docRef, newData);
      } else {
        return setDoc(docRef, {
          header: mission
        });
      }
    })
    .then(function() {
      console.log("Mission uploaded successfully!");
    })
    .catch(function(error) {
      console.error("Error uploading mission: ", error);
    });
}
export function uploadMeter(meter) {
  const docRef = doc(db, "Capston", "drone");
  getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const newData = {
          ...data,
          meter: meter
        };
        return updateDoc(docRef, newData);
      } else {
        return setDoc(docRef, {
          meter: meter
        });
      }
    })
    .then(function() {
      console.log("Meter uploaded successfully!");
    })
    .catch(function(error) {
      console.error("Error uploading meter: ", error);
    });
}
export function uploadDegree(degree) {
  const docRef = doc(db, "Capston", "drone");
  getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const newData = {
          ...data,
          degree: degree
        };
        return updateDoc(docRef, newData);
      } else {
        return setDoc(docRef, {
          degree: degree
        });
      }
    })
    .then(function() {
      console.log("Degree uploaded successfully!");
    })
    .catch(function(error) {
      console.error("Error uploading degree: ", error);
    });
}
export function uploadVelocity(velocity) {
  const docRef = doc(db, "Capston", "drone");
  getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const newData = {
          ...data,
          velocity: velocity
        };
        return updateDoc(docRef, newData);
      } else {
        return setDoc(docRef, {
          velocity: velocity
        });
      }
    })
    .then(function() {
      console.log("Velocity uploaded successfully!");
    })
    .catch(function(error) {
      console.error("Error uploading velocity: ", error);
    });
}
export function uploadManualData(mission, degree, meter, velocity) {
  const docRef = doc(db, "Capston", "drone");

  return getDoc(docRef)
    .then((docSnap) => {
      let dataToUpdate = {};
      if (docSnap.exists()) {
        // 문서가 존재하면 기존 데이터를 가져와서 업데이트할 필드만 수정합니다.
        const currentData = docSnap.data();
        dataToUpdate = {
          ...currentData,
          header: mission,
          degree: degree,
          meter: meter,
          velocity: velocity
        };
      } else {
        // 문서가 없으면 새로운 데이터를 생성합니다.
        dataToUpdate = {
          header: mission,
          degree: degree,
          meter: meter,
          velocity: velocity
        };
      }
      return setDoc(docRef, dataToUpdate);
    })
    .then(function() {
      console.log("Manual data uploaded successfully!");
    })
    .catch(function(error) {
      console.error("Error uploading manual data: ", error);
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


export async function fetchDroneHeader(callback) {
  try {
      const docRef = doc(db, 'Capston', 'drone'); // 'Capstone' 컬렉션 내 'drone' 문서 참조
      // 실시간으로 문서 변경 감지
      onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
              const data = docSnap.data();
              callback(data); // 새로운 데이터를 콜백 함수에 전달
          } else {
              console.error('No such document!');
              callback(null); // 문서가 없는 경우 null 전달
          }
      });
  } catch (error) {
      console.error('Error fetching drone state:', error);
      throw error;
  }
}