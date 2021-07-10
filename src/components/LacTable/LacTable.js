//Dependencies
import React, {Component} from "react";
import {Carousel, Dropdown, Upload, message} from 'antd';
import MaterialTable from "material-table";
import readXlsxFile from 'read-excel-file';
import XLSX from 'xlsx';

//Styles
import './LacTable.scss';

//Redux
import {connect} from "react-redux";
import {getTeacherBasicDetails} from "../../redux/actions/LacTable/cvlac/getTeacherBasicDetails.action";
import {getTeachersArticles} from "../../redux/actions/LacTable/cvlac/getTeacherArticles.action";
import {getTeachersBookChapters} from "../../redux/actions/LacTable/cvlac/getTeacherBookChapters.action";
import {resetTeachersData} from "../../redux/actions/LacTable/cvlac/resetTeachersData.action";
import {getTeachersInfo} from "../../redux/actions/LacTable/cvlac/getTeachersInfo.action";
import {getTeachersAwards} from "../../redux/actions/LacTable/cvlac/getTeacherAwards.action";
import {getTeacherEvents} from "../../redux/actions/LacTable/cvlac/getTeacherEvents.action";
import {getTeachersLanguages} from "../../redux/actions/LacTable/cvlac/getTeacherLanguages.action";
import {getTeachersBooks} from "../../redux/actions/LacTable/cvlac/getTeacherBooks.action";
import {getTeachersNetworks} from "../../redux/actions/LacTable/cvlac/getTeacherNetworks.action";
import {getTeachersSoftwares} from "../../redux/actions/LacTable/cvlac/getTeacherSoftwares.action";
import {getTeachersTitles} from "../../redux/actions/LacTable/cvlac/getTeacherTitles.action";
import {getTeachersJudges} from "../../redux/actions/LacTable/cvlac/getTeacherJudges.action";
import {getTeachersProjects} from "../../redux/actions/LacTable/cvlac/getTeacherProjects.action";
import {getTeachersCouplesEvaluators} from "../../redux/actions/LacTable/cvlac/getTeacherCouplesEvaluators.action";
import {getGroupInfo} from "../../redux/actions/LacTable/grouplac/getGroupInfo.action";
import {resetGroupsData} from "../../redux/actions/LacTable/grouplac/resetGroupsData.action";
import {getGroupBasicDetails} from "../../redux/actions/LacTable/grouplac/getGroupBasicDetails.action";

//TODO: Make this queryable?? or just let them in english
const cvlacCategories = [
    {name: "basicDetails", title: "Datos básicos"},
    {name: "articles", title: "Artículos"},
    {name: "bookChapters", title: "Capítulos de libros"},
    {name: "awards", title: "Premios"},
    {name: "events", title: "Eventos científicos"},
    {name: "languages", title: "Lenguajes"},
    {name: "books", title: "Libros"},
    {name: "networks", title: "Redes sociales"},
    {name: "softwares", title: "Softwares"},
    {name: "titles", title: "Títulos"},
    {name: "judges", title: "Jurados"},
    {name: "projects", title: "Proyectos"},
    {name: "couplesEvaluators", title: "Pares evaluadores"},
];

const grouplacCategories = [
    {name: "basicDetails", title: "Datos básicos"},
    {name: "institutions", title: "Instituciones"},
    {name: "investigationAreas", title: "Áreas de investigación"},
    {name: "members", title: "Miembros"},
];

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

class LacTable extends Component {


    constructor() {
        super();
        this.state = {
            categories: cvlacCategories,
            activeCategory: 'basicDetails',
            activeModule: 'cvlac',
            dataToRequest: [],
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps[this.state.activeModule].error !== null) message.error('Ops,ocurrió un error obteniendo información de profesores');
        return true;
    }

    getAllInfo = async () => {
        const {activeModule, dataToRequest} = this.state;
        // Base on the module is on, call the correspondent method
        let requestMethod;
        switch (activeModule) {
            case 'cvlac':
                requestMethod = 'getTeachersInfo';
                break;
            case 'grouplac':
                requestMethod = 'getGroupInfo';
                break;
            default:
                return
        }

        await this.props[requestMethod](dataToRequest);
    }

    changePage = (module) => {
        this.setState({activeModule: module, activeCategory: "basicDetails"});
        switch (module) {
            case 'cvlac':
                this.setState({
                    categories: cvlacCategories
                });
                break;
            case 'grouplac':
                this.setState({
                    categories: grouplacCategories
                });
                break;
            case 'googleScholar':
                this.setState({categories: [""]});
                break;

            default:
                return
        }

    };

