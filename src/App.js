import './App.css';

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "../src/Store";
import { PersistGate } from "redux-persist/integration/react";

/*Pages*/
import Home from "./View/home";
import NewUser from "./View/login/newUser";
import LostPassword from "./View/login/lostPassword";
import Pacientes from "./View/pacientes";
import Tratamentos from "./View/tratamentos";
import Diagnosticos from "./View/diagnosticos";
import Exames from "./View/exames";
import ArtigoNovo from './View/artigos/artigoNovo';


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <Router>
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Pacientes} />
          <Route exact path="/newuser" component={NewUser} />
          <Route exact path="/lostpassword" component={LostPassword} />

          <Route exact path="/pacientes" component={Pacientes} />
          <Route exact path="/tratamentos" component={Tratamentos} />
          <Route exact path="/diagnosticos" component={Diagnosticos} />
          <Route exact path="/exames" component={Exames} />
          <Route exact path="/artigoNovo" component={ArtigoNovo} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
