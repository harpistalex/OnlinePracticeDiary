function checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged(function(user){
                    if (user) {
                            console.log(user)
                            // logged in
                            console.log('already logged in')
                            // go to practice page

                    } else {
                            // not logged in
                            console.log('not logged in')

                    }
            })

}

window.onload = function() {
    checkIfLoggedIn()
}


function signOut() {
    firebase.auth().signOut()
    document.getElementById('google-pic')
    .setAttribute('src', '')
    checkIfLoggedIn()
}


function signInWithGoogle() {
    // Using a popup.
    var provider = new firebase.auth.GoogleAuthProvider
    firebase.auth().signInWithPopup(provider)
            .then(function(result) {
            console.log(result)
            checkIfLoggedIn()

            })
            .catch(function(){
            console.log(error)
            })
}

function signInWithEmail() {

}