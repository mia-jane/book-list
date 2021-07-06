import React, {useContext} from 'react';
import AddBookForm from './AddBookForm';
import "../css/popup.css"
import { UserContext } from '../context/UserProvider';

function Popup(props) {
  const {addBook} = useContext(UserContext)
  return (
    <div className="popupBox">
      <div className="box">
        <span className="closeIcon" onClick={props.handleClose}>x</span>
        <AddBookForm 
          btnText="add" 
          submit={props.submit} 
          handleClose={props.handleClose} 
          finished={props.finished} />
      </div>
    </div>
  );
}

export default Popup;