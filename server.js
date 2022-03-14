var express = require('express');
var cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

var app = express();

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

app.post(
	'/api/fileanalyse',
	upload.single('upfile'),
	function (req, res, next) {
		const fileName = req.file.originalname;
		const fileType = req.file.mimetype;
		const fileSize = req.file.size;

		res.json({ name: fileName, type: fileType, size: fileSize });
	}
);

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log('Your app is listening on port ' + port);
});
