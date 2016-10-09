var url = require('url'),
    http = require('http'),
    fs = require('fs'),
    path = require('path'),
    nodemailer = require('nodemailer');

var smtpConfig = {
    host: 'smtp.163.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'chirsen@163.com',
        pass: 'pass'
    }
};


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpConfig);


var server = http.createServer(function(req, res) {
    var pathName = url.parse(req.url).pathname;

    if (pathName == "/") {
        fs.readFile(path.join("./", "index.html"), "utf-8", function(err, file) {
            var base64 = fs.readFileSync("change.txt", "utf-8");
            var mailOptions = {
                from: 'chirsen@163.com', // sender address
                to: '1020269294@qq.com', // list of receivers
                subject: 'Hello ✔', // Subject line
                html: '<img src="' + base64 + '">' // html body
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });
            if (err) {
                res.writeHead(404);
                res.end('找不到文件');
                return;
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(file);
        });
    } else if (pathName.substring(0, 5) == "/url(") {
        /*得到base64格式的图片*/
        var baseImg = pathName.substring(5, pathName.length - 1);
        // fs.writeFileSync("change.txt", pathName.substring(5, pathName.length - 1));
        var mailOptions = {
            from: 'chirsen@163.com', // sender address
            to: '1020269294@qq.com', // list of receivers
            subject: '防盗', // Subject line
            text: '房间有人闯入', // plaintext body
            html: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAOCAYAAAHGeQvGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAzZJREFUeNpi/HiElwEJRADxCgYcgAmNj67wOJTWAKkFCCBGNJNxgSAmJJ3SUIxsGgysAwggZBPfAbEQkqQIEL9B4n8AYgE0A9D1eALxdpifXqBJToUaOANJDGTgcyQ+up5NIAOB2AQggIj1OxzwWX9i+HSUD68aJiSvIQMxKEb3KgNacCADF3RDBdACvBqIK9GiVgjNEHQ9qkD8BMRgQRJUQGIfAOL/SHxFHD5F1nMOiJeAGAABhB6msUDMDMQL8AQZyDJGPPIYZmCJB2Ls+QtVAw9SUAj8A+I0ID4DxCeg7H9IodMBxIuh4oxQejFUnIFIM4hRMxGIp0HFmaH0PSA2Ayn4A3UwKKnPg2pIQsvqFUDMCo2Wn0CsBcTzgfg3VJ4YM4hRkw9NyBxA/B6I24BYCSQBEECMpBRSRAJizCCkhgka0nCA7lCS0x8ZaZgYNaDobwHiZ9gcKgb1Bcg3r3AY8AGqRgiHPDFmEKPmFBD/AmIb5CCGZZQAaPoJwJNRLIHYCk9mw2UGMWpYkezxhYZoFhA/hDmiAlp7lUE1aELFnqJlAlChOQsqNh9LZsNnBjFqfkPNvAW1Zw8Q1wOxPHLhDIqCKUg5GluUgEr0LiQ2OiDGDGLUgGrvLdDMJoxeNU0AYh0gZgdiXSCejMWAP9DQKEMqlpABMWYQo+YlEPsA8WpoMgADgADDV9vzQtMHqOz8RGZRRTcziGiFUMMtDkDcBMR2xLYzkcEqIN4HjQFywWAxgxrmgKqPldAmSD4uRSzQusYGTRxUILwF4mhoSbcTiB+gqTkGxAuR6qvBYAa1zEkEYgs0eWNomTcJ2tjXQavkQeVYJ3KWd4eW4tOBuBVNMRO0ZM4B4mRo7wAbGDAzsGR5arglDNqDKoOahQwkgHg5NCCjoRGGkuVBsSYFbftlQ8X4oXQmEKtD5bfjyRaDxQxqmQMqJkSBOAWI3aBisMbYGiBuB2IPWGBiK0NdoI2WbGg1KwONhVwg9gJiVyLKmsFiBrXMAQWmLLQ4aAZiZSC+DMTc0E4KI3oZihy4IAvU0LrakUgxUw7Ee9E7CIPQDGqZwwlN4aDU/B1JXBdKW0LL7EUwCQBc6CdG5nvqLQAAAABJRU5ErkJggg==">' // html body
        };
        console.log(baseImg + "\n\n\n");


        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });

        res.writeHead(200);
        res.end();

    } else if (pathName == "/viewData") {
        fs.readFile("change.txt", "utf-8", function(err, file) {
            if (err) {
                res.writeHead(404);
                res.end('状态未更新');
                return;
            } else {
                res.writeHead(200, { "Content-Type": "text/plain", "Access-Control-Allow-Origin": "*" });
                res.end(file);
            }
        });
    } else if (pathName == "/view") {
        fs.readFile("./view.html", "utf-8", function(err, file) {
            if (err) {
                res.writeHead(404);
                res.end('找不到文件');
                return;
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(file);
        });
    }

});

server.listen("8081", "127.0.0.1");