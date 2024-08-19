const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUU1VYWJwRjBEVFFCRnB3OWIwYWFjUWMreEcxeWt3TXNIaWRuTmFqN3Iwbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWnpKQWRBZHkwT1ltZHhESDZyYXRqN0VaNUQxdzBLQXAxKzk3bEppN1lBWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlQ1lRYkhzNlpBbXpxT0NVRkYrZVVNNXVRNlpOV3ZYTjZkQnc5cHovSFZ3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzcGNWNzNTVnhzS0xkUnFod1F1RXN5ZDJHY3lzTFVKenFTR2g1Q0poUVM4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1GbndsL3dsYnFQaXdOcTF5Y1JHV3RIbmxrQ1B3UGlnWVh6R05DWXZkblk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJMOWR4eEtFUjd2SkR1Smljdm51QzFVSFVVV2RvYlJEK0NQMVI1THZpQUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0c1VlFNaTRtdFdEQ3pLNjJTS1dVRytWc0ZnazM5Nk80K1NiSXpGZHlrST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL1FJN1pqNEs3eHVpUHpDeHFCK09BQllOT3FyR1BZaDFpaEowcVMvdi9IYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkQ5eldFeVdmaXlFQUZrT0twWmlvUE83ZTBPVG9UbGRhMkVUbXcyNGE2THNpaExXQWdOZlZuM1dHRWZiWU1keTlTWUViRjk2c2JHU01UNlErRWRNOEJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg2LCJhZHZTZWNyZXRLZXkiOiJBcTJsSFJLUTRTdWRFOWR6QTBobnRONFNRUm5jTXVpdWpyWW5TWDBMbUg0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJGXzBWNzVucFRadUp3dzV5U2VJVExBIiwicGhvbmVJZCI6Ijc3ODI3OTc1LTgyZDUtNDY2Yy1iODlkLWY4ZThhMDg1MWQ4ZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4ZFpQcENIeHhhdTRZZi9NSElmU2RDSThGcm89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSC83NEt3NXBRTFZITmZDYTRhYWUwZWluNjIwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlBOVk5WRTJaIiwibWUiOnsiaWQiOiIyMzQ3MDgwNTQxMjk4OjI4QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQZlh4TGdERUlQeGpyWUdHQkFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJlS1RtU3dtand3Q2hQYVZMb2JrbUh1Q1ZsZDIxbUt1V3hxS25VQUJrVlVvPSIsImFjY291bnRTaWduYXR1cmUiOiJCM1JycVFBYWJ6YUxnTGNTRlgrU2t2NFdqRER5K1JHSHhnV0Rpay93T1hNRU9sOE9IMTR6a2dYNkxqK1dQdE1LRXJjVWFtclkxbVl4ZHJKQ21aYnZodz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZmRYeWV0TlJSTHhRS28rSE9jVjdmcEdyY2Z2eGc5M1p1eEJEcjlaUmM4cDhYR2s4NFNUa2ttVG9BTFNWdFVvUDk1SXNvWDc0Y3JjRE1oV2wvRTFrRGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ3MDgwNTQxMjk4OjI4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlhpazVrc0pvOE1Bb1QybFM2RzVKaDdnbFpYZHRaaXJsc2FpcDFBQVpGVksifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNDEwMjgwMCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFKRHQifQ==',
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
