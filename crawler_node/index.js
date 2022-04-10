const url = "https://porngifs.com/";
const puppeteer = require("puppeteer");
const https = require("https");
// deepcode ignore HttpToHttps: ignoring es6 format
const fs = require("fs");

const download = (url, destination) =>
  new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    https
      .get(url, (response) => {
        response.pipe(file);

        file.on("finish", () => {
          file.close(resolve(true));
        });
      })
      .on("error", (error) => {
        fs.unlink(destination);

        reject(error.message);
      });
  });

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { timeout: 0 });
  let result;

  const images = await page.evaluate(() =>
    Array.from(document.images, (e) => e.src)
  );
  console.log(images);

  for (let i = 0; i < images.length; i++) {
    result = await download(images[i], `/home/ubuntu/public/image-${i}.png`);

    if (result === true) {
      console.log("Success:", images[i], "has been downloaded successfully.");
    } else {
      console.log("Error:", images[i], "was not downloaded.");
      console.error(result);
    }
  }
  await browser.close();
})();
