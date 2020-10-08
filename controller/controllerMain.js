module.exports = function(app) {

    //const firebase = require('./controllerFirebase.js')

    ///////////////

    const admin = require("firebase-admin")
    const serviceAccount = require("../onlinepracticediary-firebase-adminsdk-1u3gq-8c1262c3dc.json")
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://onlinepracticediary.firebaseio.com"
    })

    // As an admin, the app has access to read and write all data, regardless of Security Rules
    var db = admin.database()
    var ref = db.ref("/")

    //////////////

    app.get('/', function(request, response) {
        response.render('login.ejs')
    })

    app.post('/', function(request, response) {
        // do firebase stuff
        ref.once("value", function(snapshot) {
            console.log(snapshot.val());
            console.log("LemPi")
        })
        response.render('practiceDiary.ejs')
    })

}

