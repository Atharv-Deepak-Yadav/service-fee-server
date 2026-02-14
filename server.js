const express = require("express");
const app = express();

// 🔥 IMPORTANT: Use RAW body (Wix sends raw payload)
app.use(express.raw({ type: "*/*" }));

app.post("/v1/calculate-additional-fees", (req, res) => {
  try {
    // Convert raw body to JSON
    const body = JSON.parse(req.body.toString());

    console.log("Parsed body from Wix:", body);

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

  } catch (error) {
    console.error("Error parsing body:", error);

    res.status(400).json({
      error: "Invalid JSON"
    });
  }
});

// 🔥 Required for Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Service Fee Server running on port ${PORT}`);
});
