const express = require("express");
const app = express();

// 🔥 IMPORTANT: to read JSON body from Wix
app.use(express.json());

// ✅ API Endpoint
app.post("/v1/calculate-additional-fees", (req, res) => {

  console.log("Request received from Wix");
  console.log("Body:", req.body);

  const cartSubtotal =
    req.body?.cart?.totals?.subtotal?.amount || 0;

  const fee = 39; // your service fee

  res.json({
    additionalFees: [
      {
        name: "Service Fee",
        amount: {
          type: "FIXED",
          value: fee,
          currency: "INR"   // ⚠ change if your store currency is different
        }
      }
    ]
  });
});

// 🔥 VERY IMPORTANT FOR RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Service Fee Server running on port ${PORT}`);
});
