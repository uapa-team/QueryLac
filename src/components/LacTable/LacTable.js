import React from "react";
import {Component} from "react";
import {Carousel, Upload} from 'antd';
import MaterialTable from "material-table";
import 'antd/dist/antd.compact.css';
import './LacTable.scss';
import {connect} from "react-redux";

import readXlsxFile from 'read-excel-file';
import {getTeacherBasicDetails} from "../../redux/actions/LacTable/cvlac/getTeacherBasicDetails.action";
import {getTeacherArticles} from "../../redux/actions/LacTable/cvlac/getTeacherArticles.action";
import {getTeacherBookChapters} from "../../redux/actions/LacTable/cvlac/getTeacherBookChapters.action";
import {resetTeachersData} from "../../redux/actions/LacTable/cvlac/resetTeachersData.action";

class LacTable extends Component {

    //Initial state
    state = {
        categories: [
            {name: "basicDetails", title: "Datos básicos"},
            {name: "articles", title: "Artículos"},
            {name: "bookChapters", title: "Capítulos de libros"},
            {name: "awards", title: "Premios"},
        ],
        activeCategory: 'basicDetails',
        activeModule: 'cvlac',
        dataToRequest: {cvlac: [], grouplac: []},
    };

    changePage = (button, module) => {
        this.setState({activeModule: module});
        switch (module) {
            case 'cvlac':
                this.setState({
                    categories: [
                        {name: "basicDetails", title: "Datos básicos"},
                        {name: "articles", title: "Artículos"},
                        {name: "bookChapters", title: "Capítulos de libros"},
                    ]
                });
                break;
            case 'grouplac':
                this.setState({
                    categories: [
                        {name: "basicDetails", title: "Datos básicos"},
                        {name: "members", title: "Miembros"},
                        {name: "institutions", title: "Instituciones"},
                    ]
                });
                break;
            case 'googleScholar':
                this.setState({categories: [""]});
                break;
        }

    };

    changeCategory = async (btn, category) => {
        const {dataToRequest, activeModule} = this.state;
        this.setState({activeCategory: category});

        // Base on the module and the category is on, not request again if the info is already requested.
        switch (activeModule) {
            case 'cvlac':
                if (this.props.teachers.data[category].length > 0) return;
                break;
            case 'grouplac':
                if (this.props.groups.data[category].length > 0) return;
                break;
            case 'googleScholar':
                if (this.props.teachers.data[category].length > 0) return;
                break;
        }

        // Base on the category is on, call the correspondent method
        let requestMethod;
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
        }

        for (let i = 0; i < dataToRequest[activeModule].length; i++) {
            await this.props[requestMethod](dataToRequest[activeModule][i]);
        }

    };

    makeColumns = (category) => {
        const data = this.props.teachers.data[category];
        if (!data[0]) return;

        return Object.keys(data[0]).map(key => {
            return {
                title: key,
                field: key,
                // width: 200
            };
        });

    };


    makeRows = (category) => {
        const data = this.props.teachers.data[category];
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
        const {categories, activeCategory, activeModule} = this.state;


        const uploadBtnSettings = {
            accept: ".xlsx",
            name: 'file',
            maxCount: 1,
            onChange: (file) => {
                this.props.resetTeachersData();
            },
            beforeUpload: (file) => {
                readXlsxFile(file).then(async (rows) => {
                    this.setState({dataToRequest: {[activeModule]: rows}});
                    for (let i = 0; i < rows.length; i++) {
                        await this.props.getTeacherBasicDetails(rows[i][0], activeCategory);
                    }
                    // rows.forEach(dni => this.props.getTeacherBasicDetails(dni[0], activeCategory));
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
        };

        const slides = categories.map(({name, title}) => {
            return (
                <div>
                    <button onClick={(btn) => this.changeCategory(btn, name)}
                            className={`LacTable-filterSlider__slide LacTable-filterSlider__slide--${activeCategory === name ? "active" : "inactive"}`}>
                        {title}
                    </button>
                </div>
            )
        });


        const tableSettings = {
            columns: this.makeColumns(activeCategory),
            data: this.makeRows(activeCategory),
            pageSize: 5,       // make initial page size
            emptyRowsWhenPaging: false,   //to make page size fix in case of less data rows
            pageSizeOptions: [5, 10, 20, 50],

            options: {
                exportButton: true,
                exportFileName: activeCategory,
                showTitle: false,


            }
        };

        return (
            <div className="LacTable">
                <ul className="LacTable-nav">
                    <li onClick={(btn) => changePage(btn, "cvlac")}
                        className={`LacTable-nav__tab LacTable-nav__tab--${activeModule === "cvlac" ? "active" : "inactive"}`}>CvLac
                    </li>
                    <li onClick={(btn) => changePage(btn, "grouplac")}
                        className={`LacTable-nav__tab LacTable-nav__tab--${activeModule === "grouplac" ? "active" : "inactive"}`}>GroupLac
                    </li>
                    {/*<li onClick={(btn) => changePage(btn, "googleScholar")} className="LacTable-nav__tab LacTable-nav__tab--inactive">GoogleScholar*/}
                    {/*</li>*/}
                </ul>
                <div className={`LacTable-wrapper LacTable-wrapper--${this.props.teachers.loading ? "loading" : ""}`}>
                    <div className="LacTable-header">
                        <div>
                            <div className="LacTable-filterSlider">
                                <Carousel {...carrouselSettings}>{slides}</Carousel>
                            </div>
                        </div>

                        <div className="LacTable-actionBtns">
                            {/*<button*/}
                            {/*    className="LacTable-actionBtns__btn LacTable-actionBtns__btn--export icon-download">Exportar*/}
                            {/*</button>*/}
                            <Upload {...uploadBtnSettings}>
                                <button
                                    className="LacTable-actionBtns__btn LacTable-actionBtns__btn--add icon-add">Añadir
                                </button>
                            </Upload>
                        </div>
                    </div>

                    <div className="LacTable-table">
                        <div><MaterialTable {...tableSettings}
                            // icons={tableIcons}
                        /></div>
                    </div>
                </div>
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        teachers: state.teachers,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetTeachersData: () => dispatch(resetTeachersData()),
        getTeacherBasicDetails: (id) => dispatch(getTeacherBasicDetails(id)),
        getTeacherArticles: (id) => dispatch(getTeacherArticles(id)),
        getTeacherBookChapters: (id) => dispatch(getTeacherBookChapters(id)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LacTable)
