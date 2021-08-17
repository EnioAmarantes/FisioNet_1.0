import React, {useState} from "react";
import firebase from "../../Config/firebase";

import "firebase/auth";

function LostPassword() {

    const [email, setEmail] = useState();
    const [msg, setMsg] = useState();

    function recuperarSenha(){
        firebase.auth().sendPasswordResetEmail(email)
        .then(result => {
            setMsg("Um email para redefinir sua senha foi enviado em sua caixa de entrada.");
        }
        ).catch(err => {
            setMsg("Por favor insira um email válido");
        })
    }

    return (
        <>
            <form className="text-center form-login mx-auto mt-5">
                <h3 className="mb-3 font-weight-bold">Recuperação de Senha</h3>
                <input onChange={e => setEmail(e.target.value)} className="form-control my-2 mb-3" type="email" placeholder="E-mail" />

                <div className="msg my-8 mb-3">
                    <span>{msg}</span>
                </div>

                <button onClick={recuperarSenha} type="button" className="btn btn-lg btn-block btn-enviar">Recuperar Senha</button>
            </form>
        </>
    );
}

export default LostPassword;