const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 15023;

let currentStatus = "unknown"; // LED 상태 저장

app.use(cors());
app.use(bodyParser.json());

// 상태 업데이트용 POST API
app.post("/status", (req, res) => {
  const { status } = req.body;
  if (status === "on" || status === "off") {
    currentStatus = status;
    console.log(`LED 상태 변경됨: ${status}`);
    res.send({ success: true, status });
  } else {
    res.status(400).send({ success: false, message: "올바른 상태가 아닙니다." });
  }
});

// 상태 확인용 GET API
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>전구 상태</title></head>
      <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
        <h1>현재 전구 상태: <span style="color: ${currentStatus === "on" ? "green" : "red"}">${currentStatus.toUpperCase()}</span></h1>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://116.124.191.174:${port}`);
});
