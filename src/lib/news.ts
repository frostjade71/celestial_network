import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  serverTimestamp,
  limit
} from 'firebase/firestore';
import { db } from './firebase';
import type { NewsItem } from '../types';

const NEWS_COLLECTION = 'news';

export const addNews = async (news: Omit<NewsItem, 'id' | 'createdAt' | 'updatedAt'>) => {
  return await addDoc(collection(db, NEWS_COLLECTION), {
    ...news,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const updateNews = async (id: string, updates: Partial<NewsItem>) => {
  const newsRef = doc(db, NEWS_COLLECTION, id);
  return await updateDoc(newsRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

export const deleteNews = async (id: string) => {
  const newsRef = doc(db, NEWS_COLLECTION, id);
  return await deleteDoc(newsRef);
};

export const getAllNews = async (onlyPublished = false) => {
  let q = query(collection(db, NEWS_COLLECTION), orderBy('createdAt', 'desc'));
  
  if (onlyPublished) {
    q = query(collection(db, NEWS_COLLECTION), where('isPublished', '==', true), orderBy('createdAt', 'desc'));
  }
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as NewsItem));
};

export const getLatestNews = async () => {
  const q = query(
    collection(db, NEWS_COLLECTION), 
    where('isPublished', '==', true), 
    orderBy('createdAt', 'desc'),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return null;
  const data = querySnapshot.docs[0].data();
  return {
    id: querySnapshot.docs[0].id,
    ...data
  } as NewsItem;
};
