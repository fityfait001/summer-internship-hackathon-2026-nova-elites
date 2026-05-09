import { create } from 'zustand';
import { auth, db } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  initialize: () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch custom user data from Firestore
        const docRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          set({ user: { uid: firebaseUser.uid, email: firebaseUser.email, ...docSnap.data() }, loading: false });
        } else {
          set({ user: { uid: firebaseUser.uid, email: firebaseUser.email, role: 'patient' }, loading: false });
        }
      } else {
        set({ user: null, loading: false });
      }
    });
  },
  logout: async () => {
    await signOut(auth);
    set({ user: null });
  },
}));
