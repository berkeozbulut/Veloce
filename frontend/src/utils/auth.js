export function clearSession() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("token");
}