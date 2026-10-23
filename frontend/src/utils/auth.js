import router from "@/router";
import { showAlert } from "./alert";
export function clearSession() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("token");
}

export async function authFetch(url, options = {}){
    const token= sessionStorage.getItem("token");

    const res = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: "Bearer " + token
        }
    });

    if(res.status === 401) {
        clearSession();
        showAlert("Oturumunuz sona erdi, lütfen tekrar giriş yapın.","warning");
        router.push("/");
    }
    return res;
}