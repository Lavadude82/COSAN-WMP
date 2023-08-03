//Setting up variables
const fs = require("fs");
const conf = require("../conf/config.json");
const express = require("express");
const app = express();
const electron = require("electron");

//Starting Application
console.log("Starting App...");
function GetMedia(config) {
  let filesInPath = [];
  config.paths.forEach((e, i) => {
    let files;
    if (e.startsWith("/")) {
      try {
        files = fs.readdirSync(e);
      } catch (err) {
        console.log(`error : specified path "${e}" not found!`);
      }
    } else {
      try {
        files = fs.readdirSync(__dirname + "/../" + e);
      } catch (err) {
        console.log(
          `error : specified path "${
            __dirname.substring(0, __dirname.lastIndexOf("/")) + "/" + e
          }" not found!`
        );
      }
    }
    filesInPath.push(files);
  });
  filesInPath.forEach((e1, i1) => {
    e1.forEach((e2, i2) => {
      let isFormat = false;
      config.formats.forEach((e3, i3) => {
        if (e2.endsWith(e3)) {
          isFormat = true;
        }
      });
      if (!isFormat) {
        filesInPath[i1].splice(i2, 1);
      }
    });
  });
  let tmp = filesInPath;
  tmp.forEach((e, i) => {
    let f = e;
    filesInPath[i] = { files: f, dir: config.paths[i] };
  });
  let f = filesInPath;
  let files = [];
  f.forEach((e1, i1) => {
    e1.files.forEach((e2, i2) => {
      let file = e1.dir + "/" + e2;
      files.push({
        dir: file,
        size: fs.statSync(file).size,
        name: file.substring(file.lastIndexOf("/") + 1, file.lastIndexOf(".")),
        extension: file
          .substring(file.lastIndexOf(".") + 1, file.length)
          .toUpperCase(),
      });
    });
  });
  return files;
}

app.post("/getMedia", (req, res) => {});
let a = GetMedia(conf);
console.log(a);
