const express = require('express')
const router = express.Router()

var activetraders;
var searchresults; //to show and hide agent search results
var agentadded; //to show hide added agents on dashboard
var agent;
var trader;
var organisationtype = [];
// Add your routes here - above the module.exports line

//DOA ROUTES
//Before you Start
router.get('/doa/enrolment/trader-or-agent', function (req, res) {
  activetraders=true; //shows the additional trader when added
  agentadded=false; //set no agents added for initial load
  res.render('doa/enrolment/trader-or-agent', { activetraders, agentadded })
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
  res.render('doa/dashboard/index', { activetraders, agentadded, agent, trader })
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

router.post('/doa/agents/edit-permissions', function (req, res) {
  res.redirect('/doa/agents/view-permissions')
})

//REMOVE an agent
router.post('/delete-agent', function (req, res) {
  if (req.session.data['remove-agent-association']=="yes"){
    agentadded= false;
  }
  else {
    agentadded= true;
  }
  res.redirect('/doa/dashboard/index')
})

//PREFERENCES
router.post('/organisation-type', function (req, res) {
  organisationtype = req.session.data ['organisation-type-selection'];
  agent = organisationtype.includes("Agent");
  trader = organisationtype.includes("Trader");
  if (trader==true && agent==true) {
    res.redirect('/doa/enrolment/agent-agreement')
  }
  if (trader==true && agent==false){
    res.redirect('/doa/enrolment/trader-agreement')
  }
  if (trader==false && agent==true){
    res.redirect('/doa/enrolment/agent-agreement')
  }
})

router.post('/doa/enrolment/agent-agreement', function (req, res) {
  if (trader==true){
    res.redirect('/doa/enrolment/trader-agreement')
  }
  else {
    res.redirect('/doa/enrolment/auto-accept')
  }
})

//Edit preferences
router.post('/edit-organisation-type', function (req, res) {
  organisationtype = req.session.data ['organisation-type-selection'];
  agent = organisationtype.includes("Agent");
  trader = organisationtype.includes("Trader");
  console.log(organisationtype);
    res.redirect('/doa/dashboard/index')
})


module.exports = router
