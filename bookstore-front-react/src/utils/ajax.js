let getRequest = (url, callback) => {
    let opts = {
        method: "GET",
        credentials: "include"
    };
    fetch(url, opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

let postRequest = (url, json, callback) => {
    let opts = {
        method: "POST",
        body: JSON.stringify(json),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(url, opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

let putRequest = (url, json, callback) => {
    let opts = {
        method: "PUT",
        body: JSON.stringify(json),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(url, opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

let deleteRequest = (url, callback) => {
    let opts = {
        method: "DELETE",
        credentials: "include"
    };
    fetch(url, opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

export {getRequest, postRequest, putRequest, deleteRequest};
