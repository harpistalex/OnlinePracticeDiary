const admin = require("firebase-admin")
const serviceAccount = require("../onlinepracticediary-firebase-adminsdk-1u3gq-5ea8f1bba6.json")
admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://onlinepracticediary.firebaseio.com"
})

// MARK: - Authentication

function register(username, email, password) {
  admin.auth().createUser({
    email: email,
    //emailVerified: false,
    //phoneNumber: '+11234567890',
    password: password,
    displayName: username,
    //photoURL: 'http://www.example.com/12345678/photo.png',
    //disabled: false
  })
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', userRecord.uid)
    })
    .catch(function(error) {
      console.log('Error creating new user:', error)
    })
}

function getUserByEmail(email) {
  admin.auth().getUserByEmail(email)
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully fetched user data:', userRecord.toJSON())
  })
  .catch(function(error) {
   console.log('Error fetching user data:', error)
  })
}



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
  register: register,
  getUserByEmail: getUserByEmail
  
}