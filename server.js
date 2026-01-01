const express = require('express');
const runBot = require('./bot');

const app = express();
app.use(express.json());

app.post('/submit', async (req, res) => {
  const { playerId, product, voucherCode } = req.body;

  try {
    await runBot(playerId, product, voucherCode);
    res.json({ status: "SUCCESS" });
  } catch (e) {
    res.json({ status: "FAILED", error: e.message });
  }
});

app.listen(process.env.PORT || 3000);
