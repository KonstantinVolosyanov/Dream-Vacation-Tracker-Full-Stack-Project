import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";

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
