function validateForm() {
    const imie = document.getElementById('imie');
    const nazwisko = document.getElementById('nazwisko')
    const email = document.getElementById('email')
    const numerTelefonu = document.getElementById('nr_telefonu');
    // const data = document.getElementById('date');

    const errorImie = document.getElementById('errorName');
    const errorNazwisko = document.getElementById('errorSurname');
    const errorMail = document.getElementById('errorMail');
    const errorPhone = document.getElementById('errorPhone');
    // const errorData = document.getElementById('errorDate');
    const errorsSummary = document.getElementById('errorsSummary');

    let valid = true;

    resetErrors([imie, nazwisko, email, numerTelefonu], [errorImie, errorNazwisko, errorMail, errorPhone],errorsSummary)

    if (!checkRequired(imie.value)) {
        valid = false;
        imie.classList.add('error-input');
        errorImie.innerText = "Pole jest wymagane";
    }else if (!checkTextLengthRange(imie.value, 2, 60)) {
        valid = false;
        imie.classList.add('error-input');
        errorImie.innerText = "Pole powinno zawierac od 2 do 60 znaków"
    }
    
    if (!checkRequired(nazwisko.value)) {
        valid = false;
        nazwisko.classList.add('error-input');
        errorNazwisko.innerText = "Pole jest wymagane";
    }else if (!checkTextLengthRange(nazwisko.value, 2, 60)) {
        valid = false;
        nazwisko.classList.add('error-input');
        errorNazwisko.innerText = "Pole powinno zawierac od 2 do 60 znaków"
    }
    
    if (!checkRequired(email.value)) {
        valid = false;
        email.classList.add('error-input');
        errorMail.innerText = "Pole jest wymagane";
    }else if (!checkEmail(email.value)) {
        valid = false;
        email.classList.add('error-input');
        errorMail.innerText = "Pole powinno zawierac od 2 do 60 znaków"
    }

    // if (checkNumberRange(numerTelefonu.value, 9, 9)) {
    //     valid = false;
    //     numerTelefonu.classList.add('error-input');
    //     errorPhone.innerText = "Pole powinno zawierac 9 cyfr"
    // }else if(!checkTextLengthRange(numerTelefonu.value, 9, 9)){
    //     valid = false;
    //     numerTelefonu.classList.add('error-input');
    //     errorPhone.innerText = "Pole powinno zawierac 9 cyfr"
    // }

    if(!checkEmail(email.value)){
        valid = false;
        email.classList.add('error-input');
        errorMail.innerText = "Pole powinno zawierac poprawny email"
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błedy"
        errorsSummary.style.color = 'red';
    }

    const conf = confirm('Czy chcesz wysłać formularz?');
    if (conf) {
        return valid;
    }else {
        return false;
    }
}
