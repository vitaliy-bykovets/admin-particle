const Router = require('koa-router'); // Router middleware for koa. https://github.com/alexmingoia/koa-router
const User = require('./../../models/User');

// Strategies
const SigninStrategy = require('./SigninStrategy');
const SignupStrategy = require('./SignupStrategy');

// Strategies
const signin = new SigninStrategy();
const signup = new SignupStrategy();

const router = new Router();

const handler = {
  login() {
    return signin.strategy('local');
  },
  signup() {
    return signup.strategy('local');
  }
}