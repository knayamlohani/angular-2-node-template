var express, router;

express = require('express');

router = express.Router();

router.get('/', function(req, res, next) {
  return res.render('app/app', {
    title: 'chipkali 1'
  });
});

module.exports = router;
