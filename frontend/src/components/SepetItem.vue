<template>
  <div class="card mb-2 shadow-sm">
    <div class="card-body p-2 d-flex gap-2">
      <img v-if="item.p_images" :src="baseUrl + item.p_images" :alt="item.p_name" class="sepet-img">
      <div class="flex-grow-1" style="min-width: 0;">
        <div class="d-flex justify-content-between align-items-start gap-2">
          <div class="sepet-name fw-semibold">{{ item.p_name }}</div>
          <i class="bi bi-trash3 text-muted" style="cursor: pointer;" @click="deleteItem"></i>
        </div>
        <small class="text-muted">Birim: {{ Number(item.p_price).toLocaleString('tr-TR') }} TL</small>
        <div class="d-flex justify-content-between align-items-center mt-1">
          <div class="qty d-inline-flex align-items-center">
            <button type="button" @click="decrease"><i class="bi bi-dash"></i></button>
            <span class="px-1 fw-semibold">{{ item.quantity }}</span>
            <button type="button" @click="increase"><i class="bi bi-plus"></i></button>
          </div>
          <b>{{ (Number(item.p_price) * item.quantity).toLocaleString('tr-TR') }} TL</b>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { showAlert } from '@/utils/alert';
export default {
  inject: ['sepet'],
  props: {
    item: Object,
    index: Number
  },
  data() {
    return {
      baseUrl: "http://localhost:3001",
    };
  },
  methods: {
    deleteItem() {
      this.sepet.splice(this.index, 1);
    },
    increase() {
      if (this.item.quantity >= Number(this.item.p_stock)) {
        showAlert("Stok adedi kadar ürün ekleyebilirsiniz.", "warning");
        return;
      }
      this.item.quantity++;
    },
    decrease() {
      if (this.item.quantity > 1) this.item.quantity--;
      else this.deleteItem();
    }
  }
};
</script>
<style scoped>
.sepet-img {
  width: 64px;
  height: 64px;
  object-fit: contain;
  flex-shrink: 0;
  background: #f8f9fa;
  border-radius: 8px;
}
.sepet-name {
  font-size: 0.95rem;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.qty {
  border: 1px solid #dee2e6;
  border-radius: 50rem;
}
.qty button {
  border: 0;
  background: none;
  width: 30px;
  height: 30px;
  color: #991b1b;
}
.qty button:hover {
  background: #fdecec;
  border-radius: 50%;
}
</style>