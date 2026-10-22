<template>
  <div>

    <div class="sepet-icon">
      <a data-bs-toggle="offcanvas" href="#sepetBar">
        <i v-if="sepet.length" style="color: #991b1b;" class="bi bi-bag-check-fill fs-2"></i>
        <i v-else style="color: #991b1b;" class="bi bi-bag-dash fs-2"></i>
        <span v-if="sepet.length > 0"
          class="badge rounded-pill bg-dark position-absolute top-0 start-100 translate-middle">{{ totalCount }}</span>
      </a>
    </div>

    <!-- !sepet side bar -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="sepetBar">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">Alışveriş Sepetim</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <hr>
      <div class="offcanvas-body">
        <div class="row mb-3">
          <div class="col-4"><b>Ürün:</b></div>
          <div class="col-3"><b>Adet:</b></div>
          <div class="col-4"><b>Fiyat:</b></div>
        </div>
        <div class="row" v-for="value, index in sepet" :key="value.p_id">
          <div class="col-4">{{ value.p_name }}</div>
          <div class="col-3">{{ value.quantity }} Adet</div>
          <div class="col-4">{{ value.p_price }} TL</div>
          <div class="col-1">
            <i style="cursor: pointer;" @click.self="deleteItem(index)" class="bi bi-x-lg"></i>
          </div>
        </div>
        <hr>
        <div class="row mt-3">
          <div class="col-7"><b>Ara Toplam (+KDV):</b></div>
          <!-- !burayı computed la hesapla -->
          <div class="col-5"><b>{{ toplamTutar }} TL</b></div>
        </div>

        <div>
          <button class="btn btn-success w-100 mt-5" style="background-color: #991b1b" @click="goCheckout()">Ödeme
            Sayfasına Git</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  inject: ['sepet'],
  data() {

    return {
    };

  },

  mounted() {
  },
  computed: {
    totalCount() {
      let toplam = 0;
      for (let i = 0; i < this.sepet.length; i++) {
        toplam += this.sepet[i].quantity;
      }
      return toplam;
    },
    toplamTutar() {
      return this.sepet.reduce((toplam, urun) => toplam + Number(urun.p_price) * urun.quantity, 0)
    }
  },

  methods: {
    goCheckout() {
      this.$router.push('/checkout')
    },
    deleteItem(index) {
      this.sepet.splice(index, 1);
    }
  },

};

</script>

<style scoped></style>