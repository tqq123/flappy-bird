var express = require('express');

var compression = require('compression')

var app = express()
//开启gzip
app.use(compression())

var router = express.Router();

router.get('/', function (req, res) {

});

app.use(express.static('./',{
  maxAge: 3600000
}));

module.exports = app.listen(3000, function (err) {
  if (err) {
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:3000')
});