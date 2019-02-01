const Router = require('koa-router');
const { Account } = require('./../../models');
const { validate } = require('./../../core/libs');

const router = new Router({
  prefix: '/api/finances'
});

const handler = {
  async createAccount(ctx) {
    await validate(ctx.request.body, {
      name: 'required|min:2|max:30',
    });

    const name = ctx.request.body.name;
    const account = new Account({ name });

    await account.save();

    ctx.body = account;
  },
  async editAccount(ctx) {
    await validate(
      {
        ...ctx.request.body,
        id: ctx.params.id
      },
      {
        name: 'required|min:2|max:30',
        id: 'required|numeric'
      }
    );

    const { name } = ctx.request.body;
    const id = ctx.params.id;
    const account = Account.where({ id });

    if (!account.count()) {
      ctx.throwSingle("Account doesn't match", 400);
    }

    await account.save({id, name}, {
      method: 'update',
      patch: true
    });

    ctx.body = account;
  },
  async deleteAccount(ctx) {
    await validate(
      { id: ctx.params.id },
      { id: 'required|numeric' }
    );

    const id = ctx.params.id;
    const account = await Account.where({ id }).fetch();


    if (!account) {
      ctx.throwSingle("Account doesn't match", 404);
    }

    await account.destroy();

    ctx.body = {}
  },
  async getAccount(ctx) {
    await validate(
      { id: ctx.params.id },
      { id: 'required|numeric' }
    );

    const id = ctx.params.id;
    const account = await Account.where({ id }).fetch({
      withRelated: ['transations']
    });



    if (!account) {
      ctx.throwSingle("Account doesn't match", 404);
    }

    ctx.body = account;
  }
};

router.post('/account', handler.createAccount);
router.get('/account/:id', handler.getAccount);
router.put('/account/:id', handler.editAccount);
router.delete('/account/:id', handler.deleteAccount);


module.exports = router.routes();
