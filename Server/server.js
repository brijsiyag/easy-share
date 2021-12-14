const express = require("express");
const multer = require("multer");
const fs = require("fs");
const app = express();
const cors = require("cors");
const path = require("path");
const _ = require("lodash");
require("dotenv").config();
app.use(
  cors({
    origin: `http://${process.env.ipv4}:3000`,
    allowedHeaders: true,
    AccessControlAllowOrigin: "*",
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `${process.env.UPLOAD_PATH}/${_.join(
      new Date().toLocaleDateString().split("/"),
      "-"
    )}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

app.get("/api/dirdata/:dir?", async (req, res) => {
  if (req.params.dir === undefined) {
    req.params.dir = "";
  }
  const filesArr = await new Promise(async (resolve) => {
    var filesArr = [];
    try {
      const arr = fs.readdirSync(
        `${process.env.UPLOAD_PATH}/${req.params.dir}`
      );
      arr.forEach((element) => {
        if (element !== ".DS_Store") {
          const item = {};
          const stats = fs.statSync(
            `${process.env.UPLOAD_PATH}/${req.params.dir}/${element}`
          );
          item.value = element;
          item.stats = stats;
          item.dir = req.params.dir;
          item.isDir = stats.isDirectory();
          filesArr.push(item);
        }
      });
      resolve(filesArr);
    } catch (err) {
      console.log(err);
      resolve([]);
    }
  });
  res.send(filesArr);
});

app.post(
  "/api/file-upload",
  upload.array("uploaded_file"),
  function (req, res) {
    res.send(true);
  }
);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT, process.env.ipv4, () => {
  console.log("Server is listening on PORT 9853...");
});
