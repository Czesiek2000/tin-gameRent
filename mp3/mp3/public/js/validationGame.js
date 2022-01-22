function validateForm() {
    const name = document.getElementById('name');
    const releaseDate = document.getElementById('releaseDate');
    const description = document.getElementById('opis');
    const length = document.getElementById('length');

    const errorName = document.getElementById('errorName');
    const errorReleaseDate = document.getElementById('errorReleaseDate');
    const errorDescription = document.getElementById('errorDescription');
    const errorLength = document.getElementById('errorLength');

    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([name, releaseDate, description, length], [errorName, errorReleaseDate, errorDescription, errorLength],errorsSummary)

    let valid = true;

    if (!checkRequired(name.value)) {
        valid = false;
        name.classList.add('error-input');
        errorName.innerText = "Pole jest wymagane";
    }else if (!checkTextLengthRange(name.value, 2, 60)) {
        valid = false;
        name.classList.add('error-input');
        errorName.innerText = "Pole powinno zawierac od 2 do 60 znakow";
    }
    
    
    if (!checkDate(releaseDate.value)) {
        valid = false;
        releaseDate.classList.add('error-input');
        errorReleaseDate.innerText = "Wartosc pola jest bledna"
    }

    if (!checkRequired(description.value)) {
        valid = false;
        description.classList.add('error-input');
        errorDescription.innerText = "Pole jest wymagane";
    }else if (!checkTextLengthRange(description.value, 2, 400)) {
        valid = false;
        description.classList.add('error-input');
        errorDescription.innerText = "Pole powinno zawierac od 2 do 400 znakow";
    }

    if (!checkRequired(length.value)) {
        valid = false;
        length.classList.add('error-input');
        errorLength.innerText = "Wartosc jest wymagana";
    }else if (!checkNumber(length.value)) {
        valid = false;
        length.classList.add('error-input');
        errorLength.innerText = "Pole powinno byc cyfra";
    }
    
    if(!valid){ 
        errorsSummary.innerText = 'Formularz zawiera błedy';
        errorsSummary.style.color = 'red';
    }

    const conf = confirm('Czy chcesz dodac gre?');
    if(conf){
        return valid;
    }else{
        return false;
    }
}