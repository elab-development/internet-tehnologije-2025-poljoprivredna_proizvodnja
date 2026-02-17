const { Production, Expense } = require('../models');
const { Op } = require('sequelize');


const xss = require('xss');//

exports.getReport = async (req, res) => {
  try {
    //const { year, fieldId } = req.query;

    const year = req.query.year ? parseInt(xss(req.query.year), 10) : null;//
    const fieldId = req.query.fieldId ? parseInt(xss(req.query.fieldId), 10) : null;//
 

    const productionFilter = {};
    if (year) productionFilter.sowingDate = { [Op.between]: [`${year}-01-01`, `${year}-12-31`] };
    if (fieldId) productionFilter.fieldId = fieldId;


    // Sequelize koristi prepared statements, pa je SQL Injection zaštićen

    const productions = await Production.findAll({ where: productionFilter });
    const expenses = await Expense.findAll({ where: fieldId ? { fieldId } : {} });

    // Sume
    const totalSeed = productions.reduce((sum, p) => sum + (p.seedQuantity || 0), 0);
    const totalYield = productions.reduce((sum, p) => sum + (p.yieldKg || 0), 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);


    res.json({ productions, expenses, totals: { totalSeed, totalYield, totalExpenses } });


    //////////////////////////////////////
    // XSS zaštita za podatke koje šaljemo frontendu
    const safeProductions = productions.map(p => ({
      ...p.toJSON(),
      description: xss(p.description || '')
    }));
    const safeExpenses = expenses.map(e => ({
      ...e.toJSON(),
      description: xss(e.description || '')
    }));
    /////////////////////////////////////////////////

    //res.json({ productions, expenses, totals: { totalSeed, totalYield, totalExpenses } });
    res.json({//
      productions: safeProductions,//
      expenses: safeExpenses,//
      totals: { totalSeed, totalYield, totalExpenses }//
    });//
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

