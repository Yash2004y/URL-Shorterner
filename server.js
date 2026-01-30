import http from 'http';
import dotenv from 'dotenv';
import { getFileContent, getFileContentType } from './Utils/FileHelper.js';
import querystring from 'querystring';
import { addOrUpdate, getByKey, getData, isValidJson } from './db/db.js';
import slugify from 'slugify';
dotenv.config();
http.ServerResponse.prototype.sentResponse = function (object, statusCode = 200) {
    this.statusCode = statusCode;
    this.setHeader("Content-Type", "application/json");
    this.end(JSON.stringify(object));
}
const server = http.createServer(async (req, res) => {
    console.log(req.url);
    try {
        if (req.url == "/") {
            let file = "public/index.html";
            res.setHeader('Content-Type', getFileContentType(file));
            res.end(getFileContent(file));
        }
        else if (req.method === "POST" && req.url === "/store") {
            let data = '';
            req.on("data", (chunk) => {
                data += chunk;
            })
            req.on('end', async () => {
                let { url, key } = isValidJson(data) ? JSON.parse(data) : {};
                key = slugify(key, {
                    lower: true,      // lowercase
                    strict: true,     // remove special chars
                    trim: true
                });
                let notAllowKey = ['key', 'store', 'getLinks', 'index.css'];
                if (notAllowKey.includes(key)) {
                    res.sentResponse({ status: false, message: "This key not allowed." });
                } else {

                    await addOrUpdate({ url, key });

                    res.sentResponse({ status: true, message: "Your url added." });
                }
                // res.statusCode = 200;
                // res.setHeader("Content-Type", "application/json");
                // res.end(JSON.stringify({ status: true, message: "Your url added." }));
            })

        }
        else if (req.method === "GET" && req.url === "/getLinks") {
            let data = await getData();
            const APP_URL = process?.env?.APP_URL;
            console.log(data);
            data = data.map((item) => {
                return {
                    oldUrl: item.url,
                    key: item.key,
                    newUrl: `${APP_URL}${item.key}`

                }
            })
            res.sentResponse({ status: true, message: "Your url list.", data });
        }
        else {

            const key = req.url?.split("/")[1] ?? null;
            const urlDetail = await getByKey(key);
            if (urlDetail) {
                res.statusCode = 301;
                res.setHeader('location', urlDetail?.url ?? '/');
                res.end();

            } else {
                res.statusCode = 404;
                res.end("404 Not Found");
            }
        }
    }
    catch (e) {
        console.log(e);
        res.sentResponse({ status: false, message: e.message });

    }
});
const PORT = process.env?.PORT ?? 3000;
server.listen(PORT, () => {
    console.log("Server running on port", PORT);
})

