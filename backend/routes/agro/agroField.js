const Router = require('koa-router');
const { AgroField } = require('./../../models');
const { validate } = require('../../core/libs');


const router = new Router({
  prefix: '/api/agro'
});

const handler = {
  async createAgroField(ctx) {
    await validate(ctx.request.body, {
      name: 'required|min:2|max:30',
      description: 'required|min:2|max:30',
      path: 'required'
    });

    const { name, description, path } = ctx.request.body;

    const agroField = new AgroField({ name, description, path, created_at: new Date() });
    await agroField.save();

    ctx.body = agroField;
  },
  async getAgroField(ctx) {
    await validate(
      { id: ctx.params.id },
      { id: 'required|numeric' }
    );

    const id = ctx.params.id;

    const agroField = await AgroField.where({ id }).fetch();

    if (!agroField) {
      ctx.throwSingle("AgroField doesn't match", 404);
    }

    ctx.body = agroField;
  },
  async getAllAgroField(ctx) {
    const agroField = await AgroField.fetchAll();

    if (!agroField) {
      ctx.throwSingle("AgroField doesn't match", 404);
    }

    ctx.body = agroField;
  },
  async editAgroField(ctx) {
    await validate(
      {
        ...ctx.request.body,
        id: ctx.params.id
      },
      {
        id: 'required|numeric',
        name: 'required|min:2|max:30',
        description: 'required|min:2|max:30',
        path: 'required'
      }
    );

    const { name, description, path } = ctx.request.body;
    const id = ctx.params.id;
    const agroField = AgroField.where({ id });

    if (!agroField.count()) {
      ctx.throwSingle("Account doesn't match", 400);
    }

    await agroField.save({id, name, description, path}, {
      method: 'update',
      patch: true
    });

    ctx.body = agroField;
  },
  async deleteAgroField(ctx) {
    await validate(
      { id: ctx.params.id },
      { id: 'required|numeric' }
    );

    const id = ctx.params.id;
    const agroField = await AgroField.where({ id }).fetch();

    if (!agroField) {
      ctx.throwSingle("AgroField doesn't match", 404);
    }

    await agroField.destroy();

    ctx.body = {}
  }
};

router.post('/field', handler.createAgroField);
router.get('/field', handler.getAllAgroField);
router.get('/field/:id', handler.getAgroField);
router.put('/field/:id', handler.editAgroField);
router.delete('/field/:id', handler.deleteAgroField);


module.exports = router.routes();