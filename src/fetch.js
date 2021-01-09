const APIKEY = '0ddb9a26781af92c96e23967103fda40';

const requests = async (url, parameters, method = 'GET') => {
    let params;
    const data = {
        method,
        mode: 'cors',
    };

    if (parameters) {
        if (method === 'GET') {
            parameters.appid = APIKEY;
            params = new URLSearchParams(parameters);
        }
        // else options.body = JSON.stringify(params)
    } else {
        params = new URLSearchParams({ appid: APIKEY });
    }

    const finalURL = `${url}?${params}`;

    const response = await fetch(finalURL, data);

    if (response.status !== 200) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    // const r = await response.json();

    return response;
};

const get = async (url, parameters) => requests(url, parameters, 'GET');

const post = (url, parameters) => requests(url, parameters, 'POST');

export { get, post };