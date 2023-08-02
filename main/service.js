const fs = require("fs");
const config = require("../conf/config.json");
config.paths.forEach((e, i) => {
  let files;
  if (e.startsWith("/")) {
    try {
      files = fs.readdirSync(e);
    } catch (err) {
      console.log(
        `error : specified path "${e}" not found\nThis will NOT STOP the program!`
      );
    }
  } else {
    try {
      files = fs.readdirSync(__dirname + "/../" + e);
    } catch (err) {
      console.log(
        `error : specified path "${
          __dirname.substring(0, __dirname.lastIndexOf("/")) + "/" + e
        }" not found\nThis will NOT STOP the program!`
      );
    }
  }
});
