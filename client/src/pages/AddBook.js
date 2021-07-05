import React, { useContext } from 'react';
import AddBookForm from "../components/AddBookForm"
import {UserContext} from "../context/UserProvider"

function AddBook(props) {
    const {addBook} = useContext(UserContext)

    return (
        <div>
            <AddBookForm submit={addBook} finished btnText="add" />
        </div>
    );
}

export default AddBook;