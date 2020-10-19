function checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log(`${user.displayName} is logged in`)
        //   if (window.location.pathname === '/') {
        //     window.location.assign('/practiceDiary')
        //   }
        } else {
          // User is signed out.
          console.log("You are logged out")
        //   if (window.location.pathname === '/practiceDiary') {
        //     window.location.assign('/')
        //   }
        }
      })
}

window.onload = function() {
    checkIfLoggedIn()
}

function register() {
    
    var username = document.getElementById('registerUsername').value
    var email = document.getElementById('registerEmail').value
    var password = document.getElementById('registerPassword').value
    var repeatPassword = document.getElementById('registerRepeatPassword').value

    var params = {
        displayName: username
    }

    if (password === repeatPassword) {
        // register
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then (function(result){
            console.log("Well dun you registered")
            updateUser(params)
            window.location.assign('/practiceDiary')
        })
        
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code
            var errorMessage = error.message
            console.log(errorCode)
            console.log(errorMessage)
            // ...
          })
    } else {
        console.log("passwords don't match")
    }

}

function signInWithEmail() {

    var email = document.getElementById('loginEmail').value
    var password = document.getElementById('loginPassword').value
    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(result) {
        console.log("Well dun you logged in")
        window.location.assign('/practiceDiary')
    })
    
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code
    var errorMessage = error.message
    console.log(errorCode)
    console.log(errorMessage)
    // ...
    })

}

function signOut() {
    firebase.auth().signOut()
    window.location.assign('/')
    checkIfLoggedIn()
}


function signInWithGoogle() {

}

function updateUser(params) {
    
    var user = firebase.auth().currentUser;

    user.updateProfile(params)
    .then(function() {
    // Update successful.
    }).catch(function(error) {
    // An error happened.
    console.log(`Couldn't save params ${error}`)
    })

}