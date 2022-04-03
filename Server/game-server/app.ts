import {RESERVED, pinus} from 'pinus';
import {preload} from './preload';
import {DefaultErrorHandler} from "./app/exception/AppErrorHandler";
import {DataSource} from "typeorm";
import {AppAttr} from "./app/constant/app";
import * as path from "path";

/**
 *  替换全局Promise
 *  自动解析sourcemap
 *  捕获全局错误
 */
preload();

/**
 * Init app for client.
 */
let app = pinus.createApp();
app.set('name', 'Server');

// app configuration
app.configure('production|development', 'connector', function () {
    app.set('connectorConfig',
        {
            connector: pinus.connectors.hybridconnector,
            heartbeat: 3,
            useDict: true,
            useProtobuf: true
        });
});
app.set(RESERVED.ERROR_HANDLER, DefaultErrorHandler)

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "game-hub",
    synchronize: true,
    entities: [
        path.join(__dirname, 'app', 'entity', '*.ts'),
        path.join(__dirname, 'app', 'entity', '*.js')
    ]
})

app.set(AppAttr.DataSource, AppDataSource);

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
        process.exit(0);
    })


// start app
app.start();

