import axios from "axios";

const API = {
  //Save APIs
  getSaves: function() {
    return axios.get("/api/saves");
  },
  //
  deleteSave: function(id) {
    return axios.delete(`/api/saves/${id}`);
  },
  // Toggles a quote's favorite property in the db
  favoriteSave: function(save) {
    save.priority = !save.priority;
    const { id, priority } = save;
    return axios.put(`/api/saves/${id}`, { priority });
  },
  //end Saves


  //Task APIs
  getTasks: function() {
    return axios.get("/api/tasks");
  },
  //
  saveTask: function(text) {
    return axios.post("/api/tasks", { name: text });
  },
  //
  deleteTask: function(id) {
    return axios.delete(`/api/tasks/${id}`);
  },
  // Toggles a quote's favorite property in the db
  priorityTask: function(task) {
    task.priority = !task.priority;
    const { id, priority } = task;
    return axios.put(`/api/tasks/${id}`, { priority });
  },
  //end Tasks

  //Timesheet APIs
  getTimesheet: function(term,query) {
    return axios.get(`/api/timesheet?${term}=${query}`);
  },
  //end Timesheet

  //Clock APIs
  clockIn: function(date,clockIn) {
    return axios.post("/api/clockIn", { date, clockIn });
  },
  //
  lunchIn: function(id,lunchIn) {
    return axios.put(`/api/timesheet/${id}`, { lunchIn });
  },
  //
  lunchOut: function(id,lunchOut) {
    return axios.put(`/api/timesheet/${id}`, { lunchOut });
  },
  //
  clockOut: function(id,clockOut) {
    return axios.put(`/api/timesheet/${id}`, { clockOut });
  },
  //end Clock

  //User APIs
  saveUser: function(name,email,password) {
    return axios.post("/api/users", { name, email, password });
  },
  //
  loginUser: function(name,password) {
    var queryName = 'name';

    if (name.indexOf('@') != -1) {
        queryName = 'email';
    }

    return axios.post("/api/users/login?" + queryName + "=" + name, { name, password });
  },
  //end User

  //App APIs
  getInfo: function(line,station,URLs) {
    return axios.post("/api/populate",{ line, station, URLs})
  }
  //end App

};

export default API;
