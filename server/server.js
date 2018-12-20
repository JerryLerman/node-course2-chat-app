const path = require('path'); // Don't have to install
const express = require('express');
const bodyParser = require('body-parser');

//Instead of -dirname + '/../public'
// This results in \public instead of server\..\public
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
app.use(express.static(publicPath)); // Default HTML directory

//index.html is default so don't need to do this
// app.get('/', (req,res) => {
//   return res.status(200).sendFile("index.html", {root: publicPath});
// });

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
