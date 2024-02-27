const personsMessages = document.querySelector('.persons-card-messages');
const persons = document.querySelector('.persons-card');

let personsMessageCheck = false;


document.getElementById('personsCardFlip').addEventListener('click', function() {
    if (personsMessageCheck === false) {
messagesActive();
    } else {
        messageNonActive();
    }
});


// laat person message verschijnen op het beeld
function messagesActive() {
    personsMessageCheck = true;
    personsMessages.classList.add('persons-card-messages-active');
}

// laat person message verwijderen van het beeld
function messageNonActive() {
    personsMessageCheck = false;
    personsMessages.classList.remove('persons-card-messages-active');
}

