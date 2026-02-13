const express = require("express");

const app = express();
app.use(express.json());

// 🔹 Change these values later (for now hardcoded test)
let settings = {
  enabled: true,
  fixed: 39,
  percent: 0
};

// 🔹 Wix will call this endpoint during checkout
app.post("/v1/calculate-additional-fees", (req, res) => {
  
  if (!settings.enabled) {
    return res.json({ fees: [] });
  }

  const cartSubtotal =
    req.body?.cart?.totals?.subtotal?.amount || 0;

  const percentAmount = (cartSubtotal * settings.percent) / 100;
  const totalFee = Math.round(settings.fixed + percentAmount);

  if (totalFee <= 0) {
    return res.json({ fees: [] });
  }

  res.json({
    fees: [
      {
        name: "Service Fee",
        amount: {
          type: "FIXED",
          value: totalFee,
          currency: "INR"
        }
      }
    ]
  });
});

// 🔹 Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Service Fee Server running on port " + PORT);
});
