const http = require('http');
const https = require('https');
const url = require('url');

const request = (method, requestUrl, headers = {}, body = null) => {
    return new Promise((resolve, reject) => {
        const parsedUrl = url.parse(requestUrl);
        const options = {
            method,
            hostname: parsedUrl.hostname,
            path: parsedUrl.path,
            port: parsedUrl.port,
            headers,
        };

        const lib = parsedUrl.protocol === 'https:' ? https : http;

        const req = lib.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    body: data,
                });
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        if (body) {
            req.write(body);
        }

        req.end();
    });
};

const get = (url, headers = {}) => {
    return request('GET', url, headers);
};

const post = (url, headers = {}, body) => {
    return request('POST', url, headers, body);
};

const put = (url, headers = {}, body) => {
    return request('PUT', url, headers, body);
};

const del = (url, headers = {}, body) => {
    return request('DELETE', url, headers, body);
};

module.exports = {
    get,
    post,
    put,
    del,
};
