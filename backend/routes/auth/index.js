const Router = require('koa-router'); // Router middleware for koa. https://github.com/alexmingoia/koa-router
const User = require('./../../models/User');
const { validate, JWTService } = require('./../../core/libs');

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

    const token = JWTService.signUser(user);

    ctx.body = { user, token };
  },
  async signup(ctx) {
    await validate(ctx.request.body, {
      first_name: 'required|min:2|max:30|alpha_num',
      last_name: 'required|min:2|max:30|alpha_num',
      email: 'required|email',
      password: 'required|min:6',
      confirm_password: 'required|same:password'
    });

    const { email, first_name, last_name, password } = ctx.request.body;
    const userEmail = await User.where({ email }).count();

    if (userEmail) {
      this.ctx.throwSingle('This email is registered', 409); // 409 Conflict
    }

    const user = new User({ email, first_name, last_name, password });
    await user.save();

    const token = JWTService.signUser(user);
    ctx.body = { token };
  },
  async forgotPassword(ctx) {
    await validate(ctx.request.body, {
      email: "required|email"
    });

    const { email } = ctx.request.body;
    const userEmail = await User.where({ email }).count();

    if (!userEmail) {
      this.ctx.throwSingle('User with this email wasn\'t registered', 404); // 404 Not found
    }
  }
};

router.post('/signin', handler.login);
router.post('/signup', handler.signup);
router.post('/forgot-password', handler.forgotPassword);

module.exports = router.routes();

