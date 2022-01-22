export function getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
}

export function isAuthenticated(){
    const user = getCurrentUser();
    if(user){
        return true;
    }
    return false;
}

export function isAdmin() {
    const user = getCurrentUser();
    // console.log(user);
    if(user){
        if(user.role === 1){
            return true;
        }
    }
    return false;
}