const express = require('express')
const router = express.Router()

var activetraders;
var searchresults; //to show and hide agent search results
var agentadded; //to show hide added agents on dashboard
var agent;
var trader;
var organisationtype = [];
var actasagent;
var activerequests;
var reviewmanually;
// Add your routes here - above the module.exports line

//DOA ROUTES
//Before you Start
router.get('/doa/enrolment/trader-or-agent', function (req, res) {
  activetraders=true; //shows the additional trader when added
  agentadded=false; //set no agents added for initial load
  activerequests=true;
  res.render('doa/enrolment/trader-or-agent', { activetraders, agentadded })
})
router.get('/doa/enrolment/act-as-agent', function (req, res) {
  activetraders=true; //shows the additional trader when added
  agentadded=false; //set no agents added for initial load
  activerequests=true;
  res.render('doa/enrolment/act-as-agent', { activetraders, agentadded })
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
  res.render('doa/dashboard/index', { activetraders, agentadded, agent, trader, activerequests, reviewmanually })
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

router.post('/set-organisation-type', function (req, res) {
  actasagent = req.session.data ['act-as-agent'];
  if (actasagent == "Yes"){
    agent = true;
    trader = true;
    console.log(agent);
    console.log(trader);
    res.redirect('/doa/enrolment/trader-agreement')
  }
  else {
    agent = false;
    trader = true;
    console.log(agent);
    console.log(trader);
    res.redirect('/doa/enrolment/trader-agreement')
  }
})

router.post('/doa/enrolment/agent-agreement', function (req, res) {
  res.redirect('/doa/enrolment/auto-accept')

})

router.post('/doa/enrolment/trader-agreement', function (req, res) {
  if (agent==true){
    res.redirect('/doa/enrolment/agent-agreement')
  }
  else {
    res.redirect('/doa/dashboard/index')
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

//Representation requests
router.post('/review-representation', function (req, res) {
activerequests = false;
    res.redirect('/doa/dashboard/index')
})

router.post('/auto-accept', function (req, res) {
  if (req.session.data['auto-accept-delegation']=="Yes"){
    activerequests = false;
    reviewmanually = false;
  }
  else {
    activerequests = true;
    reviewmanually = true;
  }
  console.log(activerequests);
  console.log(reviewmanually);
    res.redirect('/doa/dashboard/index')
})

module.exports = router
