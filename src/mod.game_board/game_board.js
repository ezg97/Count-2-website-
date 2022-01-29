import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

import GameBox from '../mod.game_box/game_box';
import ComputerGameBox from '../mod.computer_game_box/computer_game_box';

import './game_board.css';

// store the users position in local storage incase of refresh (maybe)
// once level is completed (win or loss), send data to db.

function GameBoard(props) {
    let username = localStorage.getItem('username');
    const location = useLocation();
    let type = props.match.params.type;
    const win_num = Number(props.match.params.id);
    if (type) {
        localStorage.setItem('type', type.replace('/',''));
        type = type.replace('/','');
    } else {
        type = localStorage.getItem('type');
    }

    // console.log('win num', win_num);
    // console.log('type (ls): ' + localStorage.getItem('type'));
    // console.log('type: ' + type);

    // make the height of the board 80 or 90 percent of the screen

    // let boxes = [...Array(21).keys()];
    // let player_one = -1;
    // let player_two = -1;
    const [gameOver, setGameOver] = useState(false);
    const [player_one, setPlayerOne] = useState(
        {
            'position': -1,
            'class': "player_one",
            'class_selected': 'p1_selected',
            'turn': true,
            'type': 'local',
            'name': username
        }
    );

    const [player_two, setPlayerTwo] = useState(
        {
            'position': -1,
            'class': "player_two",
            'class_selected': 'p2_selected',
            'turn': false,
            'type': type,
            'name': type === 'computer' ? 'Computer' : 'Player Two'

        }
    );

    window.onscroll = function (e) {  
      // called when the window is scrolled.
        // console.log("scrolling");
        // console.log(e);
        // console.log('scrolling: ',   document.getElementsByClassName('board').onscroll);
    } 
      
    document.getElementsByClassName('board').onscroll = function(e) {
        // console.log('div scroll');
    }

    const startOver = (start_over) => {
        console.log('start over: ', typeof start_over)
        if (start_over === true) {
            setPlayerOne({
                'position': -1,
                'class': "player_one",
                'class_selected': 'p1_selected',
                'turn': true,
                'type': 'local',
                'name': username
            });
            setPlayerTwo({
                'position': -1,
                'class': "player_two",
                'class_selected': 'p2_selected',
                'turn': false,
                'type': type,
                'name': type === 'computer' ? 'Computer' : 'Player Two'
            });
            location.start_over = false;
            setGameOver(false);
        }
        return;
    }

    const boxSelect = (new_spot) => {
        // console.log('test', new_spot);
        // console.log('player one turn? ' + player_one.turn);
        let players_turn = "";
        // Update player one's position and turn. Also, update player two's turn
        if (player_one.turn === true) {
            players_turn = "p1";
            updateInfo(new_spot, setPlayerOne, setPlayerTwo, player_one, player_two);
        }
        // Update player two's position and turn. Also, update player one's turn
        else {
            players_turn = "p2";
            updateInfo(new_spot ,setPlayerTwo, setPlayerOne, player_two, player_one);
        }
       
        // console.log('player one', {player_one});
        // console.log('player two', {player_two});
        // console.log('search');
        // console.log('new_spot: ' + new_spot);
        // console.log('type of win_num', typeof win_num);
        if (win_num === (new_spot + 1)) {
            localStorage.setItem('winner', players_turn);
            // console.log('turn after win -> '+ players_turn+': ', players_turn === "p1");
            // console.log('game over!! ' + type+"_"+win_num+"_"+( players_turn === "p1" ? player_one.name : player_two.name));
            // if player_one.turn equals true then they won because it was just their turn, we switched the turns in the above conditional statements above, but for some reason the changes haven't gone into effect yet
            let level_id = type+"_"+win_num+"_"+(players_turn === "p1" ? player_one.name : (username+"_"+player_two.name));
            let win_count = localStorage.getItem(level_id);
            console.log(level_id);
            // console.log('win_count: ', win_count);
            // console.log('one', player_one.position);
            // console.log('two', player_two.position);

            if (win_count) {
                win_count = parseInt(win_count);
                localStorage.setItem(level_id, win_count+1);
            } else {
                localStorage.setItem(type+"_"+win_num+"_"+(players_turn === "p1" ? player_one.name : (username+"_"+player_two.name)), 1);
            }
            console.log('new win_count: ', localStorage.getItem(level_id));
            startOver(true);
            setGameOver(true);
        }
  
    };

    const updateInfo = (new_spot, updateCurrent, updateOther, currPlayer, otherPlayer) => {
        updateCurrent({
            'position': parseInt(new_spot),
            'class': currPlayer.class,
            'class_selected': currPlayer.class_selected,
            'turn': false,
            'type': (currPlayer.class === 'player_two' 
            ?  type === 'computer' 
                ? 'Computer' 
                : 'Player Two'
            : 'local'),
            'name': currPlayer.name,
        });
        updateOther({
            'position': parseInt(otherPlayer.position),
            'class': otherPlayer.class,
            'class_selected': otherPlayer.class_selected,
            'turn': true,
            'type': (otherPlayer.class === 'player_two' 
            ?  type === 'computer' 
                ? 'Computer' 
                : 'Player Two'
            : 'local'),
            'name': otherPlayer.name,
        });
    }

    const sizeToggle = () => {
        console.log('wide', document.getElementById("wide").classList);
        console.log('narrow', document.getElementById("narrow").classList);

        console.log('is wide disabled? ', document.getElementById("wide").classList[0]);
        if (document.getElementById("wide").classList[0] === 'hide') {
            console.log('make smaller');
            document.getElementById("b_b").style.maxWidth = "700px";
        } else {
            console.log('make bigger');
            document.getElementById("b_b").style.maxWidth = "100%";
        }

        document.getElementById("wide").classList.toggle('hide');
        document.getElementById("narrow").classList.toggle('hide');
        return;
    }

    startOver(location.start_over);
  
    // console.log(boxes);
    return (
      <>
      {/* {console.log('player one', {player_one})}
        {console.log('player two 22', {player_two})} */}
        {/* console.log('win_num: ', win_num)}
        {console.log('type: ', type)} */}

        <span className="b_b" id="b_b">
            <div className={gameOver === true ? 'game_over' : 'game_over hide'}>
            
               {/* {console.log(" player_two.name",  player_two.name)}
                {console.log(" player_one.position",  player_one.position)}
                {console.log('p1 === 8', player_one.position === 8)} */}
                <h2>{(localStorage.getItem('winner')) === 'p1' ? player_one.name : player_two.name} Wins</h2>

                <div className='game_over_btns'>
                    <Link to={
                        { 
                            pathname: "/play/"+(props.match.params.type + "/" + props.match.params.id),
                            start_over: true
                        }}>
                            <button className = 'game_over_btn'>Play Again</button>
                    </Link>
                    <Link to="/"><button className = 'game_over_btn'>Go Home</button></Link>
                </div>
            </div>

            <dv className={gameOver === true ? "hide" : "game_board_info"}>
                <h2>Count to {win_num}</h2>
                <div>
                    <button id="wide" className="hide" onClick={(e) => sizeToggle()}><strong>&#9645;</strong></button>
                    <button id="narrow" className="" onClick={(e) => sizeToggle()}><strong>&#9633;</strong></button>
                </div>
            </dv>

            <div 
                className={gameOver === true ? "board hide" : "board"} 
                onmouseover="this.style.overflow='scroll'" 
                onmouseout="this.style.overflow='hidden'"
            >
            {player_one.turn === true
                ?
                    <GameBox 
                        position = {player_one.position} 
                        class = {player_one.class} 
                        position2 = {player_two.position} 
                        class2 = {player_two.class} 
                        class_selected = {player_one.class_selected}
                        over = {gameOver}
                        boxSelect = {boxSelect}
                        to_win = {win_num}>
                    </GameBox>
                : (type === 'local')
                    ?
                        <GameBox 
                            position = {player_two.position} 
                            class = {player_two.class} 
                            position2 = {player_one.position} 
                            class2 = {player_one.class} 
                            class_selected = {player_two.class_selected}
                            over = {gameOver}
                            boxSelect = {boxSelect}
                            to_win = {win_num}>
                        </GameBox>
                    : 
                        <ComputerGameBox 
                            position = {player_two.position} 
                            class = {player_two.class} 
                            position2 = {player_one.position} 
                            class2 = {player_one.class} 
                            class_selected = {player_two.class_selected}
                            over = {gameOver}
                            boxSelect = {boxSelect}
                            to_win = {win_num}>
                        </ComputerGameBox>
            }
            {//(current === "player_one")
                // ? boxes.map((ar,i) => 
                //   (player_one === i)
                //     ? <div className="box player_one">{i+1}</div>
                //     : (player_two === i)
                //       ? <div className="box player_two">{i+1}</div>
                //       : (i > player_one && i <= player_one+2)
                //         ? <div className="box p1_selected">{i+1}</div>
                //         :<div className="box">{i+1}</div>)
                // : boxes.map((ar,i) => 
                //   (player_one === i)
                //     ? <div className="box player_one">{i+1}</div>
                //     : (player_two === i)
                //       ? <div className="box player_two">{i+1}</div>
                //       : (i > player_two && i <= player_two + 2)
                //         ? <div className="box p2_selected">{i+1}</div>
                //         :<div className="box">{i+1}</div>)
                }
            </div>

            <div className={gameOver === true ? "hide" : "bottom_score_data"}>
                <span>{username} wins: {localStorage.getItem(type+"_"+win_num+"_"+username) === null ? '0' : localStorage.getItem(type+"_"+win_num+"_"+username)}</span>
                {console.log('win_id: '+ type+"_"+win_num+"_"+username)}
                {console.log("Other Entites Name: "  + type+"_"+win_num+"_"+username+"_"+player_two.name)}
                <span>{player_two.name} wins: {localStorage.getItem(type+"_"+win_num+"_"+username+"_"+player_two.name) === null ? '0' : localStorage.getItem(type+"_"+win_num+"_"+username+"_"+player_two.name)}</span>
            </div>
        </span>
      </>
    );
  }
  
  export default GameBoard;