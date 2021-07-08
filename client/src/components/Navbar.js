import React from 'react';
import {Link} from "react-router-dom"

function Navbar(props) {
    return (
        <nav className="nav">
            <div className='nav-container'>
                <Link className="links" to="/read">finished</Link>
                <Link className="links" to="/unread">unread</Link>
                <button className="logout-btn" onClick={props.logout}>sign out</button>
            </div>
        </nav>
    );
}

export default Navbar;