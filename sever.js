var url = require('url'),
    http = require('http'),
    fs = require('fs'),
    path = require('path'),
    nodemailer = require('nodemailer');

var mailConfige = {
    service: 'smtp.163.com',
    secureConnection: true, // use SSL
    port: 465,
    // port for secure SMTP
    auth: {
        user: 'chirsen@163.com',
        pass: 'pass'
    }
};


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(mailConfige);


var server = http.createServer(function(req, res) {
    var pathName = url.parse(req.url).pathname;

    if (pathName == "/") {
        fs.readFile(path.join("./", "index.html"), "utf-8", function(err, file) {
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
            html: '<img src="' + baseImg + '">' // html body
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

server.listen("8080", "127.0.0.1");
