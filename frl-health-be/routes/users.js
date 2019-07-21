let models  = require('../models');
let express = require('express');
let router = express.Router();

/* GET detail menus */
router.get('/:id/menus', (req, res) => {
  return models.Users.findOne({
    include: [{
      model: models.Menus,
      as: 'menus',
      required: false,
      attributes: ['id', 'name', 'quantity', 'description'],
      through: { attributes: [] }
    }],
    where: { id: req.params.id }
  })
    .then((result) => {
      res.json({
        code: 1,
        data: result && result.menus || []
      })
    })
    .catch((error) => {
      res.json({
        code: 0,
        message: error.errors && error.errors[0] && error.errors[0].message,
        type: error.errors && error.errors[0] && error.errors[0].type,
      });
    });
});

/* POST add menu */
router.post('/:id/menus/:menuId', async (req, res) => {
  try {
    const po = {
      userId: req.params.id,
      menuId: req.params.menuId,
    };
    await models.MenuUsers.create(po, {w: 1}, {returning: true});

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

/* DELETE remove menu */
router.delete('/:id/menus/:menuId', async (req, res) => {
  try {
    const user = await models.Users.findByPk(req.params.id);
    const menu = await models.Menus.findByPk(req.params.menuId);

    user.removeMenus([menu]);

    return res.json({
      code: 1,
    });
  } catch (error) {
    return res.json({
      code: 0,
      message: error.errors && error.errors[0] && error.errors[0].message || error,
      type: error.errors && error.errors[0] && error.errors[0].type,
    });
  }
});

module.exports = router;
