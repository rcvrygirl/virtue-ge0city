import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../auth/AuthContext";

export default function HallOfFameEntry({ entry }) {
  const { currentUser } = useAuth();

  const handleVote = async () => {
    // Create a session ID if none exists
    if (!localStorage.getItem('userSessionId')) {
      localStorage.setItem('userSessionId', crypto.randomUUID());
    }
    
    const sessionId = localStorage.getItem('userSessionId');
    
    // Check if already voted
    if (entry.votedBy?.[sessionId]) {
      alert("You've already voted for this!");
      return;
    }
  
    try {
      const entryRef = doc(db, "hallOfFame", entry.id);
      await updateDoc(entryRef, {
        votes: increment(1),
        [`votedBy.${sessionId}`]: true
      });
    } catch (error) {
      console.error("Voting failed:", error);
    }
  };

  return (
    <div className="hall-entry">
      <p className="phrase">"{entry.phrase}"</p>
      <div className="entry-meta">
        <span>Submitted by {entry.submittedBy}</span>
        <button 
          onClick={handleVote}
          disabled={entry.votedBy?.[currentUser?.uid]}
          className="vote-btn"
        >
          ▲ {entry.votes || 0}
        </button>
      </div>
    </div>
  );
}