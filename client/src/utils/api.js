import axios from "axios";

export default {

  // *** USERS ***
  // Gets all Users in local database
  getUsers: function () {
    return axios.get("/api/users");
  },
  // Gets the user with the given email address
  getUser: function (email) {
    return axios.get("/api/users/?email=" + email);
  },
  // Deletes the User with the given id
  deleteUser: function (id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a User to the database
  saveUser: function (UserData) {
    console.log("saveUser function");
    console.log(UserData);
    return axios.post("/api/users", UserData);
  },

  // *** ROOMS ***
  searchRooms: function (query) {
    return axios.get("/api/rooms", query);
  },
  searchRoomsByLocation: function (location) {
    return axios.get("/api/rooms/?roomName=" + location)
  },
  searchRoomsByFeature: function (features) {
    return axios.get("/api/rooms/?features=" + features)
  },

  // *** EVENTS ***
  saveEvent: function (eventData) {
    return axios.post("/api/events", eventData);
  },
  getEvents: function () {
    return axios.get("/api/events");
  },
  getEventsByUser: function (userId) {
    return axios.get("/api/events/?user=" + userId);
  },
  deleteEvent: function (id) {
    return axios.delete("/api/events/" + id);
  }
};