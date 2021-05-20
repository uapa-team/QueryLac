import React from "react";
import {Component} from "react";
import {Carousel, Table, Upload, message} from 'antd';
import 'antd/dist/antd.compact.css';
import './LacTable.scss';
import {connect} from "react-redux";
import readXlsxFile from 'read-excel-file';
import {getTeacherBasicDetails} from "../../redux/actions/LacTable/getTeacherBasicDetails.action";
import {getTeacherArticles} from "../../redux/actions/LacTable/getTeacherArticles.action";
import {getTeacherBookChapters} from "../../redux/actions/LacTable/getTeacherBookChapters.action";

class LacTable extends Component {

    state = {category: 'basicDetails', dataToRequest: []};

    changePage = (button) => {
        // console.log(button)
    }

    changeCategory = async (btn,category) => {
        const {dataToRequest} = this.state;
        let requestMethod;
        this.setState({category: category});

        switch (category) {
            case 'basicDetails':
                requestMethod = 'getTeacherBasicDetails';
                break;
            case 'articles':
                requestMethod = 'getTeacherArticles';
                break;
            case 'bookChapters':
                requestMethod = 'getTeacherBookChapters';
                break;
            case 'basicDetails':
                requestMethod = 'getTeacherBasicDetails';
                break;

        }

        console.log(btn, btn.parent)

        for (let i = 0; i < dataToRequest.length; i++) {
            await this.props[requestMethod](dataToRequest[i]);
        }

        // dataToRequest.forEach(dni => );
    }

    makeColumns = (category) => {
        const data = this.props.teachers[category];
        if (!data[0]) return;
        return Object.keys(data[0]).map(key => {
            return {
                title: key,
                dataIndex: key,
                key: key,
                width: 150,
            };
        });

    }


    makeRows = (category) => {
        const data = this.props.teachers[category];
        if (!data[0]) return;

        const colsKeys = Object.keys(data[0]);

        return data.map((element, i) => {
            let row = {
                key: i,
            };
            colsKeys.forEach((key, i) => {
                row[key] = element[key];
            })
            return row;
        })
    }

    render() {
        const {changePage} = this;
        const {category} = this.state;

        const uploadBtnSettings = {
            accept: ".xlsx",
            name: 'file',
            maxCount: 1,
            beforeUpload: (file) => {
                readXlsxFile(file).then(async (rows) => {
                    this.setState({dataToRequest: rows});
                    // for (let i = 0; i < rows.length; i++) {
                    //     await this.props.getTeacherBasicDetails(rows[i], category);
                    // }
                    rows.forEach(dni => this.props.getTeacherBasicDetails(dni[0], category))
                });
                return false;
            },
        };


        const carrouselSettings = {
            arrows: true,
            autoplay: false,
            slidesToShow: 3,
            swipe: true,
            dots: false,
            infinite: false,
            draggable: true
        }

        const tableSettings = {
            columns: this.makeColumns(category),
            dataSource: this.makeRows(category),
            scroll: {
                x: 1000
            },
            sticky: true,
        }
        console.log(tableSettings)

        return (
            <div className="LacTable">
                <ul className="LacTable-nav">
                    <li onClick={(btn) => changePage(btn)} className="LacTable-nav__tab" data-target="cvLac">CvLac</li>
                    <li onClick={(btn) => changePage(btn)} className="LacTable-nav__tab LacTable-nav__tab--inactive"
                        data-target="groupLac">GroupLac
                    </li>
                    <li onClick={(btn) => changePage(btn)} className="LacTable-nav__tab LacTable-nav__tab--inactive"
                        data-target="googleScholar">GoogleScholar
                    </li>
                </ul>
                <div className="LacTable-wrapper">
                    <div className="LacTable-header">
                        <div>
                            <div className="LacTable-filterSlider">
                                <Carousel {...carrouselSettings}>
                                    <div>
                                        <div onClick={(btn) => this.changeCategory(btn,"basicDetails")}
                                             className={`LacTable-filterSlider__slide LacTable-filterSlider__slide--${category === "basicDetails" ? "active": "inactive"}`}>
                                            Datos básicos
                                        </div>
                                    </div>
                                    <div>
                                        <div onClick={(btn) => this.changeCategory(btn,"articles")}
                                             className={`LacTable-filterSlider__slide LacTable-filterSlider__slide--${category === "articles" ? "active": "inactive"}`}>
                                             Artículos
                                        </div>
                                    </div>
                                    <div>
                                        <div onClick={(btn) => this.changeCategory(btn,"bookChapters")}
                                             className={`LacTable-filterSlider__slide LacTable-filterSlider__slide--${category === "bookChapters" ? "active": "inactive"}`}>
                                             Capítulos de libros
                                        </div>
                                    </div>

                                    <div>
                                        <div onClick={(btn) => this.changeCategory(btn,"awards")}
                                             className={`LacTable-filterSlider__slide LacTable-filterSlider__slide--${category === "awards" ? "active": "inactive"}`}>
                                             Premios
                                        </div>
                                    </div>
                                </Carousel>
                            </div>

                        </div>

                        <div className="LacTable-actionBtns">
                            <button
                                className="LacTable-actionBtns__btn LacTable-actionBtns__btn--export icon-download">Exportar
                            </button>
                            <Upload {...uploadBtnSettings}>
                                <button
                                    className="LacTable-actionBtns__btn LacTable-actionBtns__btn--add icon-add">Añadir
                                    profesores
                                </button>
                            </Upload>
                        </div>
                    </div>

                    <div className="LacTable-table">
                        <div><Table {...tableSettings}/></div>
                    </div>
                </div>
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        teachers: state.teachers.teachers,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTeacherBasicDetails: (id) => dispatch(getTeacherBasicDetails(id)),
        getTeacherArticles: (id) => dispatch(getTeacherArticles(id)),
        getTeacherBookChapters: (id) => dispatch(getTeacherBookChapters(id)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LacTable)
