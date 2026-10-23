<template>
  <div>

    <div class="sepet-icon" v-if="!['/checkout', '/admin'].includes($route.path)">
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

        <p v-if="!sepet.length" class="text-muted text-center mt-5">Sepetinde henüz ürün yok.</p>
        <template v-else>
          <SepetItem v-for="(value, index) in sepet" :key="value.p_id" :item="value" :index="index" />
          <hr>
          <div class="d-flex justify-content-between">
            <b>Ara Toplam (+KDV):</b>
            <b>{{ toplamTutar.toLocaleString('tr-TR') }} TL</b>
          </div>
          <button class="btn w-100 mt-4 text-white" data-bs-dismiss="offcanvas" style="background-color: #991b1b;"
            @click="goCheckout()">Ödeme
            Sayfasına Git</button>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import SepetItem from './SepetItem.vue';
export default {
  components: { SepetItem },
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
    }
  },

};

</script>
