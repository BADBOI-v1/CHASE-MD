const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0VvdEIxZG5sR1ZhU1k2bEV6cldLN2xUZWNKbUdubTRxMmVENUx1cVEyYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTXd1RGJMR2dVT2FneXFLRm9xZG9uZ0RTZWErSVRvdVl0WVd0ZkNSQmtFYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRSVBjdTRGWkczVDhsSHFCTjBxRkMvRkdrT2lLcyt4V1preC8yTmFPcUUwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNNGp6cCtLd2JhOHQ5Z1RDOGxqVkpCRmQxT1F0RWxTL3NrMldnYmtzckJ3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdOcitpTVJnTVNpc2RvYmFiWlhvQkJKd3gvT0VtanVwN3FVMnB1bGZubTg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZyTWpPdTJUYTVtbGE3N2JXK3ZFUlhZYnBOMEZOT0dyeFF2aW4yZktWRnM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUN4RWRpVGx4RXplWnFXWjF3Z0Q4VVNVb283bmNveExESS81UnpZNWJrbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOCtXN1lXQ1dJdDZKRHYwUWdvZ3NOZ0tQQWQwazlldDYxTExZUFFHWXBFTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldySUJIUU9vcTVXNCtabjNwWVpnMXJVVHlhdk02ZG1sVmRYdEYxWENrVk9uZ1JDQnBaWE1NVkJkTmppZFh6TlJPVWNpd0ZKK1oxR3VDSjZoR1hsbGhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA0LCJhZHZTZWNyZXRLZXkiOiJndXNvNno2a3ZsUFhMMTlIRUxqVkVvNkZoZjI0ZlBjZW50dmtoanhyc3g0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6OTEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo5MSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJSTElXTXVKZlJSdWxDdml0cTlwZER3IiwicGhvbmVJZCI6IjM5YmI3YzRkLTE5NjEtNDRlYS04YjYxLTJhN2FkMjZmMjVmZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJldDBtK1RFdFloRTZ0ekNuZlFCY3V1ck9jREk9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRpb2NENGpJQXZ6NUpoNkdadzNNMDR6Y2R4ST0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BmWHhMZ0RFSzNkdWJVR0dBOGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImVLVG1Td21qd3dDaFBhVkxvYmttSHVDVmxkMjFtS3VXeHFLblVBQmtWVW89IiwiYWNjb3VudFNpZ25hdHVyZSI6ImdlT1lNK3ViRkk0L0wvK2ZJK2p4enloN2lucStkcXowY2M5a1RMM0tCREtKYmJJeDl4WUlOd2cyZlM0YU1QdWFBWEQreXp6VXc1V2tLSkpJc3RLR2dBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ0UHRoU25kWFFqV214YTUyMkphZWVOTWVGM040cjd4SGpBVDIydS9iaWR6WTJKMExVZlFLdlZPeFIrUGRzWEhHbVcxU0JTTjRaTE91cVkwUFdUMWdodz09In0sIm1lIjp7ImlkIjoiMjM0NzA4MDU0MTI5ODoyN0BzLndoYXRzYXBwLm5ldCIsImxpZCI6IjIwODc2NTc2MDYxODU3MDoyN0BsaWQiLCJuYW1lIjoiQ2hhIFNl8J+RvSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ3MDgwNTQxMjk4OjI3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlhpazVrc0pvOE1Bb1QybFM2RzVKaDdnbFpYZHRaaXJsc2FpcDFBQVpGVksifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyNzA3NjQxLCJsYXN0UHJvcEhhc2giOiIyV1VqbVoiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUpEcSJ9',
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
