const router = require("express").Router();
const Logger = require("../lib/logger");
const axios = require("axios");
const createHttpError = require("http-errors");

/**
 * @swagger
 *
 * /api/items:
 *     method:
 *       tags: 
          - items 
          - shopping
 *       summary: "GET"
 *       produces: [application/json]
 *       parameters:
 *         - name: "q"
 *           description: "Keyword to search in the api"
 *           in: query
 *           required: true
 *           type: string
 *           example: "cubo rubik"
 *       responses:
 *         200:
 *           description: "Devuelve una lista de objetos"
 *           schema:
 *             type: object
 *             properties:
 *               author:
 *                 description: "Who did this api"
 *                 type: object
 *                 example: false
 *               categories:
 *                 description: "Categories trees related from those items"
 *                 type: array
 *                   items:
 *                     type: string
 *                 example: true
 *               items:
 *                 description: "Items retrieved"
 *                 type: boolean
 *                 example: false
 *         502:
 *           description: "Service goes trough 502 error when the resource was not founded from the external api."
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 description: "Error description"
 *                 type: string
 *                 example: "Bad gateway"
 *               code:
 *                 description: "HTTP Error code"
 *                 type: number
 *                 example: 502
 */
router.get("/items", async (req, res, next) => {
  const query = req.query.q;
  try {
    Logger.info(`Fetching meli api with query ${query}`);
    const response = await axios.get(
      "https://api.mercadolibre.com/sites/MLA/search",
      { params: { q: query } }
    );
    Logger.info(`Items received with query ${query}`);
    Logger.info(
      `Result ids received: ${response.data.results.map((result) => result.id)}`
    );
    const { results } = response.data;
    res
      .json({
        author: {
          name: "Facundo",
          lastname: "Palombo",
        },
        categories: results.map((item) => item.category_id),
        items: results,
      })
      .status(200);
  } catch (error) {
    Logger.error(
      `Service got an error. Items with query "${query}" could not be finded.`
    );
    Logger.error(error);
    const httpError = createHttpError(502);
    res.json({ error: httpError.message, code: httpError.statusCode });
  }
});

module.exports = router;
