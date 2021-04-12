const router = require("express").Router();

/**
 * @swagger
 * /ping:
 *   get:
 *     description: Endpoint for Healthcheck
 *     responses:
 *       200:
 *         description: Returns pong.
 */
router.get("/ping", (req, res) => {
  res.send("pong").status(200);
});

/**
 * @swagger
 * /pingui:
 *   get:
 *     description: Endpoint for Healthcheck, but more fancy...
 *     responses:
 *       200:
 *         description: Returns a pongo fancy response.
 */
router.get("/pingui", (req, res) => {
  console.log(
    "If you was waiting to show some ui or something than ping... you're wrong, pongo is about pingui things..."
  );
  res.json({ fancy: "pongo" }).status(200);
});

module.exports = router;
