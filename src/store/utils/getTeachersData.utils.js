export async function requestSingleTeachersData (ids, path="") {

    const apiUrl =
        process.env.NODE_ENV === 'production' ?
            `${process.env.REACT_APP_PROD_API_URL}/cvlac/teachers/${path}` :
            `${process.env.REACT_APP_DEV_API_URL}/cvlac/teachers/${path}`;
    const options = {
        // NOTE: For some reason the verb 'GET' cant have a body in its request .?.
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            dnis: ids
        })
    };

    try {
        const response = await fetch(apiUrl, options).then(response => {
            if (!response.ok) throw Error(response.status);
            return response;
        });
        const {data, errors} = await response.json();
        const dataMerged = {
            [path]: [],
            notFound: errors
        }
        data.forEach(teacher => {
            dataMerged[path].push(...teacher[path]);
        });
        return dataMerged;
    } catch (error) {
        throw Error(error)
    }
}