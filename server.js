const express = require("express");
const app = express();

// 🔥 IMPORTANT FIX
app.use(express.json({ type: "*/*" }));

app.post("/v1/calculate-additional-fees", (req, res) => {

  console.log("Request received from Wix");
  console.log("Body:", req.body);

  res.json({
    additionalFees: [
      {
        code: "service-fee",
        name: "Service Fee",
        amount: {
          type: "FIXED",
          value: 39
        }
      }
    ]
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Service Fee Server running on port ${PORT}`);
});
