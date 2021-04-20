const router = require("express").Router();
const Logger = require("../lib/logger");
const axios = require("axios");
const createHttpError = require("http-errors");
const {
  API_MELI_SEARCH,
  API_MELI_FIND_ITEMS,
  API_MELI_CATEGORIES_PREDICTOR,
  API_MELI_SEARCH_CATEGORY,
} = require("../utils/constants/externalApis");

// Acá me quedo una duda, la firma de categorias se arma con el predictor de categorias? O con lo que viene en la firma de filters?
// https://api.mercadolibre.com/sites/MLA/domain_discovery/search?q=$category

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Retrieve a list of items from mercadolibre arg
 *     description: Retrieve a full list of items from mercadolibre arg.
 *     parameters:
 *     - in: q
 *       name: query
 *       schema:
 *         type: string
 *         required: true
 *         description: The items related to search in the api.
 *         example: Iphone X
 *     responses:
 *       "200":
 *         description: A list of items
 *         content:
 *           application/json:
 *            schema:
 *              '$ref': "#/components/schemas/ItemsResponse"
 *       "502":
 *         description: Service got an error of communication with the external api.
 *         content:
 *           application/json:
 *             schema:
 *               '$ref': "#/components/schemas/HttpError"
 */
router.get("/items", async (req, res, next) => {
  const query = req.query.q;
  try {
    Logger.info(`Fetching items with query ${query}`);

    const itemsResponse = await axios.get(API_MELI_SEARCH, {
      params: { q: query, limit: 4 },
    });

    Logger.info(`Fetching categories with query: ${query}`);

    const categoriesResponse = await axios.get(API_MELI_CATEGORIES_PREDICTOR, {
      params: { q: `$${query}`, limit: 5 },
    });

    const { results } = itemsResponse.data;
    const [...categories] = categoriesResponse.data.map((category) => ({
      name: category.category_name,
      id: category.category_id,
    }));

    Logger.info("Data was retrieved successfully.");
    res.status(200).json({
      author: {
        name: "Facundo",
        lastname: "Palombo",
      },
      categories,
      items: results,
    });
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

/**
 * @swagger
 * /item/{itemId}:
 *   get:
 *     summary: Retrieve the details of an item by id
 *     description: Retrieve the details of an item by id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Item id
 *         required: true
 *         schema:
 *           type: string
 *           example: "MLA911126613"
 *     responses:
 *       "200":
 *         description: The details of an item
 *         content:
 *           application/json:
 *            schema:
 *              '$ref': "#/components/schemas/ItemResponse"
 *       "502":
 *         description: Service got an error of communication with the external api.
 *         content:
 *           application/json:
 *             schema:
 *               '$ref': "#/components/schemas/HttpError"
 */
router.get("/item/:id", async (req, res, next) => {
  const itemId = req.params.id;
  try {
    Logger.info(`Fetching item with id: ${itemId}`);
    const itemResponse = await axios.get(`${API_MELI_FIND_ITEMS}${itemId}`);
    Logger.info(`Fetching item description with id: ${itemId}`);
    const itemDescriptionResponse = await axios.get(
      `${API_MELI_FIND_ITEMS}${itemId}/description`
    );
    Logger.info(`Fetching item categories with id: ${itemId}`);
    const itemCategoryResponse = await axios.get(
      `${API_MELI_SEARCH_CATEGORY}/${itemResponse.data.category_id}`
    );

    const {
      id,
      title,
      price,
      picture,
      condition,
      free_shipping,
      sold_quantity,
      thumbnail,
    } = itemResponse.data;
    const { plain_text } = itemDescriptionResponse.data;

    const { path_from_root: categories } = itemCategoryResponse.data;
    Logger.info(`Item with id ${itemId} retrieved`);
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
        categories,
        thumbnail,
        description: plain_text,
      },
    });
  } catch (error) {
    Logger.error(
      `Service got an error. Item with itemId "${itemId}" could not be finded.`
    );
    Logger.error(error);
    next(error);
  }
});

module.exports = router;
