import { reactive } from "vue";

const defaultTitles = { success: "Harika!", danger: "Bir sorun var", warning: "Dikkat" };

export const alertState = reactive({ show: false, mode: "alert", variant: "success", title: "", message: "" });

let timer = null;
let resolver = null;

export function showAlert(message, variant = "success", title = "") {
    if (resolver) { resolver(false); resolver = null; }
    alertState.mode = "alert";
    alertState.message = message;
    alertState.variant = variant;
    alertState.title = title || defaultTitles[variant];
    alertState.show = true;
    clearTimeout(timer);
    timer = setTimeout(() => { alertState.show = false; }, 4000);
}

export function showConfirm(message, title = "Emin misin?") {
    clearTimeout(timer);
    alertState.mode = "confirm";
    alertState.message = message;
    alertState.variant = "warning";
    alertState.title = title;
    alertState.show = true;
    return new Promise((resolve) => { resolver = resolve; });
}

export function answerConfirm(answer) {
    alertState.show = false;
    if (resolver) { resolver(answer); resolver = null; }
}

export function closeAlert() {
    alertState.show = false;
    clearTimeout(timer);
}