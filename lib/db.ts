import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { db } from './firebase';

// User profiles
export const createUserProfile = async (userId: string, userData: any) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    console.error('Error creating user profile:', error);
    return { success: false, error };
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { success: true, data: userSnap.data() };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    return { success: false, error };
  }
};

// Projects/Portfolio items
export const createProject = async (projectData: any) => {
  try {
    const projectsRef = collection(db, 'projects');
    const docRef = await addDoc(projectsRef, {
      ...projectData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating project:', error);
    return { success: false, error };
  }
};

export const getProjects = async (userId?: string) => {
  try {
    const projectsRef = collection(db, 'projects');
    let q = query(projectsRef, orderBy('createdAt', 'desc'));
    
    if (userId) {
      q = query(projectsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
    }
    
    const querySnapshot = await getDocs(q);
    const projects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { success: true, data: projects };
  } catch (error) {
    console.error('Error getting projects:', error);
    return { success: false, error };
  }
};

// Contact messages
export const createContactMessage = async (messageData: any) => {
  try {
    const messagesRef = collection(db, 'contacts');
    const docRef = await addDoc(messagesRef, {
      ...messageData,
      createdAt: new Date(),
      status: 'new'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating contact message:', error);
    return { success: false, error };
  }
};

// Blog posts (jika ada)
export const createBlogPost = async (postData: any) => {
  try {
    const postsRef = collection(db, 'posts');
    const docRef = await addDoc(postsRef, {
      ...postData,
      createdAt: new Date(),
      updatedAt: new Date(),
      published: false
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating blog post:', error);
    return { success: false, error };
  }
};

export const getBlogPosts = async (published: boolean = true) => {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(
      postsRef, 
      where('published', '==', published), 
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { success: true, data: posts };
  } catch (error) {
    console.error('Error getting blog posts:', error);
    return { success: false, error };
  }
};
