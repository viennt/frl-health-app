let sequelize = require('sequelize');
let models = require('../models');
let express = require('express');
let router = express.Router();

/* GET list */
router.get('/', (req, res) => {
  let query = {};
  if (req.query.q) {
    query = {
      name: sequelize
        .where(
          sequelize.fn('LOWER', sequelize.col('menus.name')),
          'LIKE',
          '%' + req.query.q + '%'
        )
    }
  }
  return models.Menus.findAll({
    include: [{
      model: models.Conditions,
      as: 'conditions',
      required: false,
      attributes: ['id', 'name', 'description'],
      through: { attributes: [] }
    }],
    where: query
  }).then((result) => {
    res.json({
      code: 1,
      data: result
    })
  }).catch((error) => {
    res.json({
      code: 0,
      message: error.errors && error.errors[0] && error.errors[0].message,
      type: error.errors && error.errors[0] && error.errors[0].type,
    });
  });
});

/* GET detail */
router.get('/:id', (req, res) => {
  return models.Menus.findOne({
    include: [{
      model: models.Conditions,
      as: 'conditions',
      required: false,
      attributes: ['id', 'name', 'description'],
      through: { attributes: [] }
    }],
    where: { id: req.params.id }
  }).then((result) => {
    res.json({
      code: 1,
      data: result
    })
  }).catch((error) => {
    res.json({
      code: 0,
      message: error.errors && error.errors[0] && error.errors[0].message,
      type: error.errors && error.errors[0] && error.errors[0].type,
    });
  });
});

/* POST create */
router.post('/', async (req, res) => {
  try {
    const savedMenu = await models.Menus.create({
      name: req.body.name,
      quantity: req.body.quantity,
      description: req.body.description,
    }, {w: 1}, {returning: true});

    req.body.conditions.forEach(async (item) => {
      const condition = await models.Conditions.findByPk(item.id);
      if (!condition) {
        return res.status(400);
      }
      const po = {
        menuId: savedMenu.id,
        conditionId: item.id
      };
      await models.MenuConditions.create(po, {w: 1}, {returning: true});
    });

    return res.json({
      code: 1,
    });
  } catch (error) {
    return res.json({
      code: 0,
      message: error.errors && error.errors[0] && error.errors[0].message,
      type: error.errors && error.errors[0] && error.errors[0].type,
    });
  }
});

/* PUT update */
router.put('/:id', async (req, res) => {
  try {
    const menu = await models.Menus.findByPk(req.params.id);

    const conditions = await menu.getConditions();
    menu.removeConditions(conditions);

    req.body.conditions.forEach(async (item) => {
      const po = {
        menuId: menu.id,
        conditionId: item.id
      };
      await models.MenuConditions.create(po, { w: 1 }, { returning: true });
    });

    await models.Menus.update({
      name: req.body.name || menu.name,
      quantity: req.body.quantity || menu.quantity,
      description: req.body.description || menu.description,
    }, { where: { id: req.params.id } });

    return res.json({
      code: 1,
    });
  } catch (error) {
    return res.json({
      code: 0,
      message: error.errors && error.errors[0] && error.errors[0].message,
      type: error.errors && error.errors[0] && error.errors[0].type,
    });
  }
});

/* DELETE destroy */
router.delete('/:id', async (req, res) => {
  try {
    const menu = await models.Menus.findByPk(req.params.id);

    const conditions = await menu.getConditions();
    menu.removeConditions(conditions);

    await models.Menus.destroy({
      where: { id: req.params.id }
    });

    return res.json({
      code: 1,
    });
  } catch (error) {
    return res.json({
      code: 0,
      message: error.errors && error.errors[0] && error.errors[0].message,
      type: error.errors && error.errors[0] && error.errors[0].type,
    });
  }
});

module.exports = router;
