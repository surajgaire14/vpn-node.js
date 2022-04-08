const static = require("node-static");
const http = require("http");
const fs = require("fs");
const { Client } = require("ssh2");

const file = new static.Server("./public");
const { connection } = require("./db/conn");

connection();
const PORT = process.env.PORT || 5000;

const conn = new Client();

conn
  .on("ready", () => {
    console.log("Client :: ready");
    conn.exec("uptime", (err, stream) => {
      if (err) console.log(err);
      stream
        .on("close", (code, signal) => {
          console.log(
            "Stream :: close :: code: " + code + ", signal: " + signal
          );
          conn.end();
        })
        .on("data", (data) => {
          console.log("STDOUT: " + data);
        })
        .stderr.on("data", (data) => {
          console.log("STDERR: " + data);
        });
    });
  })
  .connect({
    host: "3.110.128.52",
    port: 22,
    username: "ubuntu",
    privateKey: fs.readFileSync("/home/suraj/Downloads/GaireProject.cer"),
  });

http
  .createServer((req, res) => {
    req.addListener("end", () => {
      file.serve(req, res, (err) => {
        if (err) {
          console.log(`Error serving ${req.url} - ${err.message}`);
          res.writeHead(err.status, err.headers).end();
          console.log(err.status, err.headers);
        }
      });
    });
  })
  .listen(PORT, () => {
    console.log(`Server Running => ${PORT}...`);
  });
