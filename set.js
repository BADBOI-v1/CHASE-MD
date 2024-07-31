const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0JSVHY4VytoTmxkeFJoVCsvd01SazNZVmV5cWx5NHduOXF6THhIaW5sST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiKzdBbjlMUlUyR2tQZDNuKzJyVlNXSU9iWVJTKzcrV0NCK0gycDdnTFQyST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzUENHUkNJNUJWQzErS3hHd0V4NlptdFlJQ0wwWDNwN2g5cUM2M0JoR2xZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUQ1JRNVQ0WGJOY2JzWUp6c1lYN0N0Qi9nTzd2OUwrRHVJbDF0bWZxM1hjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlMaGViR2lyVS9UQTN3QSsxWmF5OFFKdGt4MXg4UU4xenZMMWcySVM2bmc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktGSUFXOVR1MHlJWVMwejZXZHFueWJTWnc3d2FFa3VubjQrNW5yNTIrd2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0VURXNRc1dJcGRTTHdMMkMxd1U4U0FKaWczalZzejlMVzV4UkdxdVhVRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVDdwRFQxVDZORHhFdzZwVmJnMzVaMFJyams5RTM3eGpuT2V1TXdrSVJsST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJMeVNraU5QTjhXTHN6NE5UTFhEU3hCVjNyUGV4bDlFcDI2RElVYTJvN1p3TTFWRitDSGtFbFdtdkV2U3J5MVhkQzZYa3ZRSnJBbHkwYjlwMU43dWpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM4LCJhZHZTZWNyZXRLZXkiOiJuS3pKSjFnb0ZtaEVobFlNY0Fad3gxRWZpSlVqLzg0eGFuMmxJYVpCOGE4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJqVnkyMnRfMFFiV1hsSU9GTkFwanJBIiwicGhvbmVJZCI6ImM2Nzc4M2ZiLTcxYTgtNDE0NC05MjExLTczOTE1OWVhNTE2NCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZUlY0TnpRYnBWS1c0M0tkeWFqY3lHb0pSWGs9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWWgrWk5kakdpMG9ZdzJTUEs4WGdlc0ltUHdVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkdQOEU1NzZGIiwibWUiOnsiaWQiOiIyMzQ4MTQwODI1OTU5OjM3QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNL051djhMRUpEMHFyVUdHQWNnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJuV29JWmYxcFpaTG9jNXVRRGdHOUJKTm5CUEpkWTZBQ08xY3FKRDZGZEJnPSIsImFjY291bnRTaWduYXR1cmUiOiJwb1RUQ2EwNnJxZWVEQ2x3TTFpdWx6Yk5wdzNlU3h6ZXAwSHhYbWxBY2tZQTFwQmlubFA5Z1A4N2xXQ3dBU1BrbFE2cE8veFRzS0ZhWjlpTEJKd09qUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiaVRmUFhCYUNlUWwrWlJLNHg2KzJGdDErVE9UdWNmOWw4Zk52NncxWkk0OXFpaXoxNzB2TjBUSlcwVHBQWVJvRTE5KzVzcHVSVklMMWtEZzQ3K2pvaVE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTQwODI1OTU5OjM3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQloxcUNHWDlhV1dTNkhPYmtBNEJ2UVNUWndUeVhXT2dBanRYS2lRK2hYUVkifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMjQ2NDc5NywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFQbVkifQ==',
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
