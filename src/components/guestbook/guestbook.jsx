import Header from '../header/header';
import './guestbook.scss'; // For styling
import GuestbookEntries from './guestbookentries';
import GuestBookForm from './guestbookform';
import witch from '../../assets/witch.png'
import Loader from '../loader/Loader';

const Guestbook = () => {
  return (
    <>
    <Loader>
    <Header />
    <div className="guestbook-container">
      {/* <div className="guestbook-title">
      <h1>Sweet Nothings</h1>
      <p>Leave a message for others to see!</p>
      </div> */}
      
      <div className="guestbook-content">
        <GuestBookForm />
        <GuestbookEntries />
        <img src={witch} />
      </div>
    </div>
    </Loader>
    </>
  );
};

export default Guestbook;