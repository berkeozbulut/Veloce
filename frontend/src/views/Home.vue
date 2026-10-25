<template>
  <div class="content">
    <main>
      <div class="position-relative overflow-hidden p-3 p-md-5 my-md-3 text-center bg-body-tertiary">
        <div class="col-md-6 p-lg-5 mx-auto my-5">
          <h1 class="display-3 fw-bold">VELOCE'a Hoşgeldin</h1>
          <h3 class="fw-normal text-muted mb-3 mt-5">Şimdi gel, burada neler
            yaptığımıza bir bakalım.
          </h3>
        </div>
      </div>
      <div class="d-md-flex flex-md-equal gap-3 my-md-3 px-0 ">
        <div class="bg-veloce pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div class="my-3 py-3">
            <h2 class="display-5">Ekipmanını Seç</h2>
            <p class="lead">Kasktan monta, eldivenden bota; sürüş tarzına uygun ekipmanları incele. Her ürünün stok
              durumunu ve fiyatını anında gör, beğendiğini tek tıkla sepetine ekle.</p>
            <RouterLink to="/product" class="btn btn-light mt-3">Ürünleri İncele</RouterLink>
          </div>
        </div>
        <div class="bg-body-tertiary pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden ">
          <div class="my-3 py-3">
            <h2 class="display-5">Hesabını Oluştur</h2>
            <p class="lead">Üye ol, siparişlerini tek bir panelden yönet. Toplam harcamanı ve son siparişini özet
              ekranında gör, kişisel bilgilerini dilediğin zaman güncelle.</p>
            <button class="btn btn-dark mt-3" data-bs-toggle="modal" data-bs-target="#registerModal"
              style="background-color: #3a3a3a;">Hemen Üye
              Ol</button>
          </div>
        </div>
      </div>

      <div class=" d-md-flex flex-md-equal gap-3 my-md-3 px-0">
        <div class=" ddd  pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div class="my-3 py-3">
            <h2 class="display-5">Siparişini Takip Et</h2>
            <p class="lead">Siparişin hazırlanıyor mu, kargoda mı, teslim mi edildi? Hesabından her adımı takip et.
              Üye olmadan da alışveriş yapabilirsin.</p>
            <button class="btn btn-light mt-3" data-bs-toggle="modal" data-bs-target="#loginModal">Giriş Yap</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>

export default {

  data() {

    return {



    };

  },

  mounted() {



  },

  methods: {

  },

};

</script>

<style scoped>
@media(min-width:768px) {
  .flex-md-equal>* {
    flex: 1;
  }
}

.ddd {
  background-color: #3a3a3a;
  color: white;
}
</style>
