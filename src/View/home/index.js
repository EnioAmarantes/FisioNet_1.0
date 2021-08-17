import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../Store/userReducer";

import Artigos from "../artigos";
import Login from "../login";
import NewUser from "../login/newUser";
import LostPassword from "../login/lostPassword";

function Home() {
    
    return (
        <>
            <div className="row m-0 p-0">
                <div className="col-8 p-0">
                    <Artigos />
                </div>

                <div className="col-4">
                    <Login />
                </div>
            </div>
        </>
    );
}

export default Home;