
# Allure Service Client
This is a 2 classes package that allows you to easily connect to an allure server, it was designed and tested with the  [allure-service-docker](https://github.com/fescobar/allure-docker-service)

## Installation
    - npm install allure-service-client

## Usage
Package contains only one public method reportToAllure(options) where the options are
 - `project`: Name of the allure server project where you are pushing the results
 - `resultsFolder`: Path to the folder where the testsresults are stored after execution
 - `cleanupFilesAfterUpload`: Setting this true will delete all the test results in the folder after uploading them
 - `host`: url to your allure docker service
 - `security`: optional parameter if your service has security, do not pass it if your allure instance do not have security

```
const {reportToAllure} = require("allure-service-client");

let resultsDir = resolve(__dirname, './allure-results');
let options = {
    project: 'postman-poc',
    resultsFolder: resultsDir,
    cleanupFilesAfterUpload: false,
    host: 'http://localhost:5050/allure-docker-service',
    security: {
        username: 'username',
        password: 'password'
    }
}
await reportToAllure(options);
```