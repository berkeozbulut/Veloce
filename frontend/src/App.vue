<script setup>
import router from './router';
import { RouterLink, RouterView } from 'vue-router'
import Sepet from '@/components/sepet.vue'
import { reactive } from 'vue';
import logo from '@/assets/img/Veloce-logo1.svg'
import { isValidPassword, isPasswordConfirmed, isValidLogin } from './utils/validation';
import { Modal } from 'bootstrap/dist/js/bootstrap.min';

</script>

<template>

    <!-- !router linkler oluşturduk. Tıklanınca gidilecek yeri belirtiyor. -->
    <!-- !burada urlye göre routerdan fırlatılan componenti gösteriyoruz. -->

    <div class="container">
        <div class="header">
            <!--! header  -->
            <nav class="navbar navbar-expand-lg navbar-custom">
                <div class="container-fluid">
                    <RouterLink class="navbar-brand" to="/">
                        <img :src="logo" alt="Veloce Logo" class="logo-img">
                    </RouterLink>
                    <div class="d-flex align-items-center ms-auto order-lg-last">
                        <button type="button" class="navlink border-0 bg-transparent" @click="pageRouter()"
                            style="color: #991b1b;">
                            <span v-if="isLoggedIn">
                                <i class="bi bi-person fs-3"></i>
                            </span>
                            <span v-else class="text-nowrap">
                                <i class="bi bi-person-raised-hand fs-5"></i> Hi!
                            </span>
                        </button>
                    </div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                            <li class="nav-item">
                                <RouterLink class="navlink" to="/">Anasayfa</RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink class="navlink" to="/blog">Blog</RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink class="navlink" to="/product">Ürünlerimiz</RouterLink>
                            </li>
                            <!-- !buradan itibaren sağa yapıştır ayrı bir bölüm olsun  -->
                            <li class="nav-item">
                                <RouterLink class="navlink" to="/about">Hakkımızda</RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink class="navlink" to="/contact">İletişim</RouterLink>
                            </li>
                        </ul>
                        <form class="d-flex" role="search" @submit.prevent="search()">
                            <input v-model="searchText" class="form-control me-2" type="search" placeholder="Ürün ara"
                                aria-label="Search" />
                            <button class="search-button" type="submit">Ara</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
        <RouterView />
    </div>
    <!-- !Footer Part -->
    <footer class="container py-5 bg-body-tertiary mt-4 ">
        <div class="row">
            <div class="col-12 col-md">
                <RouterLink class="navbar-brand" to="/">
                    <img :src="logo" alt="Veloce Logo" style="height: 80px;">
                </RouterLink>
            </div>
            <div class="col-6 col-md">
                <h5>Keşfet</h5>
                <ul class="list-unstyled text-small">
                    <li>
                        <router-link to="/" class="link-secondary text-decoration-none">Anasayfa</router-link>
                    </li>
                    <li>
                        <router-link to="/blog" class="link-secondary text-decoration-none">Blog</router-link>
                    </li>
                    <li>
                        <router-link to="/product" class="link-secondary text-decoration-none">Ürünlerimiz</router-link>
                    </li>
                </ul>
            </div>
            <div class="col-6 col-md">
                <h5>Ekipman</h5>
                <ul class="list-unstyled text-small">
                    <li>
                        <router-link to="/product" class="link-secondary text-decoration-none">Tüm Ürünler</router-link>
                    </li>
                    <li>
                        <router-link :to="{ path: '/product', query: { q: 'kask' } }"
                            class="link-secondary text-decoration-none">Kasklar</router-link>
                    </li>
                    <li>
                        <router-link :to="{ path: '/product', query: { q: 'mont' } }"
                            class="link-secondary text-decoration-none">Montlar</router-link>
                    </li>
                    <li>
                        <router-link :to="{ path: '/product', query: { q: 'eldiven' } }"
                            class="link-secondary text-decoration-none">Eldivenler</router-link>
                    </li>
                </ul>
            </div>
            <div class="col-6 col-md">
                <h5>Kurumsal</h5>
                <ul class="list-unstyled text-small">
                    <li>
                        <router-link to="/about" class="link-secondary text-decoration-none">Hakkımızda</router-link>
                    </li>
                    <li>
                        <router-link to="/contact" class="link-secondary text-decoration-none">Bize Ulaşın</router-link>
                    </li>
                    <li>
                        <router-link to="/faq" class="link-secondary text-decoration-none">Sıkça Sorulan
                            Sorular</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <p class="text-muted text-center small mt-4 mb-0">© 2026 VELOCE. Tüm hakları saklıdır.</p>
    </footer>
    <!--! sepet-->
    <Sepet />
    <!--! Login model -->
    <div class="modal fade" id="loginModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="login-modal">
                    <div class="modal-header">
                        <ul class="nav nav-underline auth-tabs">
                            <li class="nav-item">
                                <button type="button" class="nav-link active">Giriş Yap</button>
                            </li>
                            <li class="nav-item">
                                <button type="button" class="nav-link" data-bs-toggle="modal"
                                    data-bs-target="#registerModal">Kaydol</button>
                            </li>
                        </ul>
                        <button type="button" id="loginClose" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="row" @submit.prevent="login()">
                            <div class="mb-3 col-12">
                                <label for="exampleInputEmail1" class="form-label">Email</label>
                                <input v-model="loginUser[0].email" type="email"
                                    placeholder="e-mail/Telefon/Kullanıcı Adı" class="form-control">

                            </div>
                            <div class="mb-5 col-12">
                                <label for="exampleInputPassword1" class="form-label">Parola</label>
                                <input v-model="loginUser[0].pass" type="password" class="form-control">
                            </div>
                            <div class="mb-3 form-check">
                                <input v-model="loginUser[0].check" type="checkbox" class="form-check-input">
                                <label @click.self="loginUser[0].check = !loginUser[0].check" style="cursor: pointer;"
                                    class="form-check-label" for="exampleCheck1">Gerçekten
                                    robot değilim</label>
                            </div>
                            <button type="submit" class="btn btn-dark" style="width: 100%;"><i
                                    class="bi bi-check2"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--! Register model -->
    <div class="modal fade" id="registerModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="register-modal">
                    <div class="modal-header">
                        <ul class="nav nav-underline auth-tabs">
                            <li class="nav-item">
                                <button type="button" class="nav-link" data-bs-toggle="modal"
                                    data-bs-target="#loginModal">Giriş Yap</button>
                            </li>
                            <li class="nav-item">
                                <button type="button" class="nav-link active">Kaydol</button>
                            </li>
                        </ul>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="row" @submit.prevent="register()">
                            <div class="mb-3 col-6">
                                <label for="exampleInputEmail1" class="form-label">Ad</label>
                                <input v-model="user[0].firstName" type="text" class="form-control">

                            </div>
                            <div class="mb-3 col-6">
                                <label for="exampleInputPassword1" class="form-label">Soyad</label>
                                <input v-model="user[0].lastName" type="text" class="form-control">
                            </div>
                            <div class="mb-3 col-6">
                                <label for="exampleInputPassword1" class="form-label">Email</label>
                                <input v-model="user[0].email" type="email" class="form-control">
                            </div>
                            <div class="mb-3 col-6">
                                <label class="form-label">Doğum Tarihi</label>
                                <input v-model="user[0].birthdate" type="date" class="form-control">
                            </div>
                            <div class="mb-3 col-6">
                                <label for="exampleInputPassword1" class="form-label">Parola</label>
                                <input v-model="user[0].pass" type="password" class="form-control">
                            </div>
                            <div class="mb-3 col-6">
                                <label for="exampleInputPassword1" class="form-label">Parola(tekrar)</label>
                                <input v-model="user[0].passRepeat" type="password" class="form-control">
                            </div>
                            <div class="mb-3 form-check">
                                <input v-model="user[0].check" type="checkbox" class="form-check-input"
                                    id="exampleCheck1">
                                <label style="cursor: pointer;" class="form-check-label" for="exampleCheck1">Gerçekten
                                    robot değilim</label>
                            </div>
                            <button type="submit" class="btn btn-dark" style="width: 100%;"><i
                                    class="bi bi-check2"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<script>



export default {

    data() {

        return {
            // reactive her yerde kullan ve güncelle için
            sepet: reactive([
            ]),
            user: [
                { firstName: "", lastName: "", email: "", pass: "", passRepeat: "", check: false, birthdate: "" },

            ],
            loginUser: [
                { email: "", pass: "", check: false },
            ],
            baseUrl: "http://localhost:3001",
            isLoggedIn: false,
            searchText: "",

        };

    },

    mounted() {

        this.syncAuth();

    },
    watch: {
        $route() {
            this.syncAuth();
            this.searchText = this.$route.query.q || "";
        },

    },
    provide() {
        // her sayfadan(views) veriyi toplamamıza yarıyor.
        return {

            sepet: this.sepet
        }
    },

    methods: {
        search() {
            const q = this.searchText.trim();
            router.push({ path: "/product", query: q ? { q } : {} });
        },
        syncAuth() {
            this.isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
        },
        pageRouter() {
            const role = sessionStorage.getItem("role");
            if (this.isLoggedIn && role === "0") {
                router.push("/user");
            }
            else if (this.isLoggedIn && role === "1") {
                router.push("/admin");
            }
            else {
                const loginModalElement = document.getElementById("loginModal");
                const loginModal = new Modal(loginModalElement);
                loginModal.show();
            }
        },

        // ! boş değer gittiğinde pass uyarısı veriyor onun dışında doğru ama bir bak 
        async register() {
            if (isPasswordConfirmed(this.user[0].pass, this.user[0].passRepeat, this.user[0].check)) {
                if (isValidPassword(this.user[0].pass)) {
                    try {
                        const res = await fetch(`${this.baseUrl}/api/register`, { //istekte bulunduğumuz yer.
                            method: "POST", // Post isteğinde bulunduk
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify({ // istekle beraber neleri yolluyorsun?
                                firstName: this.user[0].firstName,
                                lastName: this.user[0].lastName,
                                email: this.user[0].email,
                                pass: this.user[0].pass,
                                birthdate: this.user[0].birthdate
                            })
                        });
                        if (!res.ok) {
                            const errorData = await res.json();
                            throw new Error(errorData.error)
                        };
                        const data = await res.json();
                        if (data) alert(data)
                        this.user[0].firstName = "";
                        this.user[0].lastName = "";
                        this.user[0].email = "";
                        this.user[0].pass = "";
                        this.user[0].passRepeat = "";
                        this.user[0].check = false;
                        this.user[0].birthdate = "";

                        document.getElementById('loginlink')?.click()  // for get login modal 
                    }
                    catch (e) {
                        console.log(e.message);
                    }
                }
                else {
                    alert("En az 8 karakter ve en az 1 büyük harf ve '!@#$%^&*.' sembollerinden birini kullanmayı unutma :) ")
                }
            }
            else {
                alert("Ya tick atmadın ya da girilen parola uyuşmadı :(")
            }
        },
        async login() {
            if (isValidLogin(this.loginUser[0].email, this.loginUser[0].pass, this.loginUser[0].check)) {
                try {

                    const res = await fetch(`${this.baseUrl}/api/login`, { //istekte bulunduğumuz yer.
                        method: "POST", // Post isteğinde bulunduk
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({ // istekle beraber neleri yolluyorsun?
                            email: this.loginUser[0].email,
                            pass: this.loginUser[0].pass,
                        })

                    });
                    if (!res.ok) {
                        const errorData = await res.json();
                        throw new Error(errorData.error);
                    }
                    const data = await res.json();
                    if (data) {

                        alert("Giriş başarılı. Hoşgeldin" + " " + data[0].u_firstName)
                        sessionStorage.setItem("isLoggedIn", true);
                        sessionStorage.setItem("role", data[0].u_role);
                        sessionStorage.setItem("userId", data[0].u_id);
                        sessionStorage.setItem("token", data[0].token);
                        if (data[0].u_role == 1)
                            router.push("/admin");
                        else
                            router.push("/user");
                    }
                    this.loginUser[0].email = "";
                    this.loginUser[0].pass = "";
                    this.loginUser[0].check = false;

                    document.getElementById('loginClose')?.click() //for hide login modal  
                }
                catch (e) {
                    alert(e.message)
                }
            }
            else {
                alert("E-posta, parola ya da tick işaretli değil!")
            }
        },
    }
};
</script>
<style scoped>
.search-button {
    width: 60px;
    background-color: #991b1b;
    color: white;
    cursor: pointer;
    border: 0px;
    border-radius: 10px;
}
</style>
