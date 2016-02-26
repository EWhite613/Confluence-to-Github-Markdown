var fs = require('fs')
var child_process = require('child_process')
var exec = require('sync-exec')
var path = require('path');

var divePath = "Confluence-space-export";
var attachmentsExportPath = "public/assets/images/"
var markdownImageReference = "assets/images/"
// print process.argv
process.argv.forEach(function (val, index, array) {
  if (index === 2){
    divePath = val;
  }else if (index === 3){
    attachmentsExportPath = val
  }else if(index === 4){
    markdownImageReference = val
  }
});

dive(divePath)

function dive(dir) {
  var list = []
  var stat = ""
    // Read the directory
  list = fs.readdirSync(dir);
  list.forEach(function (file) {
    // Full path of that file
    var path = dir + "/" + file

    // Get the file's stats
    stat = fs.statSync(path)

    // If the file is a directory
    if (stat && stat.isDirectory()) {
      dive(path);
    } else {
      if (file.endsWith('.html')) {
        var titleRegex = /<title>(?:Blue Planet : |)([a-z|\s|\(|\)]+)+<\/title>/i
        var content = fs.readFileSync(path, 'utf8')
        var match = content.match(titleRegex)
        if (match != null && match.length > 1) {
          //          console.log(match[1])
          var outputFile = "Markdown/" + match[1].replace(/ /g, "-").replace(/[(|)]/g, "") + ".md"
          var out = exec("pandoc -f html -t markdown_github -o " + outputFile + " " + path)
            //images
            //          console.log("Reading : " + outputFile)
          var content = fs.readFileSync(outputFile, 'utf8')
            //          console.log("Done Reading")
          var matches = uniq(content.match(/(<img src=")([a-z||_|0-9|.|]+)\/([a-z||_|0-9|.|]+)\/([a-z||_|0-9|.|]+)/ig))
          matches.forEach(function (img) {
            img = img.replace('<img src="', '')
            var attachments = img.replace("attachments/", "");
            if (attachments == img) {
              return;
            }
            var fileName = attachmentsExportPath + attachments;
            //            console.log("Creating Folder : " + fileName.substr(0, fileName.lastIndexOf('/')))
            mkdirpSync(fileName.substr(0, fileName.lastIndexOf('/')))
              //            console.log("creating filename: " + fileName)
              //            fs.createReadStream(img).pipe(fs.createWriteStream(fileName));
            try {
//              var img_content = fs.readFileSync(dir + "/" + img);
//              fs.writeFileSync(fileName, img);
              fs.accessSync(dir + "/" + img, fs.F_OK);
              fs.createReadStream(dir + "/" + img).pipe(fs.createWriteStream(fileName));
              console.log("Wrote: " + dir + "/" + img + "\n To: " + fileName)
            } catch (e) {
              console.log("Can't read: " + dir + "/" + img)
            }
          })
          var lines = content.replace(/(<img src=")([a-z||_|0-9|.|]+)\/([a-z||_|0-9|.|]+)\/([a-z||_|0-9|.|]+)/ig, "$"+ markdownImageReference +"$3/$4")

          fs.writeFileSync(outputFile, lines)
        }
      }


    }
  })
}

function uniq(a) {
  return Array.from(new Set(a));
}

function mkdirSync(path) {
  try {
    fs.mkdirSync(path);
  } catch (e) {
    if (e.code != 'EEXIST') throw e;
  }
}

function mkdirpSync(dirpath) {
//  console.log("Making : " + dirpath)
  var parts = dirpath.split(path.sep);
  for (var i = 1; i <= parts.length; i++) {
    mkdirSync(path.join.apply(null, parts.slice(0, i)));
  }
}
