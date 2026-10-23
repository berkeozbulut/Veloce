<template>
  <div>
    <h1>Ürünler</h1>
    <hr>
    <p v-if="searchQuery" class="text-muted">
      "{{ $route.query.q }}" için {{ filteredProducts.length }} sonuç
      <RouterLink to="/product" class="ms-2">Aramayı temizle</RouterLink>
    </p>
    <p v-if="searchQuery && filteredProducts.length === 0">Aradığın ürün bulunamadı.</p>
    <!-- !ürün kartları -->
    <div class="row">
      <div class="col-12 col-sm-6 col-lg-4 mt-3" v-for="p in filteredProducts" :key="p.p_id">
        <div class="card urun-karti h-100">
          <img class="card-img-top urun-gorsel" v-if="p.p_images" :src="baseUrl + p.p_images" :alt="p.p_name">
          <div class="card-body">
            <h5 class="card-title">{{ p.p_name }}</h5>
            <p v-if="p.p_stock" class="card-text"><b>{{ p.p_stock }}</b> Adet Mevcut!</p>
            <p v-if="p.p_stock" class="card-text"><b>Fiyat: {{ Number(p.p_price).toLocaleString('tr-TR') }} TL</b></p>
            <p v-if="p.p_stock" class="text-muted kdv-notu">+KDV</p>
            <button v-if="p.p_stock" @click="addCart(p.p_id)" class="btn btn-outline-dark sepete-ekle">Sepete
              Ekle</button>
            <button v-else type="button"
              style="background-color: #991b1b; border-color: #991b1b; color: white; border: 0px; border-radius: 10px; padding: 10px; width: 100px;"
              disabled>Stok Yok!</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- !alerts -->
  <AlertBox ref="cartAlert" variant="success" title="Harika!!!"
    message="Ürün sepete eklendi! Ürününü sepet kısmında bulabilirsin :D" :duration="5000" />
  <AlertBox ref="cartWarning" variant="warning" title="Hey dikkat et!" message="Stok adedi kadar ürün ekleyebilirsiniz."
    :duration="5000" />
</template>
<script>
import AlertBox from '@/components/AlertBox.vue';

export default {
  inject: ['sepet'],
  components: { AlertBox },
  data() {

    return {
      products: [],
      baseUrl: "http://localhost:3001",
    };

  },

  mounted() {
    this.getProducts();


  },

  computed: {
    searchQuery() {
      return (this.$route.query.q || "").toString().trim().toLocaleLowerCase("tr-TR");
    },
    filteredProducts() {
      if (!this.searchQuery) return this.products;
      return this.products.filter(p =>
        p.p_name.toLocaleLowerCase("tr-TR").includes(this.searchQuery)
      );
    }
  },

  methods: {
    formatPrice(value) {
      return value.toLocaleString('tr-TR')
    },
    addCart(id) {
      const product = this.products.find(item => item.p_id === id);

      const cartProduct = this.sepet.find(
        item => item.p_id === product.p_id
      );

      const currentQuantity = cartProduct ? cartProduct.quantity : 0;
      if (currentQuantity >= Number(product.p_stock)) {
        this.$refs.cartWarning.open();
        return;
      }
      if (cartProduct)
        cartProduct.quantity += 1;
      else {
        this.sepet.push({
          ...product,
          quantity: 1
        });
      }
      this.$refs.cartAlert.open();
    },
    async getProducts() {
      try {
        const res = await fetch(`${this.baseUrl}/api/productPage`);
        if (!res.ok) throw new Error("product endpoint hatası");
        this.products = await res.json();
      } catch (e) {
        console.log(e.message);
      }

    },
  }

};

</script>

<style scoped>
.urun-karti {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;
}

.urun-karti:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.card-body {
  text-align: center;
}



/* ! bir bakarsın en iyisi olmadı  */
.sepete-ekle:hover {
  background-color: #991b1b;
  /* bir daha bak */
  /* transition: width 0.3s ease;
transition-delay: 0.3s; */
}

.urun-gorsel {
  height: 200px;
  object-fit: contain;
  padding: 10px;
}
</style>