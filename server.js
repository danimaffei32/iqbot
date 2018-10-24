var path = require('path');
var express = require('express')
var app = express()
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var sizeOf = require('image-size');
var multer = require('multer');
var uploadedFileName = '';
var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'public/');
  },
  filename: function(req, file, cb){
  	uploadedFileName = Date.now() + '.' + file.originalname;
    cb(null, uploadedFileName);
  }
})
var upload = multer({ storage: storage });

app.post('/', upload.single('upload'), (req, res, next) => {
	//console.log(uploadedFileName);

	var dimensions = sizeOf('public/' + uploadedFileName);
	//console.log(dimensions.width, dimensions.height);	
	
	var qrtxt = encodeURI( req.body.txt);

	res.redirect('./qr.html?pic1=' + uploadedFileName + '&pic2=' + qrtxt + '&width=' + dimensions.width + '&height=' + dimensions.height);
})

app.listen(3000,() => {
  console.log("Server running on http://localhost:3000");
});