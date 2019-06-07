import models from '../models/index';

export default {
  create: async (req, res) => {
    const { message } = req.body;
    await models.Test.create({
      message
    }).then(Test => res.json(Test));
  },

  get: async (req, res) => {
    const m = await models.Test.findAll({
    });
    return res.status(200).send({
      data: m,
    });
  },

  remove: async (req, res) => {
    await models.Test.destroy({ where: { id: req.params.id } });
    return res.status(200).send({
      data: 'deleted successful'
    });
  }
};
