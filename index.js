const {AllureClient} = require("./client");
const {AllureWorker} = require("./worker");

async function reportToAllure(options) {
    try {
        let allureWorker = new AllureWorker();
        allureWorker.checkOptions(options);
        let requestBody = allureWorker.generateAllureRequest(options.resultsFolder);

        const allureClient = new AllureClient(options.host);
        if(options.security){
            await allureClient.login(options.security.username, options.security.password);
        }
        await allureClient.cleanResults(options.project);
        await allureClient.sendResults(options.project, requestBody);
        let report = (await allureClient.generateReport(options.project)).data;
        console.log(report.meta_data.message);
        console.log(report.data.report_url);

        if(options.cleanupFilesAfterUpload) {
            allureWorker.cleanAllureFolder(options.resultsFolder);
        }
    } catch (e) {
        console.error('Reports were not uploaded to Allure due error: ', e.message);
    }
}

module.exports = { reportToAllure };