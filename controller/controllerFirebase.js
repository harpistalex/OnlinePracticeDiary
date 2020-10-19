const admin = require("firebase-admin")
const serviceAccount = require("../onlinepracticediary-firebase-adminsdk-1u3gq-5ea8f1bba6.json")
admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://onlinepracticediary.firebaseio.com"
})

// MARK: - Authentication

var uid = ""

function register(username, email, password) {
  admin.auth().createUser({
    email: email,
    //emailVerified: false,
    //phoneNumber: '+11234567890',
    password: password,
    displayName: username,
    //photoURL: 'http://www.example.com/12345678/photo.png',
    //disabled: false

    // TODO: - Do I need to create my own JWT for the user? Or can I use a custom token from FB?

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
    uid = userRecord.uid
    createToken(uid)

    // TODO: - check password, if correct, sign token.

  })
  .catch(function(error) {
   console.log('Error fetching user data:', error)
  })
}

// TESTING FB AUTH FUNCTIONS:

function createToken(uid) {
  admin.auth().createCustomToken(uid)
  .then(function(customToken) {
    // Send token back to client
    console.log(`token: ${customToken}`)
  })
  .catch(function(error) {
    console.log('Error creating custom token:', error)
  })
}

function verifyToken(idToken) {
  // idToken comes from the client app
  admin.auth().verifyIdToken(idToken)
    .then(function(decodedToken) {
      let userUid = decodedToken.uid;
      console.log('well done')
      console.log(`userUID: ${userUid}`)
      // ...
    }).catch(function(error) {
      // Handle error
      console.log(`ERROR: ${error}`)
    });
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