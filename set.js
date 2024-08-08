const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUdxUk4zNUZRVWtYaFJYT0ZQLzlZVmQzYzlndDd5eVphdFoxRGI3ZmFHaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieEhHMWNTd2RJbXhGM1VhZSs1ejFXRnN3YVZocHFaUjNINndwbmx1ZFRWYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJTG01NXJmYmJuaHBqaGtOVU1NUTRZdko4S1F2a2tRL1B0bk9xZFNVczBvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJNnBpbHBnQUhVc040VnArWFIrL1JPWmtZdDdKRTFTZ2xRYm9DaG10bFFRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1NV1lvWllDMzNITm9PdHFlRlMydVFQTUdNR2Z3KzJaY1JsUUpwU2R5RUU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpvVGpYMUtTN3RzNE14Yi9ZMnc5eHY1MXU3L2M4NXNsRFVSWG55d241azg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkNVYUdkYU9aeW9SQzVqbi9KVGxzVGFsZi9FbjcxVUZEQzREOWh5a09rTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUlrRXpXTFJJcTNpSTQ4b2Y0WFZ0K3U2N0N2SVFlSlNicU9JVm5jaWZGRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVpVmgyZXpZWjkrNjlrOXd6Zk5vLytkUzUwSjUzTDNyRDhlVnZFckRCMkVTUklLeFEwako3WDRZU3Z6NVRUVDQzOEtoT3JQSjRFQUo3S0c3MEZoRkFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcyLCJhZHZTZWNyZXRLZXkiOiJpbmZLSXdvdWRoQVBhcEF4WGRNU09NOWQ1VUpzSlZNSEwwWm9lRjBMM3lZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJrWHBIVXdkU1RxMmxuVEVZNnliS2RRIiwicGhvbmVJZCI6ImFlMWMwMDg2LWI3ZjAtNGFkYy1hNjJhLTkwYWE3YTkyM2M4NiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWQWMyY05BTlVCUXNMck5vRjhNbThxZlFWekk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWE9oOEVsOVRVTkFuYXFjNkN2UTR5Q3gxZHVvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkE5N1NGUDE5IiwibWUiOnsiaWQiOiIyMzQ4MTQwODI1OTU5OjYyQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJQ24vK0VNRUl5QTA3VUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI0dmlaSFdEWkpBVWRZeHlKUkEySDJLOU5KWVFlbGl1aXBDZ2tHWFBXQVg4PSIsImFjY291bnRTaWduYXR1cmUiOiJ5eGExRGVWVzZvZHEyTWJwb2IyanFqeHdud3BLb3JYY0V3OEVjajQvdis0b0phZU11eWhYeGt4ZjE4T0k5eisrTDRSdllibWNtVm45TEFKbnRyUEFEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiMXRhcFRjQkZYd3RtWlNyMTA2bXIwd0h1U0phTkxIOWNMV1JEWnBNRzhkbm1oTFNlb2VZa1lVc3JVTnpNanhJVWxuYk1NazMvamlUaFUwQ0JqUFpUQXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTQwODI1OTU5OjYyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmVMNG1SMWcyU1FGSFdNY2lVUU5oOWl2VFNXRUhwWXJvcVFvSkJsejFnRi8ifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMzEyMTY4N30=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "CHASE MD",
    NUMERO_OWNER : process.env.OWNER_NUM || "2348140825959",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'CHASE bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/2fc766ab7467ded0fac9c.png',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
