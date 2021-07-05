import React from 'react';

function AuthForm(props) {
    const {
        handleChange, 
        handleSubmit, 
        inputs:{username, password}, 
        btnText,
        errMsg
    } = props
    return (
        <div>
            <form className="authForm" onSubmit={handleSubmit}>
                <input
                    className="userInput" 
                    type="text" 
                    placeholder="username"
                    id="username" 
                    name="username"
                    value={username}
                    onChange={handleChange} 
                />
                <input 
                    className="pwInput"
                    type="password" 
                    placeholder="password" 
                    id="password"
                    name="password" 
                    value={password}
                    onChange={handleChange}
                />
                <button>{btnText}</button>
                <p style={{color: "red", fontSize: "20px"}}>{errMsg}</p>
            </form>
        </div>
    );
}

export default AuthForm;