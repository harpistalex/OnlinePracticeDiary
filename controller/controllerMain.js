const { register } = require('./controllerFirebase.js')

module.exports = function(app) {

    const fb = require('./controllerFirebase.js')
    const bodyParser = require('body-parser')
    const urlencodedParser = bodyParser.urlencoded({extended: true})

    ///////////////
/*
    const admin = require("firebase-admin")
    const serviceAccount = require("../onlinepracticediary-firebase-adminsdk-1u3gq-8c1262c3dc.json")
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://onlinepracticediary.firebaseio.com"
    })
  
    // As an admin, the app has access to read and write all data, regardless of Security Rules
    var db = admin.database()
    var ref = db.ref("/")
*/
    // MARK: - Login:

    app.get('/*', function(request, response) {
        response.render('login.ejs')
    })

    app.post('/', urlencodedParser, function(request, response) {
        // do firebase stuff
        if (request.body.action === 'login') {
            console.log('well dun you logged in')
            const user = fb.getUserByEmail(request.body.email)
            console.log(user)
        } else {
            if (request.body.password === request.body.repeatPassword) {
                console.log(`Password is good! ${request.body.password}`)
                fb.register(request.body.username, request.body.email, request.body.password)
                console.log('well dun you registered')
            } else {
                console.log(`Password is bad! ${request.body.password}, ${request.body.repeatPassword}`)
            }
        }

        
        //response.render('practiceDiary.ejs')
    })

 // MARK: - Practice Diary

    app.get('/practiceDiary', function(request, response) {
        response.render('practiceDiary.ejs')
    })

    app.post('/practiceDiary', function(request, response) {
        // do firebase stuff
        fb.databaseRef.once("value", function(snapshot) {
            console.log(snapshot.val());
            console.log("GONE DUN IT")
            //console.log(fb.someVar)
            //fb.kissLemPi()
        })
        response.render('practiceDiary.ejs')
    })

}

