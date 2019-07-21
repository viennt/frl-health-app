let models  = require('../models');
let express = require('express');
let router = express.Router();

/* GET list */
router.get('/', (req, res) => {
  return models.Conditions.findAll({
    include: [{
      model: models.Menus,
      as: 'menus',
      required: false,
      attributes: ['id', 'name', 'quantity', 'description'],
      through: { attributes: [] }
    }]
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
  return models.Conditions.findOne({
    include: [{
      model: models.Menus,
      as: 'menus',
      required: false,
      attributes: ['id', 'name', 'quantity', 'description'],
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
    const savedCondition = await models.Conditions.create({
      name: req.body.name,
      description: req.body.description,
    }, {w: 1}, {returning: true});

    req.body.menus.forEach(async (item) => {
      const menu = await models.Menus.findByPk(item.id);
      if (!menu) {
        return res.status(400);
      }
      const po = {
        conditionId: savedCondition.id,
        menuId: item.id
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
    const condition = await models.Conditions.findByPk(req.params.id);

    const menus = await condition.getMenus();
    condition.removeMenus(menus);

    req.body.menus.forEach(async (item) => {
      const po = {
        conditionId: condition.id,
        menuId: item.id
      };
      await models.MenuConditions.create(po, { w: 1 }, { returning: true });
    });

    await models.Conditions.update({
      name: req.body.name || condition.name,
      description: req.body.description || condition.description,
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
    const condition = await models.Conditions.findByPk(req.params.id);

    const menus = await condition.getMenus();
    condition.removeMenus(menus);

    await models.Conditions.destroy({
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
