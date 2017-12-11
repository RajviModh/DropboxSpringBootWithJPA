const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080'

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) => {
    return fetch(`${api}/user/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            //alert(JSON.stringify(res));
        return res;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};
export const doSignup = (payload) => {
    return fetch(`${api}/user/signup`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            alert("in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

export const doUpload = (payload) => {
  /*  let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
*/
    return fetch(`${api}/user/fileUpload`, {
        method: 'POST',
        headers: headers,
        contentType:"multipart/form-data",
        encType:"multipart/form-data",
        body: payload,
        credentials: 'include'
    }).then(res => res.json())
        .then(res => {
            //alert("do upload " + res);
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};
export const doMakedirectory = (payload) => {

    return fetch(`${api}/file/makeDirectory`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials: 'include'
    }).then(res => res.json())
        .then(res => {
            console.log("makedirectory res " + JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};
export const deleteDirectory = (payload) => {
    return fetch(`${api}/file/deleteDirectory`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials: 'include'
    }).then(res => {
        console.log("In delete dir api " + JSON.stringify(res));
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

};

export const doDownload = (payload) => {
    return fetch(`${api}/file/download`, {
        method: 'post',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        responseType: 'stream'
    })
        .then(res => res.json())
        .then(res => {
            alert("in download api : "+ JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

export const dohandleProfile = (payload) => {
    return fetch(`${api}/user/editProfile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            alert(JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

export const getProfile = (payload) => {
    return fetch(`${api}/user/getProfile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

export const doStarFiles = (payload) =>
    fetch(`${api}/file/doStar`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res =>{

            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const doUnStarFiles = (payload) =>
    fetch(`${api}/file/doUnStar`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res =>{
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const getStarredFiles = (payload) =>
    fetch(`${api}/file/getStarredFiles`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res =>{
           // alert("response from api");
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const doShareFiles =(payload)=>
    fetch(`${api}/file/getSharedFiles`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res =>{
            alert("response from api in sharefiles" +JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const dohandleUserActivity = (payload) => {
    return fetch(`${api}/file/getUserActivity`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};
export const logout = () =>
    fetch(`${api}/user/logout`, {
        method: 'POST',
        headers: {
            ...headers
        },
        credentials:'include'
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const getDirectories =(payload) =>

    fetch(`${api}/file/getDir`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res =>{
            // debugger;
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

