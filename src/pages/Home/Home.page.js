import React, {Component} from "react";
import './Home.scss';
import LacTable from "../../components/LacTable/LacTable";

class HomePage extends Component {
    render() {
        return (
            <div className="Home">

                <div className="container">

                    <div className="hero">
                        <h1 className="hero__title">Bienvenido a QueryLac</h1>
                        <p className="hero__subtitle">Donde puedes consultar cualquiercosa-lac, pero todo es
                            más <span>bonito</span></p>
                    </div>

                    <LacTable/>

                </div>
            </div>
        );
    }
}

export default HomePage;