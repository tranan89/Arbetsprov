const restEndpoint = 'https://restcountries.eu/rest/v1';

export function getCountriesWithName(name) {
    if (!name || name.length < 2) {
        return Promise.reject('Empty or too short country name');
    }

    return fetch(`${ restEndpoint }/name/${ name }`)
        .then(checkStatus)
        .then(parseJSON);
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    else {
        let error;
        if (response.statusText) {
            error = new Error(response.statusText);
        } else {
            error = new Error('Invalid status');
        }
        error.response = response;
        throw error
    }
}

function parseJSON(response) {
    return response.json()
}