import { useEffect, useState } from 'react';
import { db} from '../../config/firebase'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
const GuestbookEntries = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'guestbook'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const entriesData = [];
      querySnapshot.forEach((doc) => {
        entriesData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setEntries(entriesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading messages...</p>;

  return (
    <div className="guestbook-entries">
      <h2 className="guestbook-title">Guest Memories</h2>
      
      {entries.length === 0 ? (
        <p>No messages yet. Be the first to sign!</p>
      ) : (
        <ul>
          {entries.map((entry) => (
            <li key={entry.id} className="entry">
              <p className="entry-message">{entry.message}</p>
              <p className="entry-name">- {entry.name}</p>
              <p className="entry-date">
                {entry.createdAt?.toDate().toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GuestbookEntries;
