require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const stripeC = (req, res) => {
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "bdt",
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          res.status(500).json(stripeErr);
        } else {
          res.status(200).json(stripeRes);
        }
      }
    );
  };

module.exports = stripeC;