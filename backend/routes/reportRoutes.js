const express = require('express');
const router = express.Router();
const { query, validationResult } = require('express-validator');//

const { getReport } = require('../controllers/reportController');

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Izveštaji sistema poljoprivredne proizvodnje
 */


const validateReportQuery = [/**/
  query('year').optional().isInt({ min: 2000, max: 2100 }).withMessage('Neispravan format godine'),
  query('fieldId').optional().isInt({ min: 1 }).withMessage('Neispravan ID polja')
];

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

router.get('/',validateReportQuery,//
  (req, res, next) => {//
    const errors = validationResult(req);//
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });//
    next();//
  }, //
  getReport);


module.exports = router;
