const router = require("express").Router();
const Logger = require("../lib/logger");
const axios = require("axios");
const createHttpError = require("http-errors");

/**
 *
 * @swagger
 * /api/items:
 *    method:
 *      tags:
 *        - items
 *        - shopping
 *      summary: "GET"
 *      produces: [application/json]
 *      parameters:
 *        - name: "q"
 *          description: "Keyword to search in the api"
 *          in: query
 *          required: true
 *          type: string
 *          example: "cubo rubik"
 *      responses:
 *        200:
 *          description: "Devuelve una lista de objetos"
 *          schema:
 *            $ref: #/components/schemas/Items
 *        502:
 *          description: "Service goes trough 502 error when the resource was not founded from the external api."
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                description: "Error description"
 *                type: string
 *                example: "Bad gateway"
 *              code:
 *                description: "HTTP Error code"
 *                type: number
 *                example: 502
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
    res
      .json({ error: httpError.message, code: httpError.statusCode })
      .status(502);
  }
});

router.get("/item/:id", async (req, res, next) => {
  const itemId = req.params.id;
  try {
    Logger.info(`Fetching item with id: ${itemId}`);
    const itemResponse = await axios.get(
      `https://api.mercadolibre.com/items/${itemId}`
    );
    Logger.info(`Fetching item description with id: ${itemId}`);
    const itemDescriptionResponse = await axios.get(
      `https://api.mercadolibre.com/items/${itemId}/description`
    );
    Logger.info(
      `Item with id ${itemId} retrieved, title: ${itemResponse.data.title}`
    );
    Logger.info(
      `Item description with id ${itemId} retrieved: ${itemDescriptionResponse.data.plain_text}`
    );
    const {
      id,
      title,
      price,
      picture,
      condition,
      free_shipping,
      sold_quantity,
    } = itemResponse.data;
    const { plain_text } = itemDescriptionResponse.data;
    res
      .json({
        author: { name: "Facundo", lastname: "Palombo" },
        item: {
          id,
          title,
          price,
          picture,
          condition,
          free_shipping,
          sold_quantity,
          description: plain_text,
        },
      })
      .status(200);
  } catch (error) {
    Logger.error(
      `Service got an error. Item with itemId "${itemId}" could not be finded.`
    );
    Logger.error(error);
    const httpError = createHttpError(502);
    res
      .json({ error: httpError.message, code: httpError.statusCode })
      .status(502);
  }
});

module.exports = router;
