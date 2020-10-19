//const { register } = require('./controllerFirebase.js')

module.exports = function(app) {

    const fb = require('./controllerFirebase.js')
    const bodyParser = require('body-parser')
    const urlencodedParser = bodyParser.urlencoded({extended: true})

    // MARK: - Login:

    app.get('/', function(request, response) {
        response.render('login.ejs')
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

