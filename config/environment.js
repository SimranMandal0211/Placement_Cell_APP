const fs = require('fs');
const rfs = require("rotating-file-stream");
const path = require('path');
require('dotenv').config();

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);


const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});




const development = {
    name: 'development',
    port: '8000',
    asset_path: '/assets',
    session_cookie_key: 'blashsomething',
    db: 'placementcellapp_devlopment',

    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}


const production = {
    name: 'production',
    port: process.env.PLACEMENTCELL_PORT,
    asset_path: process.env.PLACEMENTCELL_ASSET_PATH,
    session_cookie_key: process.env.PLACEMENTCELL_SESSION_COOKIE_KEY,
    db: process.env.PLACEMENTCELL_DB,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}



module.exports = eval(process.env.PLACEMENTCELL_ENVIRONMENT) == undefined ? development : eval(process.env.PLACEMENTCELL_ENVIRONMENT);
// We will be using Morgan as a middleware
// To save the logs in the file we will be using a middleware that will put those logs in the file but also that file can grow huge, to prevent in growing huge either we create a backup for weekly logs or we keep on deleting the older logs. 