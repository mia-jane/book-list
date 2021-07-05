import React, {useState} from "react"
import {authClient} from "../utils/api"
import axios from "axios"

const UserContext = React.createContext()

function UserProvider(props){
    const initState = { 
        user: JSON.parse(localStorage.getItem("user")) || {}, 
        token: localStorage.getItem("token") || "", 
        books: [],
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)

    const signup = (credentials) => {
        axios.post("/auth/signup", credentials)
            .then(res => {
                const {user, token} = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                //use ({}) below so that knows returning an object
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))

    }

    const login = (credentials) => {
        axios.post("/auth/login", credentials)
            .then(res => {
                const {user, token} = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: "",
            books:[]
        })
    }

    const handleAuthErr = (errMsg) => {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function resetAuthErr(){
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))
    }


// Object.keys makes object key value pairs into array 

    const queryObjectToString = (query) => {
        let output = ""
        Object.keys(query).forEach((key, i, arr) => {
            const separator = i === arr.length -1 ? "" : "&"
            output += `${key}=${query[key]}${separator}`
        })
        return output
    }

    const getBooks = (query) => {
        const url = `/api/books?${queryObjectToString(query)}`
        authClient.get(url)
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    books: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
            return url
    }

    const addBook = (newBook) => {
        authClient.post("/api/books", newBook)
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                books: [...prevState.books, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const deleteBook = (bookId) => {
        authClient.delete(`/api/books/${bookId}` )
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                books: prevState.books.filter(book => book._id !== bookId)
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const editBook = (updatedBook, bookId) => {
        return authClient.put(`/api/books/${bookId}`, updatedBook)
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    books: prevState.books.map(book => book._id !== bookId ? book : res.data)
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }


    const filters = {
        get unreadBooks(){ return userState.books.filter(b => !b.finished)},
        get readBooks(){ return userState.books.filter(b => b.finished)},
    }

    return(
        <UserContext.Provider
            value={{
                ...userState,
                filters,
                signup,
                login,
                logout,
                deleteBook,
                editBook,
                resetAuthErr,
                getBooks,
                addBook
            }}>
            {props.children}
        </UserContext.Provider>
            
    )
}

export {UserProvider, UserContext}