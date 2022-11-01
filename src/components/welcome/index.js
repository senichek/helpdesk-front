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
                <p className="intro__text">I did this project in order to experiment a bit with Socket.IO. This is a simple chat app where users 
                can register as "helpers" if they want to provide help to others (act as tech assistants or tech support) or as "user" if 
                they'd like to get some help.</p>
                <div className="intro__links">
                <Link to="/login" className="intro__link">Run the app {'>>'}</Link>
                <a className="intro__link" href="https://github.com/senichek/helpdesk-front">Front repo {'>>'}</a>
                <a className="intro__link" href="https://github.com/senichek/helpdesk-back">Back repo {'>>'}</a>
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