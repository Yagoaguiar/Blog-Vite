import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  QuerySnapshot,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      setLoading(true);

      const collectionREf = await collection(db, docCollection);
      try {
        let q;

        q = await query(collectionREf, orderBy("createAt", "desc"));

        await onSnapshot(q, (snapshot) => {
            setDocuments(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
            );
          });

        //para fazer alteração de dados
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    loadData();
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);
  return documents, loading, error;
};
