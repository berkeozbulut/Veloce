<template>
  <div class="row">
    <div class="col-10">
      <h4>Ürünler</h4>
    </div>
    <div class="col-2">
      <button style="float: right;" type="button" class="btn btn-outline-success btn-sm" data-bs-toggle="modal"
        data-bs-target="#addProduct">
        Ürün Ekle
      </button>
      <p v-if="error" style="color: red;"><b>Hata:</b> {{ error }}</p>

    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Ürün Adı</th>
          <th scope="col">Stok</th>
          <th scope="col">Fiyat(₺)</th>
          <th scope="col">KDV'li Fiyat</th>
          <th scope="col">Açıklama</th>
          <th scope="col">Görsel</th>
          <th scope="col">İşlem</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product, index in products" :key="product.p_id">
          <th>{{ index + 1 }}</th>
          <td><input class="form-control" type="text" v-model="product.p_name"></td>
          <td><input class="form-control" type="number" v-model="product.p_stock"></td>
          <td><input class="form-control" type="number" v-model.number="product.p_price"></td>
          <td>{{ Number(product.p_price * 1.2).toLocaleString('tr-TR') }} ₺</td>
          <td><textarea class="form-control" type="text" v-model="product.p_desc"></textarea></td>
          <td>
            <img v-if="product.p_images" :src="baseUrl + product.p_images" class="admin-thumb">
            <input type="file" accept="image/*" ref="rowFile" class="form-control form-control-sm mt-1"
              @change="onRowFileChange(product.p_id, $event)">
          </td>
          <td>
            <button
              @click="updateProduct(product.p_id, product.p_name, product.p_stock, product.p_price, product.p_desc)"
              class="btn btn-outline-primary btn-sm m-1">Güncelle</button>
            <button @click="deleteProduct(product.p_id)" class="btn btn-outline-danger  btn-sm m-1">Sil</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- !Ürün Ekle Modalı -->
  <div class="modal fade" id="addProduct" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Ürün Ekle</h1>
          <button type="button" class="btn-close text-nowrap" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addProduct()">
            <label>Ürün Adı:</label><br>
            <input type="text" class="form-control mb-2" v-model="newProduct[0].p_name" required>

            <label>Stok:</label><br>
            <input type="number" min="0" class="form-control mb-2" v-model="newProduct[0].p_stock" required>

            <label>Fiyat:</label><br>
            <input type="number" min="0" class="form-control mb-2" v-model.number="newProduct[0].p_price" required>

            <textarea class="form-control mb-2" v-model="newProduct[0].p_desc" required
              placeholder="ürünü anlatın"></textarea>
            <label>Resim</label>
            <!-- !multer yapısı ile jpeg ekle -->
            <input class="form-control mb-2" type="file" accept="image/*" ref="fileInput" @change="onFileChange">
            <button style="margin: 5px; margin-bottom: 3px; width: 100;" class="btn btn-success "
              type="submit">Ekle</button>

          </form>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { authFetch } from '@/utils/auth';
import { showAlert, showConfirm } from '@/utils/alert';

export default {
  data() {

    return {
      error: null,
      newProduct: [
        { p_name: "", p_stock: 0, p_price: 0, p_desc: "" }

      ],
      products: [],
      baseUrl: "http://localhost:3001",
      selectedFile: null,
      rowFiles: {},

    };

  },

  mounted() {
    this.getProducts()
  },
  unmounted() {

  },

  methods: {
    async getProducts() {
      try {
        const id = sessionStorage.getItem("userId")
        const res = await authFetch(`${this.baseUrl}/api/products/${id}`);
        if (!res.ok) throw new Error("product endpoint hatası");
        this.products = await res.json();
      } catch (e) {
        console.log(e.message);
      }

    },

    async addProduct() { // POST - Ürün Ekleme
      try {

        // const res = await fetch(`${this.baseUrl}/api/products`, { //istekte bulunduğumuz yer.
        //   method: "POST", // Post isteğinde bulunduk
        //   headers: {
        //     "Content-type": "application/json"
        //   },
        //   body: JSON.stringify({ // istekle beraber neleri yolluyorsun?
        //     name: this.newProduct[0].p_name,
        //     stock: this.newProduct[0].p_stock,
        //     price: this.newProduct[0].p_price,
        //     desc: this.newProduct[0].p_desc,
        //     u_id: sessionStorage.getItem("userId")
        //   })
        const formData = new FormData();
        formData.append("name", this.newProduct[0].p_name);
        formData.append("stock", this.newProduct[0].p_stock);
        formData.append("price", this.newProduct[0].p_price);
        formData.append("desc", this.newProduct[0].p_desc);
        formData.append("u_id", sessionStorage.getItem("userId"));
        if (this.selectedFile) formData.append("image", this.selectedFile);

        const res = await authFetch(`${this.baseUrl}/api/products`, {
          method: "POST",
          body: formData
        });

        if (!res.ok) {

          const errorData = await res.json();
          throw new Error(errorData.error);
        }
        const data = await res.json();
        showAlert("Ürün eklendi.");
        this.getProducts();//ekleme işleminden sonra tekrar verileri çek 
        this.newProduct[0].p_name = "";
        this.newProduct[0].p_stock = 0;
        this.newProduct[0].p_price = 0;
        this.newProduct[0].p_desc = "";
        this.selectedFile = null;
        this.$refs.fileInput.value = "";
      }
      catch (e) {
        showAlert(e.message, "danger");
      }
    },

    //PUT - Ürün Güncelle
    async updateProduct(p_id, p_name, p_stock, p_price, p_desc) {

      try {

        // const res = await fetch(`${this.baseUrl}/api/products/${p_id}`, { //istekte bulunduğumuz yer.
        //   method: "PUT", // Put isteğinde bulunduk
        //   headers: {
        //     "Content-type": "application/json"
        //   },
        //   body: JSON.stringify({ // istekle beraber neleri yolluyorsun?
        //     name: p_name,
        //     stock: p_stock,
        //     price: p_price,
        //     desc: p_desc

        //   })

        // });
        const formData = new FormData();
        formData.append("name", p_name);
        formData.append("stock", p_stock);
        formData.append("price", p_price);
        formData.append("desc", p_desc);
        if (this.rowFiles[p_id]) formData.append("image", this.rowFiles[p_id]);
        const res = await authFetch(`${this.baseUrl}/api/products/${p_id}`, {
          method: "PUT",
          body: formData
        });


        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error);
        }

        const data = await res.json();
        if (data) showAlert(data)
        delete this.rowFiles[p_id];
        this.$refs.rowFile.forEach(input => input.value = "");
        this.getProducts();
      }
      catch (e) {
        showAlert(e.message, "danger");
        this.getProducts();
      }
    },

    async deleteProduct(p_id) {
      if (!(await showConfirm("Bu ürünü silmek istediğine emin misin?"))) return;
      try {
        const res = await authFetch(`${this.baseUrl}/api/products/${p_id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error);
        }

        const data = await res.json();
        if (data) showAlert("Ürün Silindi.")

        this.getProducts();
      }
      catch (e) {
        showAlert(e.message, "danger");
      }
    },
    onFileChange(e) {
      this.selectedFile = e.target.files[0] || null;
    },
    onRowFileChange(p_id, e) {
      this.rowFiles[p_id] = e.target.files[0] || null;
    }
  }

};

</script>

<style scoped>
.admin-thumb {
  width: 60px;
  height: 60px;
  object-fit: contain;
}
.table .form-control {
    min-width: 110px;
}
</style>