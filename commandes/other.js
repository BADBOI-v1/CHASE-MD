const { zokou } = require("../framework/zokou");
const { delay, loading, react } = require("../bdd/utils");

const JavaScriptObfuscator = require("javascript-obfuscator");

zokou(
    {
        nomCom: "encode",
        categorie: "other",
        reaction: "🥸"
    },

    async (dest, zk, commandOptions) => {
        const { ms, arg, reponder } = commandOptions;
        if (!arg[0]) return reponder();

        let obfuscatedText = JavaScriptObfuscator.obfuscate(text, {
            compact: true,
            controlFlowFlattening: true,
            deadCodeInjection: true,
            debugProtection: false,
            debugProtectionInterval: false,
            disableConsoleOutput: true,
            identifierNamesGenerator: "hexadecimal",
            log: false,
            renameGlobals: false,
            rotateStringArray: true,
            selfDefending: true,
            stringArray: true,
            stringArrayEncoding: ["base64"],
            stringArrayThreshold: 0.75,
            transformObjectKeys: true,
            unicodeEscapeSequence: false
        }).getObfuscatedCode();
        
        await reponder(obfuscatedText);
        await react(dest, zk, ms, '👾')
    }
);


