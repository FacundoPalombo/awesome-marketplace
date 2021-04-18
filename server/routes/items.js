const router = require("express").Router();
const Logger = require("../lib/logger");
const axios = require("axios");
const createHttpError = require("http-errors");
const {
  API_MELI_SEARCH,
  API_MELI_FIND_ITEMS,
} = require("../utils/constants/externalApis");

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

    const response = await axios.get(API_MELI_SEARCH, { params: { q: query } });

    Logger.info(`Items received with query ${query}`);
    Logger.info(
      `Result ids received: ${response.data.results.map((result) => result.id)}`
    );

    const { results, filters } = response.data;
    const categories = filters.filter(({ id }) => id === "category")[0]
      ?.values[0]?.path_from_root;

    if (!categories) {
      throw new Error("404 - Those items doesn't have categories to show");
    } else {
      res.status(200).json({
        author: {
          name: "Facundo",
          lastname: "Palombo",
        },
        categories,
        items: results.slice(0, 5),
      });
    }
  } catch (error) {
    Logger.error(
      `Service got an error. Items with query "${query}" could not be finded.`
    );
    Logger.error(error);
    const httpError = createHttpError(502);
    res
      .status(502)
      .json({ error: httpError.message, code: httpError.statusCode });
    return next(error);
  }
});

router.get("/item/:id", async (req, res, next) => {
  const itemId = req.params.id;
  try {
    Logger.info(`Fetching item with id: ${itemId}`);
    const itemResponse = await axios.get(`${API_MELI_FIND_ITEMS}${itemId}`);
    Logger.info(`Fetching item description with id: ${itemId}`);
    const itemDescriptionResponse = await axios.get(
      `${API_MELI_FIND_ITEMS}${itemId}/description`
    );

    if (itemResponse.status !== 200 || itemDescriptionResponse.status !== 200) {
      throw new Error("502 - One of the resources could not be loaded");
    } else {
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

      res.status(200).json({
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
      });
    }
  } catch (error) {
    Logger.error(
      `Service got an error. Item with itemId "${itemId}" could not be finded.`
    );
    Logger.error(error);

    const httpError = createHttpError(502);
    res
      .json({ error: httpError.message, code: httpError.statusCode })
      .status(httpError.statusCode);
  }
});

module.exports = router;
