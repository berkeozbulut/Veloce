import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import Blog from '@/views/Blog.vue'
import About from '@/views/About.vue'
import faq from '@/views/faq.vue'
import Contact from '@/views/Contact.vue'
import Product from '@/views/Product.vue'
import Admin from '@/views/Admin.vue'
import Checkout from '@/views/Checkout.vue'
import User from '@/views/User.vue'
import Forbidden from '@/views/403.vue'
import { clearSession } from '@/utils/auth'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/blog',
            name: 'blog',
            component: Blog,
        },
        {
            path: '/about',
            name: 'about',
            component: About,
        },
        {
            path: '/contact',
            name: 'contact',
            component: Contact,
        },
        {
            path: '/product',
            name: 'product',
            component: Product,
        },
        {
            path: '/faq',
            name: 'faq',
            component: faq,
        },
        {
            path: '/403',
            name: '403',
            component: Forbidden,
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            meta: { requiresAuth: true, roles: ["1"] } // sayfaya giderken meta verisi ekledik.
        },
        {
            path: '/user',
            name: 'user',
            component: User,
            meta: { requiresAuth: true, roles: ["0"] } // sayfaya giderken meta verisi ekledik.
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: Checkout,
        },
    ],
})

router.beforeEach(async (to) => { // kullanıcı hangi sayfaya gitmek isterse istesin önce burası çalışır

    if (!to.meta.requiresAuth) return true; // korumasız sayfa → geç

    const token = sessionStorage.getItem("token");
    if (!token) return "/"; // giriş yapılmamış → ana sayfa

    try {
        const res = await fetch("http://localhost:3001/api/me", {
            headers: { Authorization: "Bearer " + token }
        });
        if (!res.ok) { // token geçersiz ya da süresi dolmuş
            clearSession();
            return "/";
        }
        const me = await res.json();
        if (!to.meta.roles.includes(String(me.role))) return "/403"; // rol uymuyor
        return true; // her şey tamam → geç
    } catch (e) {
        return "/"; // backend'e ulaşılamadı
    }
});

// router.beforeEach((to, from, next) => { //kullanıcı hangi sayfaya gitmek isterse istesin önce burası çalışır.

//     const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

//     const role = sessionStorage.getItem("role"); // "admin" | "user"

//     if (to.meta.requiresAuth && !isLoggedIn) { //Gidilen sayfa korumalı mı? ve Kullanıcı giriş yapmamış mı?

//        return next("/"); // login sayfasına at. izin yok.

//     }

//     if (to.meta.roles && !to.meta.roles.includes(role)) {

//         return next("/403"); // yetkisiz sayfa (yoksa)

//     }

//     next();

// });

export default router
