<template>
    <h4 class="mb-4">Hoş geldin, {{ summary.firstName }}</h4>

    <div class="row g-3">
        <div class="col-md-4">
            <div class="card h-100">
                <div class="card-body">
                    <p class="text-muted mb-1">Toplam Sipariş</p>
                    <h3>{{ summary.orderCount }}</h3>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card h-100">
                <div class="card-body">
                    <p class="text-muted mb-1">Toplam Harcama</p>
                    <h3>{{ summary.totalSpent.toLocaleString('tr-TR') }} ₺</h3>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card h-100">
                <div class="card-body">
                    <p class="text-muted mb-1">Son Sipariş</p>
                    <div v-if="summary.lastOrder">
                        <h5 class="mb-1">{{ summary.lastOrder.o_no }}</h5>
                        <p class="mb-0">{{ statusText(summary.lastOrder.o_status) }}</p>
                        <small class="text-muted">{{ new Date(summary.lastOrder.o_created_at).toLocaleDateString('tr-TR') }}</small>
                    </div>
                    <p v-else class="mb-0">Henüz siparişin yok.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { statusText } from '@/utils/orderStatus';

export default {
    data() {
        return {
            summary: { firstName: "", orderCount: 0, totalSpent: 0, lastOrder: null },
            baseUrl: "http://localhost:3001",
        };
    },
    mounted() {
        this.getSummary();
    },
    methods: {
        statusText,
        async getSummary() {
            try {
                const id = sessionStorage.getItem("userId");
                const res = await fetch(`${this.baseUrl}/api/orders/user/${id}/summary`);
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error);
                }
                this.summary = await res.json();
            } catch (e) {
                alert(e.message);
            }
        }
    }
};
</script>