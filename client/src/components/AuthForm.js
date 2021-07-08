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
                <div className="input-container">
                <input
                    className="auth-input" 
                    required
                    type="text" 
                    placeholder="username"
                    id="username" 
                    name="username"
                    value={username}
                    onChange={handleChange} 
                    />
                <input 
                    className="auth-input"
                    required
                    type="password" 
                    placeholder="password" 
                    id="password"
                    name="password" 
                    value={password}
                    onChange={handleChange}
                />
                </div>
                <button className="login-btn">{btnText}</button>
                <p className="errMsg" >{errMsg}</p>
            </form>
        </div>
    );
}

export default AuthForm;