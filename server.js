let path = require('path');
let express = require("express");
let bodyParser = require('body-parser');
let router = express.Router();
let http = require('http')
let app = express();
let request = require("request");
let axios = require('axios')
let fs = require('fs');
let formData = require('form-data');
let fileUpload = require('../post-server/upload.js')
const cors = require('cors')

app.use(cors())
// 解析 application/json
app.use(bodyParser.json({limit: '50mb'}));
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// 文件上传
router.post('/upload', fileUpload.upload)
router.get('/',function (req,res){
    res.sendFile(path.join(__dirname, '/index.html'))
});
app.use(router)// 启动一个端口号为9009的服务器
const port = 7000
app.listen(port, function afterListen(){
  console.log(`请访问http://127.0.0.1:${port}`)
});