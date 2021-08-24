import firebase from "firebase";
import { useState, useEffect } from "react";

import ArtigoDetails from "./artigoDetails";
import "./artigos.css";

function Artigos() {
    const [artigos, setArtigos] = useState([]);
    const [loadMode, setLoadMode] = useState(1);

    const db = firebase.firestore();

    const listaArtigos = [];

    useEffect(() => {
        db.collection('artigos').get().then(async (res) => {
            await res.docs.forEach(doc => {
                listaArtigos.push({
                    id: doc.id,
                    ...doc.data()
                });
                setArtigos(listaArtigos);
                setLoadMode(0);
            })
        })
    }, []);

    return (
        <>
            <div key="artigos" className="artigos align-items-center">
                <div key="artigosContainer" className="container panel-group">
                    {
                        loadMode > 0 ?
                            <h1>Carregando</h1>
                            :
                            artigos.map(item =>
                                <ArtigoDetails key={item.id} id={item.id} tituloArtigo={item.tituloArtigo} introArtigo={item.introArtigo} linkArtigo={item.linkArtigo} artigoImg={item.artigoImg} />
                            )
                    }
                </div>
            </div>
        </>
    );
}

export default Artigos;