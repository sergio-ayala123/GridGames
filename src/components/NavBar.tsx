import "bootswatch/dist/vapor/bootstrap.min.css";
import { Link } from "react-router-dom";
import ReactDom from "react-dom"
const NavBar = () => {
    return (

        <>
        {ReactDom.createPortal(

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/GridGames">
                        Home
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        </button>
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto">

                            <li className="nav-item">
                                <Link className="nav-link" to="/GameOfLIfe">
                                    Game Of Life
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/BFS">
                                    Breadth First Search
                                </Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/Form">
                                    Form
                                </Link>
                            </li> */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/AStar">
                                    A Star
                                </Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>, document.getElementById("nav-bar")!)}
        </>
    );
}

export default NavBar;