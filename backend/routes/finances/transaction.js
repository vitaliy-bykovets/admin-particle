const Router = require('koa-router');
const Account = require('./../../models/Account');
const { validate } = require('./../../core/libs');

const router = new Router({
  prefix: '/api/finances'
});

const handler = {
  // async createAccount(ctx) {
  //   await validate(ctx.request.body, {
  //     name: 'required|min:2|max:30',
  //   });
  //
  //   const name = ctx.request.body.name;
  //   const account = new Account({ name });
  //   await account.save();
  //
  //   ctx.body = account;
  // },
  // async editAccount(ctx) {
  //   await validate(
  //     {
  //       ...ctx.request.body,
  //       id: ctx.params.id
  //     },
  //     {
  //       name: 'required|min:2|max:30',
  //       id: 'required|numeric'
  //     }
  //   );
  //
  //   const { name } = ctx.request.body;
  //   const id = ctx.params.id;
  //   const account = Account.where({ id }).count();
  //
  //   console.log('id')
  //
  //   if (!account) {
  //     ctx.throwSingle("Account doesn't match", 400);
  //   }
  //
  //   account.set('name', name);
  //
  //   await account.save();
  //
  //   ctx.body = account;
  //
  // },
  // async deleteAccount(ctx) {
  //
  // }
};

module.exports = router.routes();
