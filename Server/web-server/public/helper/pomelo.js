const pomeloInit = async function (pomelo, host = "127.0.0.1", port = 3010) {
    return new Promise((resolve) => {
        pomelo.init({host: host, port: port, log: true}, () => {
            return resolve();
        });
    })
}

const pomeloRequest = async function (pomelo, route, data, callback) {
    return new Promise((resolve) => {
        pomelo.request(route, data, (response) => {
            console.log(route, data, response)
            callback && callback(response);
            return resolve(response);
        });
    })
}

const pomeloListen = function (pomelo, route, callback) {
    pomelo.on(route, (data, info) => {
        callback && callback(data, info);
        console.log(route, data, info)
    })
}

const pomeloListenList = function (pomelo, routeList, callback) {
    routeList.forEach(route => {
        pomelo.on(route, (data, info) => {
            callback && callback(data, info);
            console.log(route, data, info)
        })
    })
}