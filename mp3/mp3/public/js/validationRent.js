function validateForm() {
    const userId = document.getElementById('userId');
    const gameId = document.getElementById('gameId');
    const gameCount = document.getElementById('game_count');
    const date = document.getElementById('to_when');

    const userIdError = document.getElementById('errorUserId');
    const gameIdError = document.getElementById('errorGameId');
    const gameCountError = document.getElementById('gameCountError');
    const dateError = document.getElementById('errorDate');

    const errorsSummary = document.getElementById('errorsSummary');

    let valid = true;

    resetErrors([userId, gameId, gameCount, date], [userIdError, gameIdError, gameCountError, dateError], errorsSummary);

    if(!checkRequired(userId.value)) {
        valid = false;
        userId.classList.add('error-input');
        userIdError.innerText = 'To pole jest wymagane';
    }

    if(!checkRequired(gameId.value)) {
        valid = false;
        gameId.classList.add('error-input');
        gameIdError.innerText = 'To pole jest wymagane';
    }

    if(!checkRequired(gameCount.value)) {
        valid = false;
        gameCount.classList.add('error-input');
        gameCountError.innerText = 'To pole jest wymagane';
    }

    if(!checkRequired(date.value)) {
        valid = false;
        date.classList.add('error-input');
        dateError.innerText = 'To pole jest wymagane';
    }

    if(!valid) {
        errorsSummary.innerText = "Formularz zawiera bledy";
        errorsSummary.style.color = 'red';
    }
    
    if(confirm("Czy chcesz wysłac formularz?")){
        return valid;
    }else {
        return false;
    }
}
