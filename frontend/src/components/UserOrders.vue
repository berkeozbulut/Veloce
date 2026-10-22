<script setup>
import { statusText } from '@/utils/orderStatus';
</script>

<template>
    <h4>Siparişlerim</h4>
    <p v-if="orders.length === 0" class="text-muted">Henüz siparişin yok.</p>
    <table v-else class="table table-striped">
        <thead>
            <tr>
                <th>#</th>
                <th>Sipariş No</th>
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
                <td>{{ order.o_products }}</td>
                <td>{{ order.o_address }}</td>
                <td>{{ Number(order.o_amount).toLocaleString('tr-TR') }} ₺</td>
                <td>{{ new Date(order.o_created_at).toLocaleString('tr-TR') }}</td>
                <td>{{ statusText(order.o_status) }}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import { authFetch } from '@/utils/auth';
export default {
    data() {
        return {
            orders: [],
            baseUrl: "http://localhost:3001",
        };
    },
    mounted() {
        this.getMyOrders();
    },
    methods: {
        statusText,
        async getMyOrders() {
            try {
                const id = sessionStorage.getItem("userId");
                const res = await authFetch(`${this.baseUrl}/api/orders/user/${id}`);
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error);
                }
                this.orders = await res.json();
            } catch (e) {
                alert(e.message);
            }
        },
    }
};
</script>