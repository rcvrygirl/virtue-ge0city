import { useState, useEffect } from "react";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import HallOfFameEntry from "./HallOfFameEntry";

export default function HallOfFame() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "hallOfFame"),
      orderBy("votes", "desc"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const entriesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEntries(entriesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="hall-of-fame-container">
      <h1>🌟 Community Hall of Fame</h1>
      {loading ? (
        <p>Loading top submissions...</p>
      ) : (
        <div className="entries-grid">
          {entries.map(entry => (
            <HallOfFameEntry key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}