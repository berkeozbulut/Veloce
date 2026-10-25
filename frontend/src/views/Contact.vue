<template>
  <h1>İletişim</h1>
  <hr>
  <div class="row g-3">
    <!-- !Form -->
    <div class="col-12 col-lg-7">
      <div class="bg-body-tertiary p-4 p-md-5 h-100">
        <h2 class="h4 mb-1">Bize yazın</h2>
        <p class="text-muted mb-4">Ürünler, siparişler ya da sitemiz hakkında her türlü soru ve önerin için.</p>

        <form @submit.prevent="sendMessage">
          <div class="row g-3">
            <div class="col-12 col-sm-6">
              <label for="contact-firstName" class="form-label">İsim</label>
              <input id="contact-firstName" v-model="newMessage[0].firstName" type="text" class="form-control"
               required>
            </div>
            <div class="col-12 col-sm-6">
              <label for="contact-lastName" class="form-label">Soyisim</label>
              <input id="contact-lastName" v-model="newMessage[0].lastName" type="text" class="form-control"
                 required>
            </div>
            <div class="col-12">
              <label for="contact-email" class="form-label">E-posta</label>
              <input id="contact-email" v-model="newMessage[0].email" type="email" class="form-control" required>
              <div class="form-text">Bilgilerin <b>VELOCE</b> güvencesiyle saklanır.</div>
            </div>
            <div class="col-12">
              <label for="contact-message" class="form-label">Mesajın</label>
              <textarea id="contact-message" v-model="newMessage[0].message" class="form-control" rows="5"
                required></textarea>
            </div>
            <div class="col-12 d-flex justify-content-between align-items-center">
              <div class="form-check">
                <input id="contact-check" v-model="newMessage[0].check" class="form-check-input" type="checkbox"
                  required>
                <label for="contact-check" class="form-check-label">Göndermeye hazırım</label>
              </div>
              <button type="submit" class="btn btn-veloce px-4" aria-label="Gönder"><i class="bi bi-send"></i></button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- !İletişim bilgileri -->
    <div class="col-12 col-lg-5">
      <div class="bg-veloce p-4 p-md-5 h-100">
        <h2 class="h4 mb-4">İletişim bilgileri</h2>
        <div class="d-flex gap-3 mb-4">
          <i class="bi bi-envelope contact-icon"></i>
          <div><b>E-posta</b><br>destek@veloce.com</div>
        </div>
        <div class="d-flex gap-3 mb-4">
          <i class="bi bi-clock contact-icon"></i>
          <div><b>Çalışma saatleri</b><br>Hafta içi 09.00 – 18.00</div>
        </div>
        <div class="d-flex gap-3 mb-4">
          <i class="bi bi-chat-dots contact-icon"></i>
          <div><b>Yanıt süresi</b><br>Mesajlarını genellikle 1 iş günü içinde yanıtlıyoruz.</div>
        </div>
        <div class="d-flex gap-3">
          <i class="bi bi-question-circle contact-icon"></i>
          <div><b>Hızlı yanıt mı arıyorsun?</b><br>
            <RouterLink to="/faq" class="link-light">Sıkça Sorulan Sorular</RouterLink> sayfasına göz at.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { showAlert } from '@/utils/alert';

export default {
  data() {
    return {
      newMessage: [
        { firstName: "", lastName: "", email: "", message: "", check: false }
      ],
      baseUrl: "http://localhost:3001",
    };
  },

  methods: {
    // POST - mesaj gönder
    async sendMessage() {
      try {
        const res = await fetch(`${this.baseUrl}/api/contact`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            firstName: this.newMessage[0].firstName,
            lastName: this.newMessage[0].lastName,
            email: this.newMessage[0].email,
            message: this.newMessage[0].message,
          })
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error);
        }
        showAlert("Mesajın bize ulaştı, en kısa sürede dönüş yapacağız.", "success", "Teşekkürler!");

        this.newMessage[0].firstName = "";
        this.newMessage[0].lastName = "";
        this.newMessage[0].email = "";
        this.newMessage[0].message = "";
        this.newMessage[0].check = false;
      }
      catch (e) {
        showAlert(e.message, "danger");
      }
    },
  },
};
</script>

<style scoped>
.btn-veloce {
  background-color: #991b1b;
  color: white;
}

.btn-veloce:hover {
  background-color: #7f1d1d;
  color: white;
}

.contact-icon {
  font-size: 1.5rem;
  line-height: 1;
}
</style>