const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

// Wix sends RAW body
app.use(express.raw({ type: "*/*" }));

app.post("/v1/calculate-additional-fees", (req, res) => {
  try {
    const token = req.body.toString();

    // Decode Wix JWT payload
    const decoded = jwt.decode(token);

    console.log("Decoded Wix Payload:", decoded);

   res.json({
  additionalFees: [
    {
      code: "service-fee",
      name: "Service Fee",
      taxable: false,
      amount: {
        value: "39.00",
        currency: "USD"
      }
    }
  ]
});



  } catch (err) {
    console.error("Error decoding token:", err);
    res.status(400).send("Error");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Service Fee Server running on port ${PORT}`);
});
