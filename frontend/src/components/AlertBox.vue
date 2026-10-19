<template>
    <div v-if="showAlert" class="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1055;"
        @click="showAlert = false"></div>
    <div v-if="showAlert" class="position-fixed top-50 start-50 translate-middle" style="z-index: 1060;">
        <div class="alert alert-dismissible" :class="'alert-' + variant" role="alert"><button type="button"
                class="btn-close" @click="showAlert = false"></button>
            <h4 class="alert-heading">{{ title }}</h4>
            <p>{{ message }}</p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        variant: { default: 'success' },
        title: String,
        message: String,
        duration: { type: Number, default: 5000 }
    },
    data() {
        return {
            showAlert: false,
            alertTimer: null
        };
    },
    methods: {
        open() {
            clearTimeout(this.alertTimer);
            this.showAlert = true;
            this.alertTimer = setTimeout(() => {
                this.showAlert = false
            }, this.duration);
        }
    }
}
</script>
<style scoped>
</style>