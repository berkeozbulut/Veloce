<script setup>
import AdminProducts from '@/components/AdminProducts.vue';
import AdminMessages from '@/components/AdminMessages.vue';
import AdminUsers from '@/components/AdminUsers.vue'
import AdminOrders from '@/components/AdminOrders.vue';
import { clearSession } from '@/utils/auth';
import '@/assets/main.css';
</script>


<template>
    <div class="admin-layout">

        <aside class="admin-sidebar d-flex flex-column p-3">
            <div class="d-flex flex-column align-items-center mb-4">
                <i class="bi bi-person-circle fs-3"></i>
                <span> <b>Admin / </b>{{ username }}</span>
            </div>
            <nav>
                <!-- <button @click="state = 'products'"
                    :class="state == 'products' ? 'btn btn-primary mb-3 w-100' : 'btn btn-outline-primary mb-3 w-75'"
                    class="admin-btn">Ürünler</button>
                <button @click="state = 'messages'"
                    :class="state == 'messages' ? 'btn btn-primary mb-3 w-100' : 'btn btn-outline-primary mb-3 w-75'"
                    class="admin-btn">Mesajlar</button>
                <button @click="state = 'users'"
                    :class="state == 'users' ? 'btn btn-primary mb-3 w-100' : 'btn btn-outline-primary mb-3 w-75'"
                    class="admin-btn">Kullanıcılar</button>
                <button @click="state = 'orders'"
                    :class="state == 'orders' ? 'btn btn-primary mb-3 w-100' : 'btn btn-outline-primary mb-3 w-75'"
                    class="admin-btn">Siparişler</button> -->
                <button v-for="item in menuItems" :key="item.key" @click="state = item.key"
                    class="btn admin-btn mb-4 w-100"
                    :class="state === item.key ? 'admin-btn-active' : 'admin-btn-passive'">
                    <i class="bi me-3" :class="item.icon"></i>
                    {{ item.label }}
                </button>
            </nav>

            <div class="mt-auto">
                <button @click="logOut()" class="btn admin-btn admin-btn-active">Çıkış
                    Yap</button>
            </div>
        </aside>

        <main class="admin-content">
            <div v-if="state == 'products'">
                <AdminProducts />
            </div>
            <div v-if="state == 'messages'">
                <AdminMessages />
            </div>
            <div v-if="state == 'users'">
                <AdminUsers />
            </div>
            <div v-if="state == 'orders'">
                <AdminOrders />
            </div>
        </main>

    </div>

</template>
<script>

export default {

    data() {

        return {
            state: "products",
            username: "Giriş Yap",
            baseUrl: "http://localhost:3001",
            menuItems: [
                { key: 'products', label: 'Ürünler', icon: 'bi-box2' },
                { key: 'messages', label: 'Mesajlar', icon: 'bi-envelope' },
                { key: 'orders', label: 'Siparişler', icon: 'bi-signpost-split-fill' },
                { key: 'users', label: 'Kullanıcılar', icon: 'bi-person-arms-up' },
            ],
        };

    },
    mounted() {
        this.getUsername()
    },

    methods: {
        async getUsername() {
            try {
                const id = sessionStorage.getItem("userId");
                const res = await fetch(`${this.baseUrl}/api/getUsername`, { //istekte bulunduğumuz yer.
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
        logOut() {
            clearSession();
            this.$router.push("/")
        }
    },

};

</script>

<style scoped>
.admin-layout {
    display: flex;
    /* sidebar + içerik yan yana */
}

.admin-sidebar {
    width: 200px;
    flex-shrink: 0;
    min-height: calc(100vh - 100px);
    border-right: 1px solid black;
    align-items: center;
}

.admin-content {
    flex: 1;
    /* kalan genişliği içerik alsın */
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
    background-color: black;
    color: white;
}

.bi-person-arms-up {
    margin-right: 3px;
}
</style>