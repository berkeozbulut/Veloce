<template>
    <div v-if="alert.show" class="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1070;"
        @click="close"></div>
    <div v-if="alert.show" class="v-alert position-fixed top-50 start-50 translate-middle" style="z-index: 1075;"
        role="alert">
        <div class="v-alert-icon"><i class="bi" :class="icon"></i></div>
        <h5>{{ alert.title }}</h5>
        <p>{{ alert.message }}</p>
        <button v-if="alert.mode === 'alert'" type="button" class="btn btn-veloce" @click="close">Tamam</button>
        <div v-else class="d-flex justify-content-center gap-2">
            <button type="button" class="btn btn-veloce" @click="answer(true)">Evet</button>
            <button type="button" class="btn btn-outline-secondary px-4" @click="answer(false)">Vazgeç</button>

        </div>
    </div>
</template>
<script>
import { alertState, closeAlert, answerConfirm } from "@/utils/alert";
export default {
    data() {
        return { alert: alertState };
    },
    computed: {
        icon() {
            const icons = { success: "bi-check-lg", warning: "bi-exclamation-lg", danger: "bi-x-lg" };
            return icons[this.alert.variant];
        }
    },
    methods: {
        close() {
            if (this.alert.mode === "confirm") answerConfirm(false);
            else closeAlert();
        },
        answer(value) { answerConfirm(value); }
    }
}
</script>
<style scoped>
.v-alert {
    width: min(90vw, 380px);
    background: white;
    border-radius: 12px;
    border-top: 5px solid #991b1b;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    padding: 28px 24px 22px;
    text-align: center;
}

.v-alert-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 12px;
    border-radius: 50%;
    background: #fdecec;
    color: #991b1b;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
}

.v-alert h5 {
    font-weight: 700;
    margin-bottom: 6px;
}

.v-alert p {
    color: #6c757d;
    margin-bottom: 18px;
}

.btn-veloce {
    background: #991b1b;
    color: white;
    padding: 8px 32px;
}

.btn-veloce:hover {
    background: #7f1d1d;
    color: white;
}
</style>