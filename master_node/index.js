require('dotenv').config();
const cluster = require("cluster");
// file deepcode ignore HttpToHttps: HttpToHttps in Production
const http = require("http");
const numCPUs = require("os").cpus().length;
const process = require("process");

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) cluster.fork();

  cluster.on("exit", worker =>
    console.log(`worker ${worker.process.pid} died`)
  );
} else {
  http.createServer(require("./app")).listen(process.env.PORT || 8000, err => {
    if (err) throw err;
    console.log(`Server Running => ${process.env.PORT || 8000}`);
  });

  console.log(`Worker ${process.pid} started`);
}
