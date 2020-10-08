module.exports = function(app) {

    app.get('/', function(request, response) {
        response.render('login.ejs')
    })

    app.get('/signedIn', function(request, response) {
        response.render('practiceDiary.ejs')
    })

}

