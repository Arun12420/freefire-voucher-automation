const express = require('express');
const runBot = require('./bot');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Free Fire Automation Server is Running ✅');
});

app.post('/submit', async (req, res) => {
  const { playerId, product, voucherCode } = req.body;

  try {
    await runBot(playerId, product, voucherCode);
    res.json({ status: "SUCCESS" });
  } catch (e) {
    res.status(500).json({ status: "FAILED", error: e.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running');
});
