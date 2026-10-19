<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>#</th>
                <th>Sipariş No</th>
                <th>Müşteri</th>
                <th>Ürünler</th>
                <th>Adres</th>
                <th>Tutar</th>
                <th>Tarih</th>
                <th>Durum</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="order, index in orders" :key="order.o_id">
                <th>{{ index + 1 }}</th>
                <td>{{ order.o_no }}</td>
                <td>{{ order.o_person }}</td>
                <td>{{ order.o_products }}</td>
                <td>{{ order.o_address }}</td>
                <td>{{ Number(order.o_amount).toLocaleString('tr-TR') }} ₺</td>
                <td>{{ new Date(order.o_created_at).toLocaleString('tr-TR') }}</td>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <select class="form-select" v-model="order.o_status">
                            <option :value="1">Hazirlaniyor</option>
                            <option :value="2">Kargoya Verildi</option>
                            <option :value="3">Teslim Edildi</option>
                            <option :value="0">İptal Edildi</option>
                        </select>
                        <i v-if="Number(order.o_status) === 1" class="bi bi-hourglass-split"></i>
                        <i v-else-if="Number(order.o_status) === 2" class="bi bi-box-seam"></i>
                        <i v-else-if="Number(order.o_status) === 3" class="bi bi-check-circle-fill text-success"></i>
                        <i v-else class="bi bi-x-circle-fill text-danger"></i>

                        <button @click="updateOrder(order.o_id, order.o_status)"
                            class="btn btn-outline-primary btn-sm m-1">Güncelle</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>

export default {

    data() {

        return {
            orders: [],
            baseUrl: "http://localhost:3001",
        };

    },

    mounted() {
        // Get and mount Orders
        this.getOrders()
    },

    methods: {
        async getOrders() {
            try {
                const res = await fetch(`${this.baseUrl}/api/orders`);
                if (!res.ok) throw new Error("orders endpoint hatası");
                this.orders = await res.json();
            } catch (e) {
                console.log(e.message);
            }
        },

        async updateOrder(o_id, o_status) {
            try {
                const res = await fetch(`${this.baseUrl}/api/orders/${o_id}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },

                    body: JSON.stringify({
                        id: o_id,
                        status: o_status
                    })
                });
                if (!res.ok) throw new Error("updateOrder endpoint hatası");

                const data = await res.json();
                if (data) alert("Sipariş Durumu Güncellendi.")
            }
            catch (e) {
                console.log(e);
            }
        },
    }
}
</script>
<style scoped></style>