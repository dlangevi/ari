import upath from 'upath';
import sh from 'shelljs';
import renderPug from './render-pug.js';
import fs from 'fs';
import process from 'process';

import {Article} from '../src/server/articles.js';
import mongoose from 'mongoose';
const url = 'mongodb://127.0.0.1:27017/ari?compressors=none&';
mongoose.connect(url);
const db = mongoose.connection;

const srcPath = upath.resolve('./src');


let writings = [];
// Check connection
db.once('open', () => {
  console.log('Connected to MongoDB');

  Article.find({}, function(err, writing) {
    writings = writing;
    sh.find(srcPath).forEach(_processFile);

    process.exit(0)
  });
});

function _processFile(filePath) {
  if ( filePath.match(/\.pug$/) && !filePath.match(/include/) && !filePath.match(/mixin/) && !filePath.match(/\/pug\/layouts\//)) {
    const extras = {};

    if (filePath.match(/writing/)) {
      renderPug(filePath, {
        journals: writings,
      });
    } else if (filePath.match(/index/)) {
      const intro = fs.readFileSync('./content/intro.txt', 'UTF-8', 'r');
      renderPug(filePath, {
        intro: intro,
      });
    } else {
      renderPug(filePath);
    }
  }
}
