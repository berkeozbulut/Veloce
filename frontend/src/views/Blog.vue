<template>
  <h1>BLOG</h1>
  <hr>
  <div id="carouselExampleCaptions" class="carousel slide">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
        aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
        aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
        aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="../assets/img/r1.png" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>First slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="..." class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>Second slide label</h5>
          <p>Some representative placeholder content for the second slide.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="..." class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>Third slide label</h5>
          <p>Some representative placeholder content for the third slide.</p>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  <div class="row">
    <div class="col-4">
      <div class="card mt-3" style="width: 20rem;">
        <img src="../assets/img/h2.png" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Motosiklet Türleri: Hangisi Sana Uygun?</h5>
          <p class="card-text">Kategori: Başlangıç Rehberi · Okuma süresi: 4 dk
            Özet: Naked, sport, touring, adventure… Motosiklet dünyasındaki temel sınıfları ve her birinin kime hitap
            ettiğini anlatıyoruz.</p>
          <a href="#" class="btn btn-primary">Yazıya Git</a>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card mt-3" style="width: 20rem;">
        <img src="../assets/img/h2.png" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Motor Nasıl Çalışır? 4 Zamanlı Motorun Temelleri</h5>
          <p class="card-text">Kategori: Teknik · Okuma süresi: 5 dk
            Özet: Gaz koluna dokunduğunda motorun içinde neler oluyor? Dört zamanlı motorun çalışma döngüsünü sade bir
            dille açıklıyoruz.</p>
          <a href="#" class="btn btn-primary">Yazıya Git</a>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card mt-3" style="width: 20rem;">
        <img src="../assets/img/h2.png" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Vites ve Debriyaj: İlk Sürüşte Bilmen Gerekenler</h5>
          <p class="card-text">Kategori: Sürüş Teknikleri · Okuma süresi: 4 dk
            Özet: Manuel motosiklette kalkış yapmak ilk başta zor gelebilir. Debriyaj ve vites mantığını adım adım
            öğreniyoruz.</p>
          <a href="#" class="btn btn-primary">Yazıya Git</a>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-4">
      <div class="card mt-5" style="width: 20rem;">
        <img src="../assets/img/h2.png" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Motosiklet Türleri: Hangisi Sana Uygun?</h5>
          <p class="card-text">Kategori: Başlangıç Rehberi · Okuma süresi: 4 dk
            Özet: Naked, sport, touring, adventure… Motosiklet dünyasındaki temel sınıfları ve her birinin kime hitap
            ettiğini anlatıyoruz.</p>
          <a href="#" class="btn btn-primary">Yazıya Git</a>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card mt-5" style="width: 20rem;">
        <img src="../assets/img/h2.png" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Motor Nasıl Çalışır? 4 Zamanlı Motorun Temelleri</h5>
          <p class="card-text">Kategori: Teknik · Okuma süresi: 5 dk
            Özet: Gaz koluna dokunduğunda motorun içinde neler oluyor? Dört zamanlı motorun çalışma döngüsünü sade bir
            dille açıklıyoruz.</p>
          <a href="#" class="btn btn-primary">Yazıya Git</a>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card mt-5" style="width: 20rem;">
        <img src="../assets/img/h2.png" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Vites ve Debriyaj: İlk Sürüşte Bilmen Gerekenler</h5>
          <p class="card-text">Kategori: Sürüş Teknikleri · Okuma süresi: 4 dk
            Özet: Manuel motosiklette kalkış yapmak ilk başta zor gelebilir. Debriyaj ve vites mantığını adım adım
            öğreniyoruz.</p>
          <a href="#" class="btn btn-primary">Yazıya Git</a>
        </div>
      </div>
    </div>
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

<style scoped></style>
