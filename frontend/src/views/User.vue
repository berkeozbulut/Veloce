<script setup>
import UserOrders from '@/components/UserOrders.vue';
import UserProfile from '@/components/UserProfile.vue';
import UserDashboard from '@/components/UserDashboard.vue';
import { clearSession, authFetch } from '@/utils/auth';
import { showAlert, showConfirm } from '@/utils/alert';
import '@/assets/main.css';

</script>

<template>
    <div class="admin-layout">

        <aside class="admin-sidebar d-flex flex-column p-3">
            <div class="d-flex flex-column align-items-center mb-4">
                <i class="bi bi-person-circle fs-3"></i>
                <span>{{ username }}</span>
            </div>
            <nav>
                <button v-for="item in menuItems" :key="item.key" @click="state = item.key"
                    class="btn admin-btn mb-4 w-100"
                    :class="state === item.key ? 'admin-btn-active' : 'admin-btn-passive'">
                    {{ item.label }}
                </button>
            </nav>

            <div class="mt-auto">
                <button @click="logout()" class="btn admin-btn admin-btn-active">Çıkış
                    Yap</button>
            </div>
        </aside>

        <main class="admin-content">
            <div v-if="state == 'dashboard'">
                <UserDashboard />
            </div>
            <div v-if="state == 'orders'">
                <UserOrders />
            </div>
            <div v-if="state == 'profile'">
                <UserProfile />
            </div>

        </main>

    </div>

</template>
<script>

export default {

    data() {

        return {
            menuItems: [
                { key: 'dashboard', label: 'Özet' },
                { key: 'orders', label: 'Siparişlerim' },
                { key: 'profile', label: 'Kişisel Bilgilerim' },

            ],
            state: "dashboard",
            username: "Giriş Yap",
            baseUrl: "http://localhost:3001",

        };

    },
    mounted() {
        this.getUsername();
    },

    methods: {
        async getUsername() {
            try {
                const id = sessionStorage.getItem("userId");
                const res = await authFetch(`${this.baseUrl}/api/getUsername`, { //istekte bulunduğumuz yer.
                    method: "POST", // Put isteğinde bulunduk
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ // istekle beraber neleri yolluyorsun?
                        id: id
                    })

                });
                if (!res.ok) throw new Error(res.error);

                const data = await res.json();
                if (data) this.username = data;
            }
            catch (e) {
                console.log(e);
            }
        },
        async logout() {
            if (!(await showConfirm("Çıkış yapmak istediğine emin misin?"))) return;
            clearSession();
            this.$router.push("/");
            showAlert("Yine bekleriz!", "success", "Çıkış yapıldı");
        }
    },

};

</script>

<style scoped>
.admin-layout {
    display: flex;

}

.admin-sidebar {
    width: 200px;
    flex-shrink: 0;
    min-height: calc(100vh - 100px);
    border-right: 1px solid black;
}

.admin-content {
    flex: 1;
    padding-left: 10px;
}

.admin-btn {
    border-radius: 18px;
}

.admin-btn-active {
    --bs-btn-bg: #991b1b;
    --bs-btn-border-color: #991b1b;
    --bs-btn-hover-bg: #7f1d1d;
    --bs-btn-hover-border-color: #7f1d1d;
    --bs-btn-active-bg: #7f1d1d;
    --bs-btn-active-border-color: #7f1d1d;
    color: white;
}

.admin-btn-active:hover {
    box-shadow: 0 0 12px rgba(153, 27, 27, 0.4);
}

.admin-btn-passive {
    background-color: rgb(84, 84, 84);
    color: white;
}
</style>