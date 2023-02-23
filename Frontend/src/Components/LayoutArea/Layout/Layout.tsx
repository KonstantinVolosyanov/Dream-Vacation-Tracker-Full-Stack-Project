import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">

            <nav>
                <Menu />
            </nav>

            <header>
                <AuthMenu/>
            </header>

            <main>
                <Routing />
            </main>

        </div>
    );
}

export default Layout;
