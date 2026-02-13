app.post("/v1/calculate-additional-fees", (req, res) => {

  const cartSubtotal =
    req.body?.cart?.totals?.subtotal?.amount || 0;

  const fee = 39; // fixed fee

  res.json({
    additionalFees: [
      {
        name: "Service Fee",
        amount: {
          type: "FIXED",
          value: fee,
          currency: "USD"
        }
      }
    ]
  });
});
