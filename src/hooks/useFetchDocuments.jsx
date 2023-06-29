import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase/config';

const FetchDocumentsContext = createContext();

export const FetchDocumentsProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    let unsubscribe;

    const loadData = async () => {
      if (cancelled) return;

      setLoading(true);

      try {
        const collectionRef = collection(db, 'posts');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        unsubscribe = onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    };

    loadData();

    return () => {
      setCancelled(true);
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const contextValue = {
    documents,
    loading,
    error,
  };

  return (
    <FetchDocumentsContext.Provider value={contextValue}>
      {children}
    </FetchDocumentsContext.Provider>
  );
};

export const useFetchDocuments = () => {
  return useContext(FetchDocumentsContext);
};
