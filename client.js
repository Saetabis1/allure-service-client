const axios = require('axios').default;

class AllureClient {
  constructor(host) {
    axios.defaults.baseURL = host;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['accept'] = '*/*';
    axios.defaults.maxContentLength = Infinity;
    axios.defaults.maxBodyLength = Infinity;
  }

  async login(username, password) {
    let rawCookies = (await axios.post(`/login`, { username, password })).headers['set-cookie'];

    let csrfToken = rawCookies
      .find((cookie) => cookie.includes('csrf_access_token'))
      .replace('csrf_access_token=', '')
      .replace('; Path=/', '');

    let cookies = [];
    rawCookies.forEach((rawCookie) => cookies.push(rawCookie.replace('Path=/', '')));

    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;
    axios.defaults.headers.common['Cookie'] = cookies.join();
  }

  async sendResults(projectName, requestBody) {
    return await axios.post(`/send-results?project_id=${projectName}`, requestBody);
  }

  async generateReport(projectName) {
    return await axios.get(`/generate-report?project_id=${projectName}`);
  }

  async cleanResults(projectName) {
    await axios.get(`/clean-results?project_id=${projectName}`);
  }
}

module.exports = {AllureClient}