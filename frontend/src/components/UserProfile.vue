<template>
    <h4>Kişisel Bilgilerim</h4>

    <!-- 1. Kişisel bilgiler -->
    <div class="card mb-4">
        <div class="card-body">
            <form @submit.prevent="updateProfile()" class="row g-3">
                <div class="col-md-6">
                    <label class="form-label">Ad</label>
                    <input v-model="profile.u_firstName" type="text" class="form-control" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Soyad</label>
                    <input v-model="profile.u_lastName" type="text" class="form-control" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label">E-posta</label>
                    <input v-model="profile.u_email" type="email" class="form-control" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Doğum Tarihi</label>
                    <input v-model="profile.u_birthdate" type="date" class="form-control" required>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-dark">Bilgilerimi Güncelle</button>
                </div>
            </form>
        </div>
    </div>

    <!-- 2. Şifre değiştirme -->
    <div class="card mb-4">
        <div class="card-body">
            <h5 class="card-title">Şifre Değiştir</h5>
            <form @submit.prevent="changePassword()" class="row g-3">
                <div class="col-md-4">
                    <label class="form-label">Mevcut Şifre</label>
                    <input v-model="passwords.currentPass" type="password" class="form-control" required>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Yeni Şifre</label>
                    <input v-model="passwords.newPass" type="password" class="form-control" required>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Yeni Şifre (tekrar)</label>
                    <input v-model="passwords.newPassRepeat" type="password" class="form-control" required>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-change-pass">Şifremi Değiştir</button>
                </div>
            </form>
        </div>
    </div>

    <!-- 3. Hesap silme -->
    <div class="card border-danger">
        <div class="card-body">
            <h5 class="card-title text-danger">Hesabı Sil</h5>
            <p class="text-muted">Hesabını silersen bu işlem geri alınamaz.</p>
            <button @click="deleteAccount()" class="btn btn-outline-danger">Hesabımı Sil</button>
        </div>
    </div>
</template>

<script>
import { clearSession, authFetch } from '@/utils/auth';
import { isValidPassword } from '@/utils/validation';

export default {
    data() {
        return {
            profile: { u_firstName: "", u_lastName: "", u_email: "", u_birthdate: "" },
            passwords: { currentPass: "", newPass: "", newPassRepeat: "" },
            baseUrl: "http://localhost:3001",
        };
    },
    mounted() {
        this.getProfile();
    },
    methods: {
        async getProfile() {
            try {
                const id = sessionStorage.getItem("userId");
                const res = await authFetch(`${this.baseUrl}/api/users/${id}`);
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error);
                }
                this.profile = await res.json();
            } catch (e) {
                alert(e.message);
            }
        },
        async updateProfile() {
            try {
                const id = sessionStorage.getItem("userId");
                const res = await authFetch(`${this.baseUrl}/api/users/${id}/profile`, {
                    method: "PUT",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        firstName: this.profile.u_firstName,
                        lastName: this.profile.u_lastName,
                        email: this.profile.u_email,
                        birthdate: this.profile.u_birthdate
                    })
                });
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error);
                }
                const data = await res.json();
                alert(data.message);
            } catch (e) {
                alert(e.message);
                this.getProfile(); // hata olursa ekranı veritabanındaki bilgilere döndür
            }
        },
        async changePassword() {
            if (this.passwords.newPass !== this.passwords.newPassRepeat) {
                alert("Yeni şifreler birbiriyle uyuşmuyor");
                return;
            }
            if (!isValidPassword(this.passwords.newPass)) {
                alert("Yeni şifre en az 8 karakter olmalı; en az 1 büyük harf, 1 rakam ve '!@#$%^&*.' sembollerinden birini içermeli");
                return;
            }
            try {
                const id = sessionStorage.getItem("userId");
                const res = await authFetch(`${this.baseUrl}/api/users/${id}/password`, {
                    method: "PUT",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        currentPass: this.passwords.currentPass,
                        newPass: this.passwords.newPass
                    })
                });
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error);
                }
                const data = await res.json();
                alert(data.message);
                this.passwords = { currentPass: "", newPass: "", newPassRepeat: "" };
            } catch (e) {
                alert(e.message);
            }
        },
        async deleteAccount() {
            if (!confirm("Hesabını silmek istediğine emin misin? Bu işlem geri alınamaz.")) return;
            try {
                const id = sessionStorage.getItem("userId");
                const res = await authFetch(`${this.baseUrl}/api/users/${id}`, { method: "DELETE" });
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error);
                }
                clearSession();
                alert("Hesabın silindi");
                this.$router.push("/");
            } catch (e) {
                alert(e.message);
            }
        }
    }
};
</script>
<style scoped>
.btn-change-pass {
 
    width: 15%;
    border: 2px solid  #991b1b;
    border-color: #991b1b;
    border-radius: 15px;
    background-color: #991b1b;
    color: white;
    padding: 6px 20px;
}
</style>