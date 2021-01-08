const express = require('express')
const router = express.Router()

var activetraders;
// Add your routes here - above the module.exports line

//DOA ROUTES
//Before you Start
router.get('/doa/index', function (req, res) {
  activetraders=true;
  res.render('doa/index', { activetraders })
})
//REMOTE A Trader
router.post('/delete-trader', function (req, res) {
  if (req.session.data['remove-association']=="yes"){
    activetraders= false;
  }
  else {
    activetraders= true;
  }
  res.redirect('/doa/dashboard/index')
})

router.get('/doa/dashboard/index', function (req, res) {
  res.render('doa/dashboard/index', { activetraders })
})

module.exports = router
