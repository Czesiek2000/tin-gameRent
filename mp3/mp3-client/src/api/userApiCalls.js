import { getCurrentUser } from "../helpers/authHelper";
import { usersList, userDetails } from "./userApiMockData";
const userBaseApiUrl = "http://localhost:3005/api/users";

export function getUsersApiCalls() {
    return fetch(userBaseApiUrl);
}

export function getUserDetailsApiCalls(id) {
    return fetch(userBaseApiUrl + "/" + id);
}

export function addUserApiCalls(user) {
    const currentUser = getCurrentUser();
    console.log(user);
    const userString = JSON.stringify({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phonenumber: user.phonenumber,
        password: user.password,
        role: user.role.length === 0 ? 0 : user.role,
    });
    let token;
    if(currentUser && currentUser.token){
        token = user.token;
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        body: userString,
    }
    const promise = fetch(userBaseApiUrl, options);
    // promise.then(response => console.log(response));
    return promise;
}

export function updateUserApiCalls(id, user) {
    console.log(id, user);
    // let u = { id: 1, firstname: 'Jan', lastname: 'Kowalski', email: 'jan.kowalski@pjwstk.edu.pl', phonenumber: '123456789', password: '12345' };
    // let u = { id: id, firstname: user.firstname, lastname: user.lastname, email: user.email, phonenumber: user.phonenumber, password: `${user.password}` };
    const userString = JSON.stringify(user);
    console.log(JSON.parse(userString));
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: userString,
    }

    console.log(options, JSON.parse(options.body));
    // console.log({ user, id });
    const promise = fetch('http://localhost:3005/api/users'+"/"+id, options);
    return promise;
}