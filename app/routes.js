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

//DOA-RADIO
//Before you Start
router.get('/doa-radio/enrolment/trader-or-agent', function (req, res) {
  activetraders=true; //shows the additional trader when added
  agentadded=false; //set no agents added for initial load
  activerequests=true;
  res.render('doa-radio/enrolment/trader-or-agent', { activetraders, agentadded })
})
router.get('/doa-radio/enrolment/act-as-agent', function (req, res) {
  activetraders=true; //shows the additional trader when added
  agentadded=false; //set no agents added for initial load
  activerequests=true;
  res.render('doa-radio/enrolment/act-as-agent', { activetraders, agentadded })
})
//REMOVE A Trader
router.post('/delete-trader-radio', function (req, res) {
  if (req.session.data['remove-association']=="yes"){
    activetraders= false;
  }
  else {
    activetraders= true;
  }
  res.redirect('/doa-radio/dashboard/index')
})

router.get('/doa-radio/dashboard/index', function (req, res) {
  res.render('doa-radio/dashboard/index', { activetraders, agentadded, agent, trader, activerequests, reviewmanually })
})

//ADD an agent
router.post('/doa-radio/add-agent', function (req, res) {
  res.redirect('/doa-radio/agents/add')
})

router.post('/submit-agent', function (req, res) {
req.session.searchresults = true;
searchresults = req.session.searchresults;
  res.redirect('/doa-radio/agents/add-confirmation')
})

router.get('/doa-radio/agents/searchresults', function (req, res) {
  res.render('doa-radio/agents/add', { searchresults })
})

router.post('/doa-radio/agents/set-permissions', function (req, res) {
  req.session.agentadded = true;
  agentadded = true;
  res.redirect('/doa-radio/agents/disclaimer')
})

router.post('/doa-radio/agents/edit-permissions', function (req, res) {
  res.redirect('/doa-radio/agents/view-permissions')
})

//Add agent new
router.post('/doa-add-agent-radio', function (req, res) {
  if (req.session.data['add-agent-association']=="yes"){
    agentadded= true;
    res.redirect('/doa-radio/agents/set-permissions')
  }
  else {
    agentadded= false;
    res.redirect('/doa-radio/dashboard/index')
  }

})

//REMOVE an agent
router.post('/delete-agent-radio', function (req, res) {
  if (req.session.data['remove-agent-association']=="yes"){
    agentadded= false;
  }
  else {
    agentadded= true;
  }
  res.redirect('/doa-radio/dashboard/index')
})

//PREFERENCES
router.post('/organisation-type-radio', function (req, res) {
  organisationtype = req.session.data ['organisation-type-selection'];
  agent = organisationtype.includes("Agent");
  trader = organisationtype.includes("Trader");
  if (trader==true && agent==true) {
    res.redirect('/doa-radio/enrolment/agent-agreement')
  }
  if (trader==true && agent==false){
    res.redirect('/doa-radio/dashboard/index')
  }
  if (trader==false && agent==true){
    res.redirect('/doa-radio/enrolment/agent-agreement')
  }
})

router.post('/set-organisation-type-radio', function (req, res) {
  actasagent = req.session.data ['act-as-agent'];
  if (actasagent == "Yes"){
    agent = true;
    trader = true;
    console.log(agent);
    console.log(trader);
    res.redirect('/doa-radio/enrolment/trader-agreement')
  }
  else {
    agent = false;
    trader = true;
    console.log(agent);
    console.log(trader);
    res.redirect('/doa-radio/enrolment/trader-agreement')
  }
})

router.post('/doa-radio/enrolment/agent-agreement', function (req, res) {
  res.redirect('/doa-radio/enrolment/auto-accept')

})

router.post('/doa-radio/enrolment/trader-agreement', function (req, res) {
  if (agent==true){
    res.redirect('/doa-radio/enrolment/agent-agreement')
  }
  else {
    res.redirect('/doa-radio/dashboard/index')
  }
})

//Edit preferences
router.post('/edit-organisation-type-radio', function (req, res) {
  organisationtype = req.session.data ['organisation-type-selection'];
  agent = organisationtype.includes("Agent");
  trader = organisationtype.includes("Trader");
  console.log(organisationtype);
    res.redirect('/doa-radio/dashboard/index')
})

//Representation requests
router.post('/review-representation-radio', function (req, res) {
activerequests = false;
    res.redirect('/doa-radio/dashboard/index')
})

router.post('/auto-accept-radio', function (req, res) {
  if (req.session.data['auto-accept-delegation']=="Yes"){
    activerequests = false;
    reviewmanually = false;
  }
  else {
    activerequests = true;
    reviewmanually = true;

  }
    res.redirect('/doa-radio/enrolment/agent-code')
})

//DOA- ALT
router.get('/doa-alt/enrolment/trader-or-agent', function (req, res) {
  activetraders=true; //shows the additional trader when added
  agentadded=false; //set no agents added for initial load
  activerequests=true;
  res.render('doa-alt/enrolment/trader-or-agent', { activetraders, agentadded })
})
router.get('/doa-alt/enrolment/act-as-agent', function (req, res) {
  activetraders=true; //shows the additional trader when added
  agentadded=false; //set no agents added for initial load
  activerequests=true;
  res.render('doa-alt/enrolment/act-as-agent', { activetraders, agentadded })
})
//REMOVE A Trader
router.post('/delete-trader-alt', function (req, res) {
  if (req.session.data['remove-association']=="yes"){
    activetraders= false;
  }
  else {
    activetraders= true;
  }
  res.redirect('/doa-alt/dashboard/index')
})

router.get('/doa-alt/dashboard/index', function (req, res) {
  res.render('doa-alt/dashboard/index', { activetraders, agentadded, agent, trader, activerequests, reviewmanually })
})

//ADD an agent
router.post('/doa-alt/add-agent', function (req, res) {
  res.redirect('/doa-alt/agents/add')
})

router.post('/doa-alt/agents/add', function (req, res) {
req.session.searchresults = true;
searchresults = req.session.searchresults;
  res.redirect('/doa-alt/agents/searchresults')
})

router.get('/doa-alt/agents/searchresults', function (req, res) {
  searchresults = true
  console.log (searchresults);
  res.render('doa-alt/agents/add-old', { searchresults })
})

router.post('/doa-alt/agents/set-permissions', function (req, res) {
  req.session.agentadded = true;
  agentadded = true;
  res.redirect('/doa-alt/agents/disclaimer')
})

router.post('/doa-alt/agents/edit-permissions', function (req, res) {
  res.redirect('/doa-alt/agents/view-permissions')
})

//Add agent new
router.post('/doa-add-agent-alt', function (req, res) {
  if (req.session.data['add-agent-association']=="yes"){
    agentadded= true;
    res.redirect('/doa-alt/agents/set-permissions')
  }
  else {
    agentadded= false;
    res.redirect('/doa-alt/dashboard/index')
  }

})

//REMOVE an agent
router.post('/delete-agent-alt', function (req, res) {
  if (req.session.data['remove-agent-association']=="yes"){
    agentadded= false;
  }
  else {
    agentadded= true;
  }
  res.redirect('/doa-alt/dashboard/index')
})

//PREFERENCES
router.post('/organisation-type-alt', function (req, res) {
  organisationtype = req.session.data ['organisation-type-selection'];
  agent = organisationtype.includes("Agent");
  trader = organisationtype.includes("Trader");
  if (trader==true && agent==true) {
    res.redirect('/doa-alt/enrolment/agent-agreement')
  }
  if (trader==true && agent==false){
    res.redirect('/doa-alt/dashboard/index')
  }
  if (trader==false && agent==true){
    res.redirect('/doa-alt/enrolment/agent-agreement')
  }
})

router.post('/set-organisation-type-alt', function (req, res) {
  actasagent = req.session.data ['act-as-agent'];
  if (actasagent == "Yes"){
    agent = true;
    trader = true;
    console.log(agent);
    console.log(trader);
    res.redirect('/doa-alt/enrolment/trader-agreement')
  }
  else {
    agent = false;
    trader = true;
    console.log(agent);
    console.log(trader);
    res.redirect('/doa-alt/enrolment/trader-agreement')
  }
})

router.post('/doa-alt/enrolment/agent-agreement', function (req, res) {
  res.redirect('/doa-alt/enrolment/auto-accept')

})

router.post('/doa-alt/enrolment/trader-agreement', function (req, res) {
  if (agent==true){
    res.redirect('/doa-alt/enrolment/agent-agreement')
  }
  else {
    res.redirect('/doa-alt/dashboard/index')
  }
})

//Edit preferences
router.post('/edit-organisation-type-alt', function (req, res) {
  organisationtype = req.session.data ['organisation-type-selection'];
  agent = organisationtype.includes("Agent");
  trader = organisationtype.includes("Trader");
  console.log(organisationtype);
    res.redirect('/doa-alt/dashboard/index')
})

//Representation requests
router.post('/review-representation-alt', function (req, res) {
activerequests = false;
    res.redirect('/doa-alt/dashboard/index')
})



router.post('/auto-accept-alt', function (req, res) {
  if (req.session.data['auto-accept-delegation']=="Yes"){
    activerequests = false;
    reviewmanually = false;
  }
  else {
    activerequests = true;
    reviewmanually = true;

  }
    res.redirect('/doa-alt/dashboard/index')
})


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
  res.redirect('/doa/agents/disclaimer')
})

router.post('/doa/agents/edit-permissions', function (req, res) {
  res.redirect('/doa/agents/view-permissions')
})

//Add agent new
router.post('/doa-add-agent', function (req, res) {
  if (req.session.data['add-agent-association']=="yes"){
    agentadded= true;
    res.redirect('/doa/agents/set-permissions')
  }
  else {
    agentadded= false;
    res.redirect('/doa/dashboard/index')
  }

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
    res.redirect('/doa/dashboard/index')
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
    res.redirect('/doa/enrolment/agent-code')
})

module.exports = router
