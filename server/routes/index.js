const router = require("express").Router();
const Logger = require("../lib/logger");

const items = require("./items");

/**
 * @swagger
 * /ping:
 *   tags:
 *    - default
 *    - functional
 *   get:
 *     description: Endpoint for Healthcheck
 *     responses:
 *       200:
 *         description: Returns pong.
 */
router.get("/ping", (req, res) => {
  Logger.info("Requesting ping...");
  res.send("pong").status(200);
});

/**
 * @swagger
 * /pingui:
 *   tags:
 *    - default
 *    - functional
 *   get:
 *     description: Endpoint for Healthcheck, but more fancy...
 *     responses:
 *       200:
 *         description: Returns a pongo fancy response.
 */
router.get("/pingui", (req, res) => {
  Logger.info(
    "If you was waiting to show some ui or something than ping... you're wrong, pongo is about pingui things..."
  );
  res.json({ fancy: "pongo" }).status(200);
});

router.use("/api", items);

module.exports = router;
