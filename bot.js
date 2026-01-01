const { chromium } = require('playwright');

async function runBot(playerId, product, voucherCode) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://shop.garena.my/?app=100067&channel=202953');

  await page.fill('input[name="player_id"]', playerId);
  await page.click('button:has-text("Login")');

  await page.waitForTimeout(2000);

  await page.click(`text=${product}`);
  await page.click('text=Proceed to Payment');

  await page.click('text=Physical Vouchers');

  if (voucherCode.startsWith("BDMB")) {
    await page.click('text=UniPin Voucher');
  } else if (voucherCode.startsWith("UPBD")) {
    await page.click('text=UP Gift Card');
  }

  await page.fill('input[name="voucher_code"]', voucherCode);
  await page.click('button:has-text("Confirm")');

  await browser.close();
}

module.exports = runBot;
