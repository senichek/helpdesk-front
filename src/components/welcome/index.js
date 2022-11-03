import './reset.scss';
import './style.scss';
import { Link } from "react-router-dom";

const Welcome = () => {

    return (
        <>
        <header>
        <h1 className="top-header">Portfolio project</h1>
    </header>
    <main>
        <div className="intro-container">
            <div className="intro">
                <h1 className="intro__header">Help Desk Application</h1>
                <p className="intro__text">I did this project in order to experiment a bit with <em>Socket.IO</em>. This is a simple chat 
                app where users can register as "helpers" if they want to provide help to others (act as tech assistants or tech support) 
                or as "user" if they'd like to get some help. In order to test it follow these steps: <em>1.</em> Open two instances of a 
                browser. <em>2.</em> In the first instance of the browser log in as "user". <em>3.</em> In the second instance of the 
                browser log in as helper and click the icon of a user you'd like to talk to. </p>
                {/* <ol className="intro__list">
                    <li>open two instances of a browser</li>
                    <li>in the first instance of the browser log in as user</li>
                    <li>in the second instance of the browser log in as helper and click the icon of a user you'd like to talk to.</li>
                </ol> */}
                <div className="intro__links">
                <Link to="/login" className="intro__link">Run the app {'>>'}</Link>
                <a className="intro__link" href="https://github.com/senichek/helpdesk-front">Front repo {'>>'}</a>
                <a className="intro__link" href="https://github.com/senichek/helpdesk-back">Back repo {'>>'}</a>
                <a className="intro__link" href="https://github.com/senichek/helpdesk-chat-server">Chat server repo {'>>'}</a>
                </div>
            </div>
        </div>
    </main>
    <footer className="footer">
        <p className="footer-text">The project is done by Olexiy Senichek</p>
    </footer>
        </>
    )
};

export default Welcome;