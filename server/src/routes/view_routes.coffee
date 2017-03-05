express = require 'express'
router  = express.Router();


router.get '/', (req, res, next) ->
  res.render 'app/app', {title: 'chipkali 1'}

module.exports = router