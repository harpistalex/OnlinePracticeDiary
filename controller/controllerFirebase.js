const admin = require("firebase-admin")
const serviceAccount = require("../onlinepracticediary-firebase-adminsdk-1u3gq-5ea8f1bba6.json")
admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://onlinepracticediary.firebaseio.com"
})

// MARK: - Authentication



// MARK: - Database

var db = admin.database()
var ref = db.ref("/")

// MARK: - Exports

module.exports = {

  someVar: "Hello! I am an export.",
  kissLemPi: function() {
      console.log("BIG KISS FOR LEMPI")
  },
  database: db,
  databaseRef: ref,
  //register: register,
  //getUserByEmail: getUserByEmail
  
}