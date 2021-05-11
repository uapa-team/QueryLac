import React from "react";
import {Component} from "react";
import {Carousel, Table} from 'antd';
import 'antd/dist/antd.compact.css';
import './LacTable.scss';

class LacTable extends Component {

    render() {
        const carrouselSettings = {
            arrows: true,
            autoplay: false,
            slidesToShow: 3,
            swipe: true,
            dots: false,
            infinite: false,
            draggable: true
        }

        const columns = [
            {
                title: 'Full Name',
                width: 100,
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
            },
            {
                title: 'Age',
                width: 100,
                dataIndex: 'age',
                key: 'age',
                fixed: 'left',
            },
            {
                title: 'Column 1',
                dataIndex: 'address',
                key: '1',
                width: 150,
            },
            {
                title: 'Column 2',
                dataIndex: 'address',
                key: '2',
                width: 150,
            },
            {
                title: 'Column 3',
                dataIndex: 'address',
                key: '3',
                width: 150,
            },
            {
                title: 'Column 4',
                dataIndex: 'address',
                key: '4',
                width: 150,
            },
            {
                title: 'Column 5',
                dataIndex: 'address',
                key: '5',
                width: 150,
            },
            {
                title: 'Column 6',
                dataIndex: 'address',
                key: '6',
                width: 150,
            },
            {
                title: 'Column 7',
                dataIndex: 'address',
                key: '7',
                width: 150,
            },
            {title: 'Column 8', dataIndex: 'address', key: '8'},
            {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 100,
                render: () => <a>action</a>,
            },
        ];

        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                key: i,
                name: `Edrward ${i}`,
                age: 32,
                address: `London Park no. ${i}`,
            });
        }

        return (
            <div className="LacTable">
                <ul className="LacTable-nav">
                    <li className="LacTable-nav__tab" data-target="cvLac">CvLac</li>
                    <li className="LacTable-nav__tab LacTable-nav__tab--inactive" data-target="groupLac">GroupLac</li>
                    <li className="LacTable-nav__tab LacTable-nav__tab--inactive"
                        data-target="googleScholar">GoogleScholar
                    </li>
                </ul>
                <div className="LacTable-wrapper">
                    <div className="LacTable-header">
                        <div>
                            <div className="LacTable-filterSlider">
                                <Carousel {...carrouselSettings}>
                                    <div>
                                        <li className="LacTable-filterSlider__slide">Artículos</li>
                                    </div>
                                    <div>
                                        <li className="LacTable-filterSlider__slide LacTable-filterSlider__slide--inactive ">Libros</li>
                                    </div>

                                    <div>
                                        <li className="LacTable-filterSlider__slide LacTable-filterSlider__slide--inactive ">Títulos</li>
                                    </div>

                                    <div>
                                        <li className="LacTable-filterSlider__slide LacTable-filterSlider__slide--inactive ">Cvlac</li>
                                    </div>

                                    <div>
                                        <li className="LacTable-filterSlider__slide LacTable-filterSlider__slide--inactive ">Cvlac</li>
                                    </div>

                                </Carousel>
                            </div>

                        </div>

                        <div className="LacTable-actionBtns">
                            <button
                                className="LacTable-actionBtns__btn LacTable-actionBtns__btn--export icon-download">Exportar
                            </button>
                            <button className="LacTable-actionBtns__btn LacTable-actionBtns__btn--add icon-add">Añadir
                                profesores
                            </button>
                        </div>
                    </div>

                    <div className="LacTable-table">
                        <div><Table columns={columns} dataSource={data} scroll={{x: 1500}} sticky/>
                        </div>


                    </div>
                </div>
            </div>
        );

    }
}


export default LacTable;

