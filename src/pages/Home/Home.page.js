import React from "react";
import './Home.scss';
import LacTable from "../../components/LacTable/LacTable";

function HomePage(props) {
        return (
            <div className="Home">

                <div className="container">

                    <div className="hero">
                        <h1 className="hero__title">Bienvenido a QueryLac</h1>
                        <p className="hero__subtitle">Donde puedes descargar información que reposa en la base de datos de <span>Minciencias</span> para documentar la productividad de la comunidad académica y de los grupos de investigación</p>
                    </div>
                    <LacTable/>
                </div>
            </div>
        );
}

export default HomePage;