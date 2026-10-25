<template>
  <h1>Hakkımızda</h1>
  <hr>
  <!-- !Giriş -->
  <div class="bg-body-tertiary text-center p-4 p-md-5 mb-3">
    <h2 class="display-4 fw-bold">VELOCE</h2>
    <p class="lead text-muted mx-auto mt-3 mb-0 about-lead">
      Motosiklet tutkusunu kalite ve güvenle buluşturmak için yola çıktık.
    </p>
  </div>

  <!-- !Değerlerimiz -->
  <div class="d-md-flex flex-md-equal gap-3">
    <div class="bg-veloce text-center p-4 p-md-5 mb-3 mb-md-0">
      <i class="bi bi-bullseye about-icon"></i>
      <h3 class="mt-3">Amacımız</h3>
      <p class="mb-0">Sürücülere en iyi ekipmanları, güvenilir ürünleri ve güncel motosiklet dünyasını tek bir
        platformda sunmak.</p>
    </div>
    <div class="text-bg text-center p-4 p-md-5 mb-3 mb-md-0" style="background-color: #3a3a3a; color: white;">
      <i class="bi bi-shield-check about-icon"></i>
      <h3 class="mt-3">Önce Güvenlik</h3>
      <p class="mb-0">Kasklardan koruyucu ekipmanlara kadar her ürünü özenle seçiyor, güvenli sürüşün her zaman ilk
        öncelik olduğuna inanıyoruz.</p>
    </div>
    <div class="bg-body-tertiary text-center p-4 p-md-5">
      <i class="bi bi-people about-icon text-veloce"></i>
      <h3 class="mt-3">Herkes İçin</h3>
      <p class="mb-0">İster yeni başlayan bir sürücü olun ister yıllardır yollarda olun, ihtiyaçlarınıza uygun çözümler
        sunmak için buradayız.</p>
    </div>
  </div>

  <!-- !Kapanış -->
  <p class="text-center text-muted fs-5 mt-4 mx-auto about-lead">
    Bizim için motosiklet yalnızca bir ulaşım aracı değil, özgürlüğün ve tutkunun en güzel halidir.
    <b class="text-veloce">Güvenle sürün, keyifle keşfedin.</b>
  </p>
</template>

<script>
export default {};
</script>

<style scoped>
.about-lead {
  max-width: 700px;
}
.about-icon {
  font-size: 2.5rem;
}
.text-veloce {
  color: #991b1b;
}
@media (min-width: 768px) {
  .flex-md-equal > * {
    flex: 1;
  }
}
</style>