export function isValidPassword(pass) {
    if (pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass) && /[!@#$%^&*.]/.test(pass)) {
        return true;
    }
    else {
        return false;
    }
}
export function isPasswordConfirmed(pass, passRepeat, check) {
    if (pass == passRepeat && check)
        return true;
    else

        return false;

}
export function isValidLogin(email, pass, check) {
    if (email !== "" && pass !== "" && check)
        return true;
    else
        return false;
}