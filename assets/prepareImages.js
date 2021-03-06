// prepareImages.js
const fs = require("fs");
const files = fs.readdirSync("./assets/images").filter((x) => x.includes("png"));
const ex = "{\n" + files.map((x) => `"${x.split(".png")[0]}": require("./${x}"),`).join("\n") + "}";
const res = "export default " + ex;
fs.writeFileSync("./assets/images/images.js", res);

// Add to package.json
//"ios": "node ./assets/prepareImages.js && expo start --ios",
