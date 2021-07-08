import React, {useContext} from 'react';
import AddBookForm from './AddBookForm';
import "../css/popup.css"
import { UserContext } from '../context/UserProvider';

function Popup(props) {
  const {addBook} = useContext(UserContext)
  return (
    <div className="popupBox">
      <div className="box">
        <div className="close-icon-container">
          <button className="closeIcon" onClick={props.handleClose}>x</button>
        </div>
        <AddBookForm 
          btnText={props.btnText} 
          submit={props.submit} 
          handleClose={props.handleClose} 
          finished={props.finished}
          title={props.title}
          imageUrl={props.imageUrl}
          summary={props.summary}
					genre={props.genre}
          _id={props._id}   
        />
      </div>
    </div>
  );
}

export default Popup;