const express = require('express')
const router = express.Router()

var activetraders;
var searchresults; //to show and hide agent search results
var agentadded; //to show hide added agents on dashboard
// Add your routes here - above the module.exports line

//DOA ROUTES
//Before you Start
router.get('/doa/index', function (req, res) {
  activetraders=true; //shows the additional trader when added
  agentadded=false; //set no agents added for initial load

  res.render('doa/index', { activetraders, agentadded })
})
//REMOVE A Trader
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
  res.render('doa/dashboard/index', { activetraders, agentadded })
})

//ADD an agent
router.post('/doa/add-agent', function (req, res) {
  res.redirect('/doa/agents/add')
})

router.post('/doa/agents/add', function (req, res) {
req.session.searchresults = true;
searchresults = req.session.searchresults;
  res.redirect('/doa/agents/searchresults')
})

router.get('/doa/agents/searchresults', function (req, res) {
  res.render('doa/agents/add', { searchresults })
})

router.post('/doa/agents/set-permissions', function (req, res) {
  req.session.agentadded = true;
  agentadded = true;
  res.redirect('/doa/dashboard/index')
})



module.exports = router
