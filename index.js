var findInFiles = require("find-in-files");
var readline = require("readline-sync");
const fs = require('async-file');

var folder = readline.question("masukan lokasi folder, example ./email : ");
var extensi = readline.question(
  "masukan extensi file, example .csv, .txt dll : "
);
var fileName = readline.question(
  "masukan nama file untuk menyimpan email, example email.txt : "
);

console.log('\n')
console.log('wait untill all process done....')
console.log('\n')

var total = [];
var all = 0;
findInFiles
  .find(
    /[.-\w]+@[\w\-]{3,}(.\w{2,})+/,
    folder,
    extensi + "$"
  )
  .then(async function (results) {
    for (var result in results) {
      var res = results[result];
      await total.push(res.count);
      await fs.appendFile(fileName, `${res.matches}\n`, 'utf-8');
    }
    for (var i = 0; i < total.length; i++) {
      all += total[i];
    }
    console.log("email saved to : " + fileName);
    console.log("total line : " + all);
  });
