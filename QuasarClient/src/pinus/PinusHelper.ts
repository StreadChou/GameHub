declare global {
  interface Window {
    pinus: any;
  }
}

const pinus = window.pinus;

export async function init(host = "127.0.0.1", port = "3010") {
  return new Promise((resolve) => {
    pinus.init({
      host: host,
      port: port,
      log: true
    }, (data: any) => {
      return resolve(data);
    });
  })
}


export async function request(route: string, data: any) {
  return new Promise((resolve) => {
    writeRequestLog(route, data);
    pinus.request(route, data, (response: any) => {
      writeResponseLog(route, data, response)
      return resolve(response);
    });
  })
}

export async function listen(routeList: Array<string>, callback?: Function) {
  routeList.forEach(route => {
    pinus.on(route, (data: any, info: any) => {
      callback && callback(route, data, info);
      writeListenLog(route, data, info)
    })
  })
}


export async function writeRequestLog(route: string, data: any) {
  console.log(`发送请求: ${route}, ${JSON.stringify(data)}`)
}

export async function writeResponseLog(route: string, data: any, response: any) {
  console.log(`收到回文: ${route}, ${JSON.stringify(response)}`)
}

export async function writeListenLog(route: string, data: any, info: any) {
  console.log(`收到通知: ${route}, ${JSON.stringify(data)}, ${info}`)
}
