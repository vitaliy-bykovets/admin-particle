const Router = require('koa-router'); // Router middleware for koa. https://github.com/alexmingoia/koa-router
const User = require('./../../models/User');
const {validate} = require('./../../core/libs');

const router = new Router({
  prefix: '/api'
});

const handler = {
  async login(ctx) {
    await validate(ctx.request.body, {
      email: 'required|email',
      password: 'required|min:6'
    });

    const { email, password } = ctx.request.body;
    const user = await User.findByEmail(email);
    if (!user) {
      ctx.throwSingle('Пользователь не найден', 404);
    }
    if (!(await user.comparePassword(password))) {
      ctx.throwSingle('Пароль не верный', 400);
    }

    ctx.body = user
  },
  signup() {
    // return signup.strategy('local');
  }
}

router.post('/signin', handler.login);

module.exports = router.routes();

