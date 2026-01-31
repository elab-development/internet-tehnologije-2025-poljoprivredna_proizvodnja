const express = require('express');
const router = express.Router();
const { getReport } = require('../controllers/reportController');

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Izveštaji sistema poljoprivredne proizvodnje
 */

/**
 * @swagger
 * /api/reports:
 *   get:
 *     summary: Dohvatanje izveštaja
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Izveštaj uspešno dohvaćen
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalFields:
 *                   type: integer
 *                   example: 10
 *                 totalProductions:
 *                   type: integer
 *                   example: 25
 *                 totalExpenses:
 *                   type: number
 *                   example: 125000
 */
router.get('/', getReport);

module.exports = router;
