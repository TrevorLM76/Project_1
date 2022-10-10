import { useNavigate } from "react-router-dom";

export const Home = ({toggleLoggedIn}) => {
    const navigate = useNavigate();

    return (<>
        <div className="welcome">Welcome to Warehouse Warden</div>
        <div className="welcome2">To get started, please log in</div>
        <div className="loginInputs">
            <input id="username" placeholder="username"></input>
            <br/>
            <input id="password" type="password" placeholder="password"></input>
        </div>
        <br/>
        <div style={{textAlign: "center"}}>
            <button
                onClick={() => {
                    let userInput = document.getElementById("username");
                    let passInput = document.getElementById("password");
                    if (userInput.value === "admin" && passInput.value === "passwordFP1") {
                        toggleLoggedIn(true);
                        navigate('/about');
                    }
                }}
            >submit</button>
        </div>
    </>);
};