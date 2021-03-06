const router = require('express').Router();
const notificationCtrl = require('./../controllers/notificationCtrl');
const isAuthenticated = require('./../middlewares/auth');

router.route('/notification')
  .get(isAuthenticated, notificationCtrl.getNotification)
  .post(isAuthenticated, notificationCtrl.createNotification);

router.route('/notification/:id')
  .patch(isAuthenticated, notificationCtrl.readNotification)
  .delete(isAuthenticated, notificationCtrl.deleteNotification);

module.exports = router;