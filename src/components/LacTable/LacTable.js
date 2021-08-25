//Core
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
//Dependencies
import {Carousel, Dropdown, Upload, message} from 'antd';
import MaterialTable from "material-table";
import readXlsxFile from 'read-excel-file';
import XLSX from 'xlsx';

//Styles
import './LacTable.scss';


import teachersActions from "../../redux/actions/LacTable/cvlac/";
import groupsActions from "../../redux/actions/LacTable/grouplac/";


//TODO: Make this queryable?? or just let them in english
const cvlacCategories = [
    {name: "basicDetails", title: "Datos básicos"},
    {name: "notFound", title: "No se encontró"},
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

export default function LacTable(props) {
    const dispatch = useDispatch();

    const initialCategories = cvlacCategories;
    const initialActiveCategory = 'basicDetails';
    const initialActiveModule = 'cvlac';
    const initialDataToRequest = [];
    const initialError = null;

    const [categories, setCategories] = useState(initialCategories);
    const [activeCategory, setActiveCategory] = useState(initialActiveCategory);
    const [activeModule, setActiveModule] = useState(initialActiveModule);
    const [dataToRequest, setDataToRequest] = useState(initialDataToRequest);
    const [error, setError] = useState(initialError);

    const data = useSelector(state => state[activeModule].data);
    const isLoading = useSelector(state => state[activeModule].loading);
    const thereIsError = useSelector(state => state[activeModule].error);

    // useEffect(() =>{
    //
    //     console.log("as");
    //     // if (thereIsError !==null || error !==null) {
    //     //     message.error("Oups!")
    //     //     setError(thereIsError);
    //     // }
    // },[thereIsError, error]);

    const getAllInfo = async () => {
        // Base on the module is on, call the correspondent method
        switch (activeModule) {
            case 'cvlac':
                dispatch(teachersActions.getTeachersInfo(dataToRequest))
                break;
            case 'grouplac':
                dispatch(teachersActions.getGroupInfo(dataToRequest))
                break;
            default:
                return
        }
    }

    const changePage = (module) => {
        setActiveModule(module);
        setActiveCategory("basicDetails");

        switch (module) {
            case 'cvlac':
                setCategories(cvlacCategories);
                break;
            case 'grouplac':
                setCategories(grouplacCategories);
                break;
            case 'googleScholar':
                // setCategories( [""]);
                break;

            default:
                return
        }
    };

    const changeCategory = async (category) => {
        if (dataToRequest.length < 1) {
            message.info(`Sube información para consultar con el botón "Añadir"`)
            return;
        }


        setActiveCategory(category);

        let requestMethod;
        switch (activeModule) {
            case 'cvlac':
                //Not request again if the info is already requested.

                if (data[category].length > 0) return;
                //Example: if category is "basicDetails" then requestMethod would be "getTeacherBasicDetails";
                requestMethod = `getTeachers${capitalizeFirstLetter(category)}`;
                console.log(dataToRequest)
                dispatch(teachersActions[requestMethod](dataToRequest))

                break;
            case 'grouplac':
                //Not request again if the info is already requested.
                if (data[category].length > 0) return;
                //Example: if category is "basicDetails" then requestMethod would be "getGroupBasicDetails";
                requestMethod = `getGroup${capitalizeFirstLetter(category)}`;
                dispatch(groupsActions[requestMethod](dataToRequest))

                break;
            case 'googleScholar':
                if (data[category].length > 0) return;
                break;

            default:
                return
        }
    };


    const makeColumns = (data) => {
        if (data.length < 1) return;

        return Object.keys(data[0]).map(key => {
            return {
                title: key,
                field: key,
            };
        });

    };

    const makeRows = (data) => {
        if (data.length < 1) return;

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

    const exportExcel = (data) => {
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

    const exportCsv = (data) => {
        // A workbook is the name given to an Excel file
        // Workbook contains one or more worksheets
        // make Workbook of Excel
        const workBook = XLSX.utils.book_new();
        const workSheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workBook, workSheet, activeCategory);
        // export Excel file
        XLSX.writeFile(workBook, 'book.csv', {type: 'binary', bookType: "csv"});
    }


    const uploadBtnSettings = {
        accept: ".xlsx",
        name: 'file',
        maxCount: 1,
        onChange: (_) => {
            switch (activeModule) {
                case 'cvlac':
                    dispatch(teachersActions.resetTeachersData())
                    break;
                case 'grouplac':
                    dispatch(groupsActions.resetGroupsData())
                    break;
                case 'googleScholar':
                    break;

                default:
                    return
            }
        },
        beforeUpload: (file) => {
            readXlsxFile(file).then(async (rows) => {
                const dnis = rows.map(row => row[0]);
                setDataToRequest(dnis);
                console.log(dnis)
                switch (activeModule) {
                    case 'cvlac':
                        // await dispatch(teachersActions.getTeachersBasicDetails(dnis));
                        break;
                    case 'grouplac':
                        await dispatch(groupsActions.getGroupBasicDetails(dnis));
                        break;
                    case 'googleScholar':
                        break;
                    default:
                        return
                }

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
                <button onClick={() => changeCategory(name)}
                        className={`LacTable-filterSlider__slide LacTable-filterSlider__slide--${activeCategory === name ? "active" : "inactive"}`}>
                    {title}
                </button>
            </div>
        );
    });

    const tableSettings = {
        columns: makeColumns(data[activeCategory]),
        data: makeRows(data[activeCategory]),
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
            pageSizeOptions: [5, 10, 25, 50, data[activeCategory].length],
            showTitle: false,
        }
    };

    const exportMenu = (
        <ul className="LacTable-actionBtns-menu">
            <li className="LacTable-actionBtns-menu__option" onClick={() => exportExcel(data)}>Excel</li>
            <li className="LacTable-actionBtns-menu__option" onClick={() => exportCsv(data)}>Csv</li>
        </ul>
    );

    return (
        <div className="LacTable">
            <div className="LacTable-nav">
                <button onClick={() => changePage("cvlac")}
                        className={`LacTable-nav__tab LacTable-nav__tab--${activeModule === "cvlac" ? "active" : "inactive"}`}>CvLac
                </button>
                {/*<button onClick={() => changePage( "grouplac")}*/}
                {/*        className={`LacTable-nav__tab LacTable-nav__tab--${activeModule === "grouplac" ? "active" : "inactive"}`}>GroupLac*/}
                {/*</button>*/}
                {/*<li onClick={(btn) => changePage(btn, "googleScholar")} className="LacTable-nav__tab LacTable-nav__tab--inactive">GoogleScholar*/}
                {/*</li>*/}
            </div>
            <div
                className={`LacTable-wrapper LacTable-wrapper--${isLoading ? "loading" : ""}`}>
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