    changeCategory = async (category) => {
        let requestMethod;
        const {dataToRequest, activeModule} = this.state;
        this.setState({activeCategory: category});

        switch (activeModule) {
            case 'cvlac':
                //Example: if category is "basicDetails" then requestMethod would be "getTeacherBasicDetails";
                requestMethod = `getTeachers${capitalizeFirstLetter(category)}`;
                //Not request again if the info is already requested.
                if (this.props[activeModule].data[category].length > 0) return;
                break;
            case 'grouplac':
                //Example: if category is "basicDetails" then requestMethod would be "getGroupBasicDetails";
                requestMethod = `getGroup${capitalizeFirstLetter(category)}`;
                //Not request again if the info is already requested.
                if (this.props[activeModule].data[category].length > 0) return;
                break;
            case 'googleScholar':
                if (this.props[activeModule].data[category].length > 0) return;
                break;

            default:
                return
        }

        await this.props[requestMethod](dataToRequest);

    };

    makeColumns = () => {
        const {activeModule, activeCategory} = this.state;
        const data = this.props[activeModule].data[activeCategory];
        if (!data[0]) return;

        return Object.keys(data[0]).map(key => {
            return {
                title: key,
                field: key,
            };
        });

    };


    makeRows = () => {
        const {activeModule, activeCategory} = this.state;
        const data = this.props[activeModule].data[activeCategory];
        if (!data[0]) return;

        const colsKeys = Object.keys(data[0]);

        return data.map((element, i) => {
            let row = {
                key: i,
            };
            colsKeys.forEach((key) => {
                row[key] = element[key];
            })
            return row;
        })
    }

    exportExcel = () => {
        const {activeModule} = this.state;
        const data = this.props[activeModule].data;
        // A workbook is the name given to an Excel file
        // Workbook contains one or more worksheets
        // make Workbook of Excel
        const workBook = XLSX.utils.book_new();
        Object.keys(data).forEach((category) => {
            const workSheet = XLSX.utils.json_to_sheet(data[category]);
            // add Worksheet to Workbook
            XLSX.utils.book_append_sheet(workBook, workSheet, category); // sheetAName is name of Worksheet
        });
        // export Excel file
        XLSX.writeFile(workBook, 'book.xlsx')
    }

    exportCsv = () => {
        const {activeCategory, activeModule} = this.state;
        const data = this.props[activeModule].data[activeCategory];
        // A workbook is the name given to an Excel file
        // Workbook contains one or more worksheets
        // make Workbook of Excel
        const workBook = XLSX.utils.book_new();
        const workSheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workBook, workSheet, activeCategory);
        // export Excel file
        XLSX.writeFile(workBook, 'book.csv', {type: 'binary', bookType: "csv"});
    }


    render() {
        const {changeCategory, changePage, getAllInfo, makeRows, makeColumns, exportCsv, exportExcel} = this;
        const {categories, activeCategory, activeModule} = this.state;
        const data = this.props[activeModule].data[activeCategory];


        const uploadBtnSettings = {
            accept: ".xlsx",
            name: 'file',
            maxCount: 1,
            onChange: (_) => {
                switch (activeModule) {
                    case 'cvlac':
                        this.props.resetTeachersData();
                        break;
                    case 'grouplac':
                        this.props.resetGroupsData();
                        break;
                    case 'googleScholar':
                        break;

                    default:
                        return
                }
            },
            beforeUpload: (file) => {
                readXlsxFile(file).then(async (rows) => {
                    this.setState({dataToRequest: rows});
                    let requestMethod

                    switch (activeModule) {
                        case 'cvlac':
                            requestMethod = "getTeachersBasicDetails";
                            break;
                        case 'grouplac':
                            requestMethod = "getGroupBasicDetails";
                            break;
                        case 'googleScholar':
                            break;
                        default:
                            return
                    }

                    for (let i = 0; i < rows.length; i++) {
                        await this.props[requestMethod](rows[i][0], activeCategory);
                    }
                    // rows.forEach(dni => this.props.getTeacherBasicDetails(dni[0], activeCategory));
                });
                return false;
            },
        };


        const carrouselSettings = {
            autoplay: false,
            arrows: true,
            slidesToShow: 4,
            swipe: true,
            dots: false,
            infinite: false,
            draggable: true,
            mobileFirst: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                    }
                }]
        };

        const carrouselSlides = categories.map(({name, title}, i) => {
            return (
                <div key={i}>
                    <button onClick={() => changeCategory( name)}
                            className={`LacTable-filterSlider__slide LacTable-filterSlider__slide--${activeCategory === name ? "active" : "inactive"}`}>
                        {title}
                    </button>
                </div>
            );
        });


        const tableSettings = {
            columns: makeColumns(),
            data: makeRows(),
            pageSize: 5,       // make initial page size
            emptyRowsWhenPaging: false,   //to make page size fix in case of less data rows

            localization: {
                body: {
                    emptyDataSourceMessage: "🌟 Añade contenido 🌟"
                },

                toolbar: {
                    searchTooltip: "Buscar",
                    searchPlaceholder: "Buscar"
                },
                pagination: {
                    labelDisplayedRows: '{from}-{to} de {count}',
                    labelRowsSelect: 'Filas',
                    firstTooltip: 'Primera página',
                    previousTooltip: 'Anterior página',
                    nextTooltip: 'Siguiente página',
                    lastTooltip: 'Última página'
                },
            },
            options: {
                pageSizeOptions: [5, 10, 25, 50, data.length],
                showTitle: false,
            }
        };

        const exportMenu = (
            <ul className="LacTable-actionBtns-menu">
                <li className="LacTable-actionBtns-menu__option" onClick={() => exportExcel()}>Excel</li>
                <li className="LacTable-actionBtns-menu__option" onClick={() => exportCsv()}>Csv</li>
            </ul>
        );

        return (
            <div className="LacTable">
                <div className="LacTable-nav">
                    <button onClick={() => changePage( "cvlac")}
                            className={`LacTable-nav__tab LacTable-nav__tab--${activeModule === "cvlac" ? "active" : "inactive"}`}>CvLac
                    </button>
                    {/*<button onClick={() => changePage( "grouplac")}*/}
                    {/*        className={`LacTable-nav__tab LacTable-nav__tab--${activeModule === "grouplac" ? "active" : "inactive"}`}>GroupLac*/}
                    {/*</button>*/}
                    {/*<li onClick={(btn) => changePage(btn, "googleScholar")} className="LacTable-nav__tab LacTable-nav__tab--inactive">GoogleScholar*/}
                    {/*</li>*/}
                </div>
                <div
                    className={`LacTable-wrapper LacTable-wrapper--${this.props[activeModule].loading ? "loading" : ""}`}>
                    <div className="LacTable-header">
                        <div>
                            <div className="LacTable-filterSlider">
                                <Carousel {...carrouselSettings}>{carrouselSlides}</Carousel>
                            </div>
                        </div>

                        <div className="LacTable-actionBtns">
                            <button
                                className="LacTable-actionBtns__btn" onClick={() => getAllInfo()}>Cargar TODOS
                            </button>

                            <Dropdown overlay={exportMenu} trigger={['click']}>
                                <button
                                    className="LacTable-actionBtns__btn LacTable-actionBtns__btn--export icon-download">Exportar
                                </button>
                            </Dropdown>

                            <Upload {...uploadBtnSettings}>
                                <button
                                    className="LacTable-actionBtns__btn LacTable-actionBtns__btn--add icon-add">Añadir
                                </button>
                            </Upload>
                        </div>
                    </div>

                    <div className="LacTable-table">
                        <div>
                            <MaterialTable {...tableSettings}/>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        cvlac: state.teachers,
        grouplac: state.groups,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        resetTeachersData: () => dispatch(resetTeachersData()),
        getTeachersInfo: (ids) => dispatch(getTeachersInfo(ids)),
        getTeachersBasicDetails: (ids) => dispatch(getTeacherBasicDetails(ids)),
        getTeachersArticles: (ids) => dispatch(getTeachersArticles(ids)),
        getTeachersBookChapters: (ids) => dispatch(getTeachersBookChapters(ids)),
        getTeachersAwards: (ids) => dispatch(getTeachersAwards(ids)),
        getTeachersEvents: (ids) => dispatch(getTeacherEvents(ids)),
        getTeachersLanguages: (ids) => dispatch(getTeachersLanguages(ids)),
        getTeachersBooks: (ids) => dispatch(getTeachersBooks(ids)),
        getTeachersNetworks: (ids) => dispatch(getTeachersNetworks(ids)),
        getTeachersSoftwares: (ids) => dispatch(getTeachersSoftwares(ids)),
        getTeachersTitles: (ids) => dispatch(getTeachersTitles(ids)),
        getTeachersJudges: (ids) => dispatch(getTeachersJudges(ids)),
        getTeachersProjects: (ids) => dispatch(getTeachersProjects(ids)),
        getTeachersCouplesEvaluators: (ids) => dispatch(getTeachersCouplesEvaluators(ids)),

        resetGroupsData: () => dispatch(resetGroupsData()),
        getGroupBasicDetails: (cod) => dispatch(getGroupBasicDetails(cod)),
        getGroupInfo: (cod) => dispatch(getGroupInfo(cod)),

    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LacTable);
