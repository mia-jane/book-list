import React, {useState, useContext} from 'react';
import AuthForm from "./AuthForm"
import {UserContext} from "../context/UserProvider"
import "../css/authPage.css"

function Auth(props) {
    const initInputs = {username:"", password:""}
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)

    const {signup, login, errMsg, resetAuthErr} = useContext(UserContext)

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
    }

    const handleSignup = (e) => {
        e.preventDefault()
        signup(inputs)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        login(inputs)
    }

    function toggleForm(){
        setToggle(prev => !prev)
        resetAuthErr()
    }


    return (
        <div className="auth">
            <h1>Book List</h1>
            { !toggle ? 
                <>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleSignup}
                        inputs={inputs}
                        btnText="sign up" 
                        errMsg={errMsg}
                    />
                    <p onClick={toggleForm}>already a member?</p>
                </>
                :
                <>
                    <AuthForm 
                        handleChange={handleChange}
                        handleSubmit={handleLogin}
                        inputs={inputs}
                        btnText="login"
                        errMsg={errMsg}
                    />
                    <p onClick={toggleForm}>not a member?</p>
                </>
            }
        </div>
    );
}

export default Auth;