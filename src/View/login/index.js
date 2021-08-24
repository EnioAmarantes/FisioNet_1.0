import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import firebase from "../../Config/firebase";
import "firebase/auth";

import "./login.css";
import Logo from "../../Components/images/fisioLogo.png";

function Login() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgType, setMsgType] = useState();
    const dispatch = useDispatch();

    function autenticar() {
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(res => {
                setTimeout(() => {
                    dispatch({ type: 'LOGIN', userEmail: email });
                }, 500)
            })
            .catch(err => {
                setMsgType("erro");
            })
    }

    return (
        <div className="login-content align-items-center justify-content-center d-flex">
            {
                useSelector(state => state.userLoged) > 0 ? <Redirect to="/" /> : null
            }

            <form id="login" className="form-signin text-center">
                <img id="fisioLogo" src={Logo} alt="logo da Fisionet" />
                <h1 id="loginTitle">FisioNet</h1>

                <input onChange={(e) => setEmail(e.target.value)} id="email" className="form-control my-2" type="text" placeholder="Email" />
                <div>
                    <input onChange={(e) => setSenha(e.target.value)} id="password" className="form-control my-2" type="password" placeholder="Senha" />
                    <span class="lnr lnr-eye"></span>
                </div>

                <button id="loginButton" onClick={autenticar} className="btn btn-lg btn-login btn-block my-4" type="button">Logar</button>

                <div className="option-login mt-2">
                    <Link to="lostpassword" className="mx-2">Recuperar Senha</Link>
                    <span>&#9883;</span>
                    <Link to="newuser" className="mx-2">Quero me cadastrar</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;