<template>

    <div class="bg-body-tertiary">
        <div class="container">
            <main>
                <div class="py-5 text-center">
                    <i class="bi bi-check-circle-fill"></i>
                    <h1>Ödeme Sayfası</h1>
                </div>
                               <div class="row g-5">
                    <!-- !Sepet Kısmı -->
                    <div class="col-lg-4 order-lg-last">
                        <h4 class="d-flex justify-content-between align-items-center mb-3">
                            <span class="text">Sepet</span>
                            <span class="text">{{ toplamAdet }} ürün mevcut</span>
                        </h4>

                        <SepetItem v-for="(value, index) in sepet" :key="value.p_id" :item="value" :index="index" />
                        <ul class="list-group mb-3 mt-3">
                            <li class="list-group-item d-flex justify-content-between">
                                <span>Ara Toplam (KDV hariç):</span>
                                <strong>{{ toplamTutar.toLocaleString('tr-TR') }} TL</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <span>KDV (%20):</span>
                                <strong>{{ (toplamTutar * 0.2).toLocaleString('tr-TR', { maximumFractionDigits: 2 }) }} TL</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <span>Toplam Tutar:</span>
                                <strong>{{ (toplamTutar * 1.2).toLocaleString('tr-TR', { maximumFractionDigits: 2 }) }} TL</strong>
                            </li>
                        </ul>

                    </div>
                    <!-- !Form Kısmı -->
                    <div class="col-lg-8">
                        <h4 class="mb-3">Sipariş Bilgileri</h4>
                        <form class="needs-validation" @submit.prevent="checkOut()">
                            <div class="row g-3">
                                <div class="col-sm-12">
                                    <label class="form-label">T.C. Kimlik No</label>
                                    <input type="text" v-model="order[0].TC" class="form-control"
                                        placeholder="Fatura için zorunludur." required />
                                </div>
                                <div class="col-sm-6">
                                    <label class="form-label">Ad</label>
                                    <input type="text" v-model="order[0].firstName" class="form-control" placeholder=""
                                        required />
                                </div>
                                <div class="col-sm-6">
                                    <label class="form-label">Soyad</label>
                                    <input type="text" v-model="order[0].lastName" class="form-control" placeholder=""
                                        required />
                                </div>

                                <div class="col-6">
                                    <label for="email" class="form-label">Email
                                    </label>
                                    <input type="email" v-model="order[0].email" class="form-control" placeholder="" />

                                </div>
                                <div class="col-6">
                                    <label class="form-label">Telefon Numarası
                                    </label>
                                    <input type="text" v-model="order[0].phone" class="form-control"
                                        placeholder="(5xx)-xxx-xxxx" />
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Adres Bilgileri</label>
                                    <textarea class="form-control" v-model="order[0].address" placeholder=""
                                        required></textarea>

                                </div>
                                <div class="col-md-5">
                                    <label for="country" class="form-label">Ülke</label>
                                    <select v-model="order[0].country" class="form-select" required>
                                        <option value="Türkiye">Türkiye</option>
                                        <option value="ABD">ABD</option>
                                    </select>

                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Şehir</label>
                                    <select v-model="order[0].state" class="form-select" required>
                                        <option value="İstanbul">İstanbul</option>
                                        <option value="Ankara">Ankara</option>
                                        <option value="İzmir">İzmir</option>
                                    </select>

                                </div>
                                <div class="col-md-3">
                                    <label class="form-label">Posta Kodu</label>
                                    <input type="text" v-model="order[0].zip" class="form-control" placeholder=""
                                        required />

                                </div>
                                <hr class="my-4" />
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" />
                                    <label class="form-check-label">Sipariş adresi ile fatura adresim aynı.</label>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" />
                                    <label class="form-check-label">Bilgilerimi sonraki sipariş için kaydet.</label>
                                </div>
                                <!-- !ödeme bilgileri -->
                                <hr class="my-4" />
                                <h4 class="mb-3">Ödeme</h4>
                                <div class="my-3">
                                    <div class="row gy-3">
                                        <div class="col-md-6">
                                            <label class="form-label">Kart Sahibi <small>(Ad-Soyad)</small></label>
                                            <input type="text" class="form-control" placeholder="" required />
                                            <div class="invalid-feedback">Kart sahibi girmek zorunludur.</div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Kredi Kartı Numarası</label>
                                            <input type="text" class="form-control" placeholder="" required />
                                            <div class="invalid-feedback">
                                                Kart numarası girmek zorunludur.
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <label for="cc-expiration" class="form-label">Son kullanma Tarihi</label>
                                            <input type="text" class="form-control" id="cc-expiration" placeholder=""
                                                required />
                                            <div class="invalid-feedback">Son kullanma tarihi girmek zorunludur.</div>
                                        </div>
                                        <div class="col-md-3">
                                            <label for="cc-cvv" class="form-label">CVV</label>
                                            <input type="text" class="form-control" id="cc-cvv" placeholder=""
                                                required />
                                            <div class="invalid-feedback">Güvenlik kodu zorunludur.</div>
                                        </div>
                                    </div>
                                    <hr class="my-4" />
                                    <button class="btn btn-primary btn-lg w-100"
                                        style="background-color: #991b1b; border-color: #991b1b;" type="submit">
                                        Siparişi Tamamla
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

        </div>
    </div>
</template>
<script>
import { authFetch } from '@/utils/auth';
import { showAlert } from '@/utils/alert';
import SepetItem from '@/components/SepetItem.vue';

export default {
    components: {SepetItem},
    inject: ['sepet'],
    data() {

        return {
            order: [
                { TC: "", firstName: "", lastName: "", email: "", phone: "", address: "", country: "Türkiye", state: "İstanbul", zip: "", }
            ],
            payment: [{
                // ! burayı bağla 
            }],
            baseUrl: "http://localhost:3001",

        };

    },

    mounted() {
        this.fillUserInfo();
    },
    computed: {
        toplamTutar() {
            return this.sepet.reduce(
                (toplam, urun) => toplam + Number(urun.p_price) * urun.quantity, 0
            )

        },
        toplamAdet() {
            return this.sepet.reduce((toplam, urun) => toplam + urun.quantity, 0)
        }
    },

    methods: {
        async fillUserInfo() {
            const id = sessionStorage.getItem("userId");
            if (!id) return; // misafir kullanıcı için
            try {
                const res = await authFetch(`${this.baseUrl}/api/users/${id}`);
                if (!res.ok) return; // bilgiler gelmezse form elle doldurulabilir
                const user = await res.json();
                this.order[0].firstName = user.u_firstName;
                this.order[0].lastName = user.u_lastName;
                this.order[0].email = user.u_email;
            } catch (e) {
                console.log(e.message);
            }
        },
        async checkOut() {
            if (!this.sepet.length) { showAlert("Sepetin boş, önce ürün eklemelisin.", "warning"); return; }
            try {
                const res = await fetch(`${this.baseUrl}/api/orders`, { //istekte bulunduğumuz yer.
                    method: "POST", // Post isteğinde bulunduk
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ // istekle beraber neleri yolluyorsun?
                        sepet: this.sepet,
                        order: this.order[0],
                        amount: this.toplamTutar * 1.2,
                        u_id: sessionStorage.getItem("userId")
                    })

                });
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error);
                }
                const data = await res.json();
                showAlert(data.message);
                this.sepet.splice(0);
            }
            catch (e) {
                showAlert(e.message, "danger");
            }

        }

    },

};

</script>

<style scoped></style>