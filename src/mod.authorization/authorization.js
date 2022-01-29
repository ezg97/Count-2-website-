import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';

import GameBoard from '../mod.game_board/game_board';
import GameMenu from '../mod.game_menu/game_menu';
import LevelSelection from '../mod.level_selection/level_selection';
import LoginSignup from '../mod.login_signup/login_signup';
import NavBar from '../mod.nav_bar/nav_bar';
// Importing Library Fragments
// import './game_menu.css';


function Authorization(props) {
    let username = localStorage.getItem('username');
    console.log("username - game menu: ", username);

    return (
        (username) 
            ? <>
            {/* Page Views when signed in */}
                <BrowserRouter>
                    {/* Nav bar */}
                    <Route  path={["/","/local","/computer","/play"]} component={NavBar}/>
                    {/* Home Page, Level Select Page (Local and Computer), and Play Page & */}
                    <Switch>
                        <Route exact path={['/local','/computer']} component = {LevelSelection} />
                        <Route exact path={['/play/:type/:id']} component = {GameBoard} />
                        <Route path={['/']} component = {GameMenu} />
                    </Switch>
                </BrowserRouter>
            </>
            : <BrowserRouter>
                <Route path="/" render={() => <LoginSignup></LoginSignup>} />
            </BrowserRouter>

    );
}

export default Authorization;