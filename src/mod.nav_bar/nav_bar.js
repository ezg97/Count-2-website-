import React from 'react';
import {Link, useLocation, useHistory} from 'react-router-dom';

// import Authorization from '../mod.authorization/authorization';
// Importing Library Fragments
import './nav_bar.css';


function NavBar(props) {
    let history = useHistory();
    let location = useLocation();

    let username = localStorage.getItem('username');
    console.log("username - game menu: ", username);

    const onHomeClick = () => {
        console.log('onHomeClick');
        history.push('/');
    }
    
    const logout = () => {
        console.log('logging out...');
        localStorage.setItem('username', '');
        console.log('username: ' + localStorage.getItem('username'));
        history.push('/');
    }

    return (
        (username)
        ?
        <nav className = 'app_nav'>
            <ul tabindex={0} onClick={(e) => onHomeClick()}>
              {/* <li><p>&#128490;</p></li> */}
              <li><i class="fas fa-chess-board"></i></li>
              <li><h3>Count 2</h3></li>
            </ul>
            {/* <Route exact path={['/','/home']} component={SearchBar} /> */}
            <div className='dropdown' tabindex={0} >
                <div className='img-border'>
                    <p className="profile">{username}</p>
                </div> 
                <div className="dropdown-content" tabindex={2}>
                    <a href="#" onClick={() => onHomeClick()} tabindex={0}>Home</a>
                    {/* <a href="#" tabindex={0}>Settings</a> */}
                    <a onClick={() => logout()}>Logout</a>
                </div>   
            </div>     
        </nav>
        :null
    );
}

export default NavBar;