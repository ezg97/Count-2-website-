import React from 'react';
import {Link, useLocation, useHistory} from 'react-router-dom';

// Importing Library Fragments
import './login_signup.css';

/*

1) Add logout
2) Add Win/Loss counter for all local and computer levels
3) Add names to all levels
4) Add headers
5) Add colors

6) Add error message that appears when error occurs during signup/login
7) maybe add percentage of win ration under each level once you've played it 3 times or something like that (a later addition)
*/


function LoginSignup(props) {
    const history = useHistory();
    const location = useLocation();
    let login = location.pathname.replace('/', '');

    const loginCheck = () => {
        let usernamme_entry = document.getElementById("username").value;
        let password_entry = document.getElementById("password").value;

        console.log("usernamme_entry (LI): " + usernamme_entry);
        console.log("password_entry (LI): " + password_entry);

        // username can't be "username"
        let username = localStorage.getItem(usernamme_entry);
        let password = localStorage.getItem(usernamme_entry + "_|_" + password_entry);

        if (username && password) {
            console.log('username and password have been authorized, logging you in...');
            localStorage.setItem('username', username);

            let login_error = document.getElementById("login_error");
            login_error.innerHTML = "";
            if (!login_error.classList.value.includes("hide")) {
                login_error.classList.toggle('hide');
            }
            // redirect to the homepage
            // history.push('/');
            console.log('reload');
            window.location.reload(); 
        } else {
            console.log('Wrong username or password');
            let login_error = document.getElementById("login_error");
            login_error.innerHTML = "Wrong username or password";
            if (login_error.classList.value.includes("hide")) {
                login_error.classList.toggle('hide');
            }

            //show error message
        }
        console.log('error message: ' + document.getElementById("login_error").innerHTML);
        return 0;
    }

    const signupCheck = () => {
        let usernamme_entry = document.getElementById("username").value;
        let password_entry = document.getElementById("password").value;

        console.log("usernamme_entry (SU): " + usernamme_entry);
        console.log("password_entry (SU): " + password_entry);
        // Only special chars allowed: Spaces and underlines
        let format = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
        console.log('');
        if (format.test(usernamme_entry) || format.test(password_entry)) {
            console.log('username and password must only contain alphabet, numbers, spaces and underlines');
            let signup_error = document.getElementById("signup_error");
            signup_error.innerHTML = "Invalid character(s): username and password must only contain alphabet, numbers, spaces and underlines";
            if (signup_error.classList.value.includes("hide")) {
                signup_error.classList.toggle('hide');
            }
            // show error message why (username and password must only contain alphabet, numbers, spaces and underlines)
            return 0;
        } else if (usernamme_entry.length < 3 || usernamme_entry.length > 12) {

            console.log('username must be between 3 and 12 chars');
            let signup_error = document.getElementById("signup_error");
            signup_error.innerHTML = "Invalid Username Length: the username must be between 3 and 12 characters";
            if (signup_error.classList.value.includes("hide")) {
                signup_error.classList.toggle('hide');
            }
            // show error message why (username must be between 3 and 12 chars)
            return 0;
        } else if (password_entry.length < 5 || password_entry.length > 25) {
            console.log('password must be between 5 and 25 chars');
            let signup_error = document.getElementById("signup_error");
            signup_error.innerHTML = "Invalid Password Length: password must be between 5 and 25 characters";
            if (signup_error.classList.value.includes("hide")) {
                signup_error.classList.toggle('hide');
            }

            // show error message why (password must be between 5 and 25 chars)
            return 0;
        } else {
            let username = localStorage.getItem(usernamme_entry);
            // let password = localStorage.getItem(usernamme_entry + "_|_" + password_entry);
            
            if (username) {
                console.log('username already exists');
                let signup_error = document.getElementById("signup_error");
                signup_error.innerHTML = "Invalid Username: this username has already been taken";
                if (signup_error.classList.value.includes("hide")) {
                    signup_error.classList.toggle('hide');
                }

                // show error message that username already exists (technically we can only check if it has existed in ths browser session)
                return 0;
            } else {
                let signup_error = document.getElementById("signup_error");
                signup_error.innerHTML = "";
                if (!signup_error.classList.value.includes("hide")) {
                    signup_error.classList.toggle('hide');
                }
                console.log('new username: ' + usernamme_entry);
                console.log('new password: ' + password_entry);
                console.log('storing new account information, logging you in...');

                localStorage.setItem(usernamme_entry, usernamme_entry);
                localStorage.setItem(usernamme_entry + "_|_" + password_entry, 1);
                localStorage.setItem('username', usernamme_entry);

                // redirect to the homepage
                // console.log('reload');
                console.log('reload');
                window.location.reload();            
            }
        }
        return 0;
    }

    const passwordView = (e) => {
        e.preventDefault();
        console.log('password view running');

        let hide_password = document.getElementById('hide_password');
        let show_password = document.getElementById('show_password');

        hide_password.classList.toggle("hide");
        show_password.classList.toggle("hide");
        
        if (hide_password.classList.value.includes('hide')) {
            document.getElementById("password").type = "password";
        } else {
            document.getElementById("password").type = "text";
        }

        return true;
    }

 

    return (
         /* if username is undefined send to login / signup page */
         /* if username is defined send to level menu */

         (login === "login") 
            ? <>
                <div className="menu_parent">
                    <h1>Login</h1>
                    <section className="login_section ">
                        <form class="form">
                            <input type="text" id="username" class="input_field"/>
                            <div>
                                <input type="password" id="password" class="input_field"/>             
                                <button class="password_view" onClick={(e) => passwordView(e)}><i id="hide_password" class="far fa-eye-slash hide"></i><i id="show_password" class="far fa-eye"></i></button>
                            </div>
                        </form>

                        <button id='login' class="login_button" onClick={(e) => loginCheck()}>Login</button>
                        <Link to="/signup" class="login_link">Don't have an account? Sign Up</Link>
                    </section>
                    <p id="login_error" class={"hide"}></p>
                </div>
            </>
            : <>
                <div className="menu_parent">
                    <h1>Sign Up</h1>
                        <section className="login_section ">
                            <form class="form">
                                <input type="text" id="username" class="input_field"/>     
                                <div>
                                    <input type="password" id="password" class="input_field"/>             
                                    <button class="password_view" onClick={(e) => passwordView(e)}><i id="hide_password" class="far fa-eye-slash hide"></i><i id="show_password" class="far fa-eye"></i></button>
                                </div>
                            </form>

                        <button id='signup' class="login_button" onClick={(e) => signupCheck()}>Sign Up</button>
                        <Link to="/login" class="login_link">Already have an account? Log In</Link>
                    </section>
                    <p id="signup_error" class={"hide"}></p>
                </div>

            </>
    );
}

export default LoginSignup;