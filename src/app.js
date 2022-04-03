import express from 'express';
import upath from 'upath';
import fs from 'fs';
import mongoose from 'mongoose';
import {Article} from './server/articles.js';

// const url = 'mongodb://localhost/ari';
// const client = new MongoClient(url);
const url = 'mongodb://127.0.0.1:27017/ari?compressors=none&';
mongoose.connect(url);
const db = mongoose.connection;

// Check connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});


db.on('error', (err) => {
  console.log(err);
});


const app = express();

app.set('views', upath.resolve('./src/pug/pages'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  const intro = fs.readFileSync('./content/intro.txt', 'UTF-8', 'r');
  res.render('index', {
    intro: intro,
  });
});

app.get('/index.html', (req, res) => {
  const intro = fs.readFileSync('./content/intro.txt', 'UTF-8', 'r');
  res.render('index', {
    intro: intro,
  });
});

app.get('/writing.html', (req, res) => {
  Article.find({}, function(err, writing) {
    res.render('writing', {
      journals: writing,
    });
  });
});


app.use(express.static('dist/'));


app.listen(3000, () => {
  console.log('Server started on port 3000');
});
