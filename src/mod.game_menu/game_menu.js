import React from 'react';
import {Link} from 'react-router-dom';

import Authorization from '../mod.authorization/authorization';
// Importing Library Fragments
import './game_menu.css';




function GameMenu(props) {
    let username = localStorage.getItem('username');
    console.log("username - game menu: ", username);

    return (
        (username) 
            ? <>
                <div className="menu_parent">
                    <section className="">
                        <section className='btns'>
                            <Link to={
                                {
                                    pathname: "/local",
                                    to_win: 21,
                                    type: "local"
                                }
                            }>
                                <button className="btn local">Play Local 1v1</button>
                            </Link>
                                
                            <Link to={
                                {
                                    pathname: "/computer",
                                    to_win: 21,
                                    type: "computer"
                                }
                            }>
                                <button className="btn local">Play Computer</button>
                            </Link>
                        </section>
                    </section>
                </div>
            </>
            : <Authorization></Authorization>
        
    );
}

export default GameMenu;