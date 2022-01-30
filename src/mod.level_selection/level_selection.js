import React from 'react';
import {Link, useLocation} from 'react-router-dom';

// Importing Library Fragments
import './level_selection.css';


function LevelSelection(props) {
    let username = localStorage.getItem('username');
    const location = useLocation();

    let max_moves = [3,4,5];
    let section_one = [3,5];
    let section_two = [5,8];
    let section_three = [8,9];
    // (moves * quantifier) + 1

    // (max moves + x) + 1 = win number
    // example:
    // (3 * 0) + 1 = 1
    // (3 * 1) + 1 = 4
    // (3 * 2) + 1 = 7
    // (3 * 3) + 1 = 10
    // (3 * 4) + 1 = 13
    // (3 * 5) + 1 = 16

    // (4 * 0) + 1 = 1
    // (4 * 1) + 1 = 5
    // (4 * 2) + 1 = 9
    // (4 * 3) + 1 = 13
    // (4 * 4) + 1 = 17
    // (4 * 5) + 1 = 21
    // (4 * 6) + 1 = 25
    // (4 * 7) + 1 = 29
    // (4 * 8) + 1 = 33
    // (4 * 9) + 1 = 37
    // (4 * 10) + 1 = 41
    // (4 * 11) + 1 = 45

    // (5 * 0) + 1 = 1
    // (5 * 1) + 1 = 6
    // (5 * 2) + 1 = 11
    // (5 * 3) + 1 = 16
    // (5 * 4) + 1 = 21
    // (5 * 5) + 1 = 26
    // (5 * 6) + 1 = 31
    // (5 * 7) + 1 = 36
    // (5 * 8) + 1 = 41
    // (5 * 9) + 1 = 46
    // (5 * 10) + 1 = 51
    // (5 * 11) + 1 = 56


    // Get the win count for user and win count for other entity (computer or player two) depending on the url path, then combine both totals, then
    // win_percentage = my_wins / total_number_of_games 
    // win_percentage = win_percentage * 100
    // display: win_percentage

    //total game attempts (user wins + other entity wins)
    // ((localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username) + localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+(props.location.pathname.replace('/','') === "computer" ? 'Computer' : 'Player Two') )) / localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username)) * 100
    // my wins
    // localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username)
    
    // multiply by 100
    return (
        <>
            <div className="menu_parent">
                <section className="">
                    <section className='btns'>
                        {
                            max_moves.map((move, i) => 
                                (i === 0)
                                ?                            
                                section_one.map((quantifier, k) =>
                                    <span className="level_selection_box">
                                        <Link to={
                                            {
                                                pathname: "/play"+props.location.pathname+"/"+((move * quantifier) + 1),
                                                to_win: (move * quantifier) + 1,
                                                type: location.pathname
                                            }
                                        }>
                                                <button className="btn local">Level {i + k + 1}</button>
                                        </Link>
                                        {/* {console.log('my wins ' + 
                                        (localStorage.getItem(
                                            (props.location.pathname.replace('/',''))
                                            +"_"+
                                            ((move * quantifier) + 1)
                                            +"_"+
                                            username)
                                        ))} */}
                                    
                                        {/* {console.log('other player  ' + 
                                            (props.location.pathname.replace('/','') === "computer" ? (username+"_"+"Computer") : (username+"_"+"Player Two"))) }
                                        {console.log('path  ' + props.location.pathname.replace('/','')) }

                                        {console.log('path: ' + props.location.pathname.replace('/',''))}
                                        {console.log('win num: ' + ((move * quantifier) + 1))}
                                        {console.log('player 2: ' + (username+"_"+"Player Two"))}

                                        {console.log('other player wins  ' + 
                                            (localStorage.getItem((props.location.pathname.replace('/',''))
                                            +"_"+ ((move * quantifier) + 1) +"_"+
                                            (props.location.pathname.replace('/','') === "computer" 
                                                ? (username+"_"+"Computer") 
                                                : (username+"_"+"Player Two")) 
                                            )))} */}

                                        {Math.round(( Number(localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username))  /  (Number((localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username))) + Number(localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username+"_"+(props.location.pathname.replace('/','') === "computer" ? 'Computer' : 'Player Two') ))))  * 100)
                                            ? <span>Win Ratio: {Math.round(( Number(localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username))  /  (Number((localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username))) + Number(localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username+"_"+(props.location.pathname.replace('/','') === "computer" ? 'Computer' : 'Player Two') ))))  * 100)}%</span>
                                            : <span style={{color: 'transparent'}}>Win Ratio: {Math.round(( Number(localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username))  /  (Number((localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username))) + Number(localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username+"_"+(props.location.pathname.replace('/','') === "computer" ? 'Computer' : 'Player Two') ))))  * 100)}%</span>
                                        }                 
                                    </span>
                                ) 
                                : (i === 1)
                                ? section_two.map((quantifier, k) =>
                                    <span className="level_selection_box">

                                        <Link to={
                                            {
                                                pathname: "/play"+props.location.pathname+"/"+((move * quantifier) + 1),
                                                to_win: (move * quantifier) + 1,
                                                type: location.pathname
                                            }
                                        }>
                                            <button className="btn local">Level {i + k + 2}</button>
                                        </Link>
                                        {Math.round(( Number(localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username))  /  (Number((localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username))) + Number(localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username+"_"+(props.location.pathname.replace('/','') === "computer" ? 'Computer' : 'Player Two') ))))  * 100)
                                            ? <span>Win Ratio: {Math.round(( Number(localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username))  /  (Number((localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username))) + Number(localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username+"_"+(props.location.pathname.replace('/','') === "computer" ? 'Computer' : 'Player Two') ))))  * 100)}%</span>
                                            : <span style={{color: 'transparent'}}>Win Ratio: {Math.round(( Number(localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username))  /  (Number((localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username))) + Number(localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username+"_"+(props.location.pathname.replace('/','') === "computer" ? 'Computer' : 'Player Two') ))))  * 100)}%</span>
                                        }                                   
                                    </span>
                                ) 
                                : (i === 2)
                                ? section_three.map((quantifier, k) =>
                                    <span className="level_selection_box">
                                        <Link to={
                                            {
                                                pathname: "/play"+props.location.pathname+"/"+((move * quantifier) + 1),
                                                to_win: (move * quantifier) + 1,
                                                type: location.pathname
                                            }
                                        }>
                                            <button className="btn local">Level {i + k + 3}</button>
                                        </Link>
                                        {Math.round(( Number(localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username))  /  (Number((localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username))) + Number(localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username+"_"+(props.location.pathname.replace('/','') === "computer" ? 'Computer' : 'Player Two') ))))  * 100)
                                            ? <span>Win Ratio: {Math.round(( Number(localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username))  /  (Number((localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username))) + Number(localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username+"_"+(props.location.pathname.replace('/','') === "computer" ? 'Computer' : 'Player Two') ))))  * 100)}%</span>
                                            : <span style={{color: 'transparent'}}>Win Ratio: {Math.round(( Number(localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username))  /  (Number((localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username))) + Number(localStorage.getItem((props.location.pathname.replace('/',''))+"_"+((move * quantifier) + 1)+"_"+username+"_"+(props.location.pathname.replace('/','') === "computer" ? 'Computer' : 'Player Two') ))))  * 100)}%</span>
                                        }
                                    </span>
                                ) 
                                : null
                            )
                            
                        }
                    </section>
                </section>
            </div>
        </>
    );
}

export default LevelSelection;