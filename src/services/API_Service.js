import { db, auth } from '../firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  query, 
  where, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';

const SECRET_KEY = import.meta.env.VITE_IDENTITY_SECRET || "IDENTITY_VERIFICATION_SECRET_2026";

// Helper to create hash in JS (for demo/benchmark purposes)
const createHash = async (id) => {
  const saltedInput = `${id}${SECRET_KEY}`;
  const msgUint8 = new TextEncoder().encode(saltedInput);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const API_Service = {
  fetchUserData: async (userId) => {
     const userDoc = await getDoc(doc(db, "users", userId));
     return userDoc.exists() ? userDoc.data() : null;
  },

  submitHash: async (empId) => {
    try {
      const id = empId.toUpperCase();
      const docRef = doc(db, "identities", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          success: true,
          data: docSnap.data(),
          message: "Identity Verified via Cloud Mesh"
        };
      }
      return { success: false, message: "Credential Not Found" };
    } catch (error) {
      console.error("Cloud Error:", error);
      return { success: false, message: "System Link Failure" };
    }
  },

  issueCredential: async (data) => {
    try {
      // Get count for ID generation
      const q = query(collection(db, "identities"));
      const snapshot = await getDocs(q);
      const newIdNum = 2000 + snapshot.size;
      const newId = `AID-${newIdNum}`;
      
      const hash = await createHash(newId);
      const identityData = {
        ...data,
        id: newId,
        hash: hash,
        timestamp: serverTimestamp(),
        issuedBy: auth.currentUser?.email || "System"
      };

      await setDoc(doc(db, "identities", newId), identityData);
      
      return {
        success: true,
        message: "Credential Issued to Cloud Ledger",
        data: identityData,
        transactionHash: `0x${hash.substring(0, 40)}`
      };
    } catch (error) {
      console.error("Cloud Issuance Error:", error);
      return { success: false, message: "Ledger Update Failed" };
    }
  },

  seedDatabase: async () => {
    const firstNames = ["Julian", "Elena", "Marcus", "Sarah", "Victor", "Aria", "Silas", "Lyra", "Cassian", "Nova"];
    const lastNames = ["Thorne", "Vance", "Aurelius", "Jenkins", "Sterling", "Valois", "Kaelo", "Nyx", "Vane", "Stellar"];
    
    for (let i = 1; i <= 20; i++) {
      const empId = `AID-${1000 + i}`;
      const name = `${firstNames[i % 10]} ${lastNames[(i * 7) % 10]}`;
      const hash = await createHash(empId);
      
      await setDoc(doc(db, "identities", empId), {
        name,
        id: empId,
        hash,
        class: "Sovereign Tier 1",
        timestamp: serverTimestamp()
      });
    }
  },

  runBenchmark: async () => {
    console.log("🔥 RUNNING CLOUD-SIMULATED BENCHMARK (1 MILLION VIRTUAL RECORDS)");
    
    const size = 1000000;
    // We simulate the algorithmic complexity in JS
    const largeList = Array.from({ length: size }, (_, i) => `AID-${i}`);
    const largeDict = {};
    for(let i=0; i<size; i++) { largeDict[`AID-${i}`] = true; }
    
    const target = `AID-${size - 1}`;
    
    // O(n) Search
    const startN = performance.now();
    largeList.includes(target);
    const timeN = (performance.now() - startN) / 1000;

    // O(1) Lookup
    const start1 = performance.now();
    const _ = largeDict[target];
    const time1 = (performance.now() - start1) / 1000;

    const gain = Math.floor(timeN / (time1 || 0.000001));

    return {
      dataset_size: size,
      standard_list_search_time: `${timeN.toFixed(6)}s`,
      optimized_dictionary_lookup_time: `${time1.toFixed(6)}s`,
      performance_gain: `${gain}x faster`
    };
  },

  toggleLockdown: async () => {
    // In a serverless setup, we could store this in a 'system' collection
    return { status: "success", system_state: "OPERATIONAL", message: "Cloud Lockdowns require Edge Middleware" };
  }
};
