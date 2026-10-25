<template>
  <h1>İletişim<i class="bi bi-person-raised-hand fs-1" ></i>
  </h1>
  <hr>
  <div>
    <!-- !Content -->
    <div class="content">
      <div class="row">
        <div class="mb-3 col-12 col-md-6">
          <!-- !Form -->
          <div class="contact-form">

            <form @submit.prevent="sendMessage">

              <div class="mb-3 mt-3">
                <label class="form-label">İsim</label>
                <input v-model="newMessage[0].firstName" type="text" class="form-control" placeholder="Örn.Berke"
                  required>
              </div>

              <div class="mb-3 mt-3">
                <label class="form-label">Soyisim</label>
                <input v-model="newMessage[0].lastName" type="text" class="form-control" placeholder="Örn.Özbulut"
                  required>
              </div>

              <div class="mb-3 mt-3">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input v-model="newMessage[0].email" type="email" class="form-control" aria-describedby="emailHelp"
                  placeholder="name@example.com" required>
                <div id="emailHelp" class="form-text">*bilgileriniz <b>VELOCE</b> güvencesiyle saklanmaktadır.</div>
              </div>


              <div class="mb-3">
                <label class="form-label">Lütfen iletmek istediğin mesajı gir</label>
                <textarea v-model="newMessage[0].message" class="form-control" rows="3" required></textarea>
              </div>
              <div class="col-12">
                <div class="form-check ">
                  <input style="cursor: pointer;" v-model="newMessage[0].check" class="form-check-input" type="checkbox"
                    required>
                  <label class="form-check-label">Göndermeye hazırım</label>
                </div>
              </div>
              <div>
                <button style="width: 30%;" type="submit" class="btn btn-primary mt-3"><i
                    class="bi bi-check2"></i></button>
              </div>
            </form>
          </div>
        </div>

        <div class="mb-3 col-12 col-md-6">
          <!-- !Alerts -->
          <div class="row">
            <!-- !correct -->
            <div>
              <div v-if="status == 'correct'" class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Geri bildirimin için teşekkürler!</strong>Yaptığın olumlu veya olumsuz her dönüş(umarım
                olumludur
                :D) bizi ve sunduğumuz hizmeti daha ileriye taşıyacaktır.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              <!-- !Wrong -->
              <div v-if="status == 'wrong'" class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Geri bildirimin gönderilemedi :/ </strong>Yazdıklarını kontrol etmeni öneririm.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {

    return {
      newMessage: [
        { firstName: "", lastName: "", email: "", message: "", check: false }
      ],
      status: "",
      baseUrl: "http://localhost:3001",
    };
  },
  mounted() {

  },
  unmounted() {
    // mounted a gelen veriyi sayfadan çıkınca sıfırlamak için
  },

  methods: {

    // POST - send message
    async sendMessage() {
      try {

        this.status = "beinganalyzed";

        const res = await fetch(`${this.baseUrl}/api/contact`, { //istekte bulunduğumuz yer.
          method: "POST", // Post isteğinde bulunduk
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({ // istekle beraber neleri yolluyorsun?
            firstName: this.newMessage[0].firstName,
            lastName: this.newMessage[0].lastName,
            email: this.newMessage[0].email,
            message: this.newMessage[0].message,
          })

        });
        if (!res.ok) throw new Error("Contact endpoint hatası");

        const data = await res.json();
        if (data) this.status = "correct";

        this.newMessage[0].firstName = "";
        this.newMessage[0].lastName = "";
        this.newMessage[0].email = "";
        this.newMessage[0].message = "";
        this.newMessage[0].check = false;
      }
      catch (e) {
        this.status = "wrong";
        console.log(e.message);
      }
    },
  },
};

</script>

<style scoped></style>