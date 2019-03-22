var timesheetAPI = require("./functions/timesheetFunctions.js");
var taskAPI = require("./functions/taskFunctions.js");
var saveAPI = require("./functions/saveFunctions.js");
var userAPI = require("./functions/userFunctions.js");
var appAPI = require("./functions/appFunctions.js");
var express = require("express");
var router = new express.Router();

/*BEGIN SAVE ROUTES*/

//Get all tasks or just one by ?id="X" query
router.get("/saves", function(req,res){
    saveAPI.getSaves(req,res);
});
//Create new save using posted data and cookies
router.post("/save", function(req,res) {
    // axios.get("https://api.metro.net/agencies/lametro-rail/routes/" + req.params.line + "/stops/" +
    //     req.params.station + "/predictions/",
    //     { crossdomain: true }
    // ).then(function(data) {
    //     console.log(data.data);
    //     /*res.json(data);*/
    // });
    saveAPI.createSave(req,res);

});
//Update an existing task with /:id params using passed req.body
router.put("/saves/:id", function(req, res) {
    saveAPI.updateSave(req, res);
});
//Delete an existing task with /:id params
router.delete("/saves/:id", function(req, res) {
    saveAPI.deleteSave(req,res);
});

/*END SAVE ROUTES*/

/*BEGIN TASK ROUTES*/

//Get all tasks or just one by ?id="X" query
router.get("/tasks", function(req,res){
    taskAPI.getTasks(req,res);
});
//Create new task using posted data and cookies
router.post("/tasks", function(req, res) {
    taskAPI.createTask(req,res);       
});
//Update an existing task with /:id params using passed req.body
router.put("/tasks/:id", function(req, res) {
    taskAPI.updateTask(req, res);
});
//Delete an existing task with /:id params
router.delete("/tasks/:id", function(req, res) {
    taskAPI.deleteTask(req,res);
});

/*END TASK ROUTES*/



/*BEGIN TIMESHEET ROUTES*/

//Gget timesheets using timesheet id or date/cookies
router.get("/timesheet", function(req, res) {
    timesheetAPI.getTimeSheets(req,res);
});
//Clock-in/create timesheet if does not exist
router.post("/clockIn", function(req, res) {
    timesheetAPI.clockIn(req,res);
});
//Update timesheets (lunchIn, lunchOut, clockOut) using req.body
router.put("/timesheet/:id", function(req, res) {
    timesheetAPI.updateTimeSheet(req,res);
});

/*END TIMESHEET ROUTES*/



/*BEGIN USER ROUTES*/

//Get all users or just one by req.query
router.get("/users", function(req, res) {
    userAPI.getUsers(req,res);
});

//Validate password on user logins [possibly modify to use route on sign-up]
router.post("/users/login", function(req, res) {
    userAPI.validateUser(req,res);
});

//Create new user
router.post("/users", function(req, res) {
    userAPI.createUser(req,res);
});

//Delete user by id
router.delete("/users/:id", function(req, res) {
    userAPI.deleteUser(req,res);
});

//Add-remove user to-from a task
router.put("/UserTasks/:action", function(req, res) {
    userAPI.addRemoveUserTask(req,res);
});

/*END USER ROUTES*/

/* API routes */
router.post("/populate", function(req,res) {

    appAPI.getInfo(req,res);

});
/* END API ROUTES*/

/*Database Routes*/
router.post("/setDB", function(req,res) {

    appAPI.setDB(req,res);

});
/*End Database Routes*/

module.exports = router;