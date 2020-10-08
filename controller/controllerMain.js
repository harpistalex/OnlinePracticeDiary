module.exports = function(app) {

    app.get('/', function(request, response) {
        response.render('login.ejs')
    })

    app.post('/', function(request, response) {
        console.log('well done')
        response.render('practiceDiary.ejs')
    })

}

