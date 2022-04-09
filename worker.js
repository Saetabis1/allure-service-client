const fs = require("fs");

class AllureWorker {
    cleanAllureFolder(resultsDir) {
        const fileNames = fs.readdirSync(resultsDir);
        fileNames.forEach((fileName) => {
            fs.unlinkSync(`${resultsDir}/${fileName}`);
        });
    }

    generateAllureRequest(resultsDir) {
        const fileNames = fs.readdirSync(resultsDir);
        const files = [];
        fileNames.forEach((fileName) => {
            let rawContent = fs.readFileSync(`${resultsDir}/${fileName}`);
            if (rawContent.length !== 0) {
                let json = {
                    file_name: fileName,
                    content_base64: rawContent.toString('base64'),
                };
                files.push(json);
            }
        });
        return { results: files };
    };

    checkOptions(options){
        if (!options.project) throw new InputError('Project not provided');
        if (!options.resultsFolder) throw new InputError('Results Folder not provided');
        if (!options.host) throw new InputError('Host not provided');

        if (options.security){
            if (!options.security.username) throw new InputError('Security enabled but username not provided');
            if (!options.security.password) throw new InputError('Security enabled but password not provided');
        }
    }
}

class InputError extends Error {
    constructor(message) {
        super(message);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InputError);
        }
        this.name = 'InputError';
    }
}

module.exports = {AllureWorker};