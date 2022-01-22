function validateForm(fieldRequired, emailRequired, specificError, passwordRequired, summary, formSend) {
    console.log(formSend);
    const imie = document.getElementById('imie');
    const nazwisko = document.getElementById('nazwisko')
    const email = document.getElementById('email')
    const numerTelefonu = document.getElementById('nr_telefonu');
    const password = document.getElementById('password');

    const errorImie = document.getElementById('errorName');
    const errorNazwisko = document.getElementById('errorSurname');
    const errorMail = document.getElementById('errorMail');
    const errorPhone = document.getElementById('errorPhone');
    const errorPassword = document.getElementById('errorPassword');
    const errorsSummary = document.getElementById('errorsSummary');

    let valid = true;

    resetErrors([imie, nazwisko, email, numerTelefonu], [errorImie, errorNazwisko, errorMail, errorPhone],errorsSummary)

    if (!checkRequired(imie.value)) {
        valid = false;
        imie.classList.add('error-input');
        errorImie.innerText = fieldRequired;
    }else if (!checkTextLengthRange(imie.value, 2, 60)) {
        valid = false;
        imie.classList.add('error-input');
        errorImie.innerText = specificError
    }
    
    if (!checkRequired(nazwisko.value)) {
        valid = false;
        nazwisko.classList.add('error-input');
        errorNazwisko.innerText = fieldRequired;
    }else if (!checkTextLengthRange(nazwisko.value, 2, 60)) {
        valid = false;
        nazwisko.classList.add('error-input');
        errorNazwisko.innerText = specificError
    }
    
    if (!checkRequired(email.value)) {
        valid = false;
        email.classList.add('error-input');
        errorMail.innerText = fieldRequired;
    }else if (!checkEmail(email.value)) {
        valid = false;
        email.classList.add('error-input');
        errorMail.innerText = specificError
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
        errorMail.innerText = emailRequired
    }

    if(!checkRequired(password.value)){
        valid = false;
        password.classList.add('error-input');
        errorPassword.innerText = passwordRequired
    }

    if (!valid) {
        errorsSummary.innerText = summary
        errorsSummary.style.color = 'red';
    }

    const conf = confirm(formSend);
    if (conf) {
        return valid;
    }else {
        return false;
    }
}
