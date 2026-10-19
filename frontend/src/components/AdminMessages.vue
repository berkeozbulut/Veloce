<template>
  <div class="row">
    <div class="col-10">
      <h4>Messages</h4>
    </div>
  </div>

  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Ad</th>
        <th scope="col">Soyad</th>
        <th scope="col">Email</th>
        <th scope="col">Mesaj</th>
        <th scope="col">Oluşturulma Tarihi</th>
        <th scope="col">Durumu</th>
        <th scope="col">işlem</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="message, index in messages" :key="message.m_id">
        <th>{{ index + 1 }}</th>
        <td><label>{{ message.m_firstName }}</label></td>
        <td><label>{{ message.m_lastName }}</label></td>
        <td><label>{{ message.m_email }}</label></td>
        <td><label>{{ message.m_message }}</label></td>
        <td><label>{{ message.m_created_at.split(" ")[0] }}</label></td>
        <td>
          <div class="d-flex align-items-center gap-2">
            <select class="form-select" v-model="message.m_status">
              <option :value="0">Yanıtlanmadı</option>
              <option :value="1">Yanıtlandı</option>
            </select>
            <i v-if="Number(message.m_status) === 1" class="bi bi-check-circle-fill text-success"></i>
            <i v-else class="bi bi-x-circle-fill text-danger"></i>
          </div>
        </td>
        <td>
          <button @click="updateMessage(message.m_id, message.m_status)"
            class="btn btn-outline-primary  btn-sm m-1">Güncelle</button>
          <a :href="`mailto:${message.m_email}`" class="btn btn-outline-success  btn-sm m-1">Yanıtla</a>
          <button @click="deleteMessage(message.m_id)" class="btn btn-outline-danger  btn-sm m-1">Sil</button>
        </td>

      </tr>
    </tbody>
  </table>
</template>
<script>

export default {

  data() {

    return {
      // mesaj ekle butonu aktifleştirdiğinde kullan
      // newMessage: [
      //   { m_firstName: "", m_lastName: "", m_email: "", m_message: "" }
      // ],
      messages: [],
      baseUrl: "http://localhost:3001",
      error: null,
    };

  },

  mounted() {
    this.getMessages()


  },

  methods: {

    async getMessages() {
      this.error = null;
      try {
        const res = await fetch(`${this.baseUrl}/api/messages`);
        if (!res.ok) throw new Error("messages endpoint hatası");
        this.messages = await res.json();
      } catch (e) {
        this.error = e.message;
      }

    },
    async updateMessage(m_id, m_status) {

      try {

        const res = await fetch(`${this.baseUrl}/api/messages/${m_id}`, { //istekte bulunduğumuz yer.
          method: "PUT", // Put isteğinde bulunduk
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({ // istekle beraber neleri yolluyorsun?
            status: m_status

          })

        });
        if (!res.ok) throw new Error("updateMessage endpoint hatası");

        const data = await res.json();
        if (data) alert(data)

        this.getMessages();//ekleme işleminden sonra tekrar verileri çek 

      }
      catch (e) {
        console.log(e);
      }
    },
    async deleteMessage(m_id) {
      try {

        const res = await fetch(`${this.baseUrl}/api/messages/${m_id}`, { //istekte bulunduğumuz yer.
          method: "DELETE", // Call delete
          headers: {
            "Content-type": "application/json"
          },


        });
        if (!res.ok) throw new Error(res.error);

        const data = await res.json();
        if (data) alert("Mesaj silindi")

        this.getMessages();//ekleme işleminden sonra tekrar verileri çek 
      }
      catch (e) {
        console.log(e);
      }
    },
  }

};

</script>

<style scoped></style>