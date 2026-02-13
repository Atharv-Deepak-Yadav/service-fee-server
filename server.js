app.post("/v1/calculate-additional-fees", (req, res) => {

  const subtotal =
    req.body?.cart?.totals?.subtotal?.amount || 0;

  const fixed = 39; // test fixed amount
  const percent = 0;

  const percentAmount = (subtotal * percent) / 100;
  const totalFee = Math.round(fixed + percentAmount);

  if (totalFee <= 0) {
    return res.json({ additionalFees: [] });
  }

  return res.json({
    additionalFees: [
      {
        name: "Service Fee",
        amount: {
          type: "FIXED",
          value: totalFee,
          currency: "USD"
        }
      }
    ]
  });
});
