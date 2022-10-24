const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/auth')

const { validateBody, authenticate } = require('../../middlewares');

const { schemas } = require('../../models/user');

router.post('/signup', validateBody(schemas.registerSchema), ctrl.register);

router.post('/login', validateBody(schemas.loginSchema), ctrl.login)

router.get('/current', authenticate, ctrl.getCurrent);

router.get('/logout', authenticate, ctrl.logout);

router.patch("/", authenticate, validateBody(schemas.updateSubscriptionSchema), ctrl.updateSubscription);

module.exports = router;