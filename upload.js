var formidable = require('formidable');
var fs = require('fs');  //node.js核心的文件处理模块
let bodyParser = require('body-parser');

exports.upload = function(req, res) {
  var message = '';
  var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = './upload/';     //设置上传目录

    console.log('upload req ====>', req.body)
    let base64str = req.body.file
    let bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    var filePath = form.uploadDir ;
    fs.writeFileSync(filePath + '/a.zip', bitmap);

    res.json({
        success: true
    })
  return false
  form.parse(req, function(err, fields, files) {
    if (err) {
      console.log('err', err);
    }
    console.log('resource', files)
    var filename = files.resource.name;

    // 对文件名进行处理，以应对上传同名文件的情况
    var nameArray = filename.split('.');
    var type = nameArray[nameArray.length-1];
    var name = '';
    for(var i=0; i<nameArray.length-1; i++){
        name = name + nameArray[i];
    }
    var rand = Math.random()*100 + 900;
    var num = parseInt(rand, 10);

    var avatarName = name + num +  '.' + type;
    var filePath = form.uploadDir + avatarName ;
    fs.renameSync(files.resource.path, filePath);  //重命名
    res.json({
      success: true,
      filePath
    })
  });
};
