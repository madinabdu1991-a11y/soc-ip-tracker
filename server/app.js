import express from "express";
import fs from "fs";

const app = express();
app.set("trust proxy", true);

app.all("/track", (req, res) => {
  const ip =
    req.headers["cf-connecting-ip"] ||
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  const log = {
    time: new Date().toISOString(),
    ip,
    method: req.method,
    uri: req.originalUrl,
    ua: req.headers["user-agent"]
  };

  fs.appendFileSync("access.log", JSON.stringify(log) + "\n");
  res.status(204).end();
});

app.listen(3000, () => {
  console.log("SOC tracker running on port 3000");
});
