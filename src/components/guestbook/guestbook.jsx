import Header from '../header/header';
import './guestbook.scss'; // For styling
import GuestbookEntries from './guestbookentries';
import GuestBookForm from './guestbookform';
import witch from '../../assets/witch.png'

const Guestbook = () => {
  return (
    <>
    <Header />
    <div className="guestbook-container">
      <div className="guestbook-title">
      <h1 className="blood-spatter">Sweet Nothings</h1>
      <p>Leave a message for others to see!</p>
      </div>
      
      <div className="guestbook-content">
        <GuestBookForm />
        <GuestbookEntries />
      </div>
    </div>
    <img src={witch} />
    </>
  );
};

export default Guestbook;