<template>
    <div class="row">
        <div class="col-10">
            <h4>Kullanıcılar</h4>
        </div>
        <div class="col-2">
            <button style="float: right;" type="button" class="btn btn-outline-success btn-sm" data-bs-toggle="modal"
                data-bs-target="#addUser">
                Kullanıcı Ekle
            </button>
        </div>


    </div>
    <!-- !Kullanıcı ekle buttonu -->
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Ad</th>
                <th scope="col">Soyad</th>
                <th scope="col">Email</th>
                <th scope="col">Parola</th>
                <th scope="col">Doğum Tarihi</th>
                <th scope="col">Rol</th>
                <th scope="col">işlem</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user, index in users" :key="user.u_id">
                <th>{{ index + 1 }}</th>
                <td><input class="form-control" type="text" v-model="user.u_firstName"></td>
                <td><input class="form-control" type="text" v-model="user.u_lastName"></td>
                <td><input class="form-control" type="text" v-model="user.u_email"></td>
                <td><input class="form-control" type="password" v-model="user.u_pass"></td>
                <td><input type="date" class="form-control" v-model="user.u_birthdate"></td>
                <td><select class="form-select mb-4" v-model="user.u_role">
                        <option value=0>Kullanıcı</option>
                        <option value=1>Admin</option>
                    </select></td>
                <td>
                    <button
                        @click="updateUser(user.u_id, user.u_firstName, user.u_lastName, user.u_email, user.u_pass, user.u_birthdate, user.u_role)"
                        class="btn btn-outline-primary btn-sm m-1">Güncelle</button>
                    <button @click="deleteUser(user.u_id)" class="btn btn-outline-danger  btn-sm m-1">Sil</button>
                </td>
            </tr>
        </tbody>
    </table>

    <!-- !Kullanıcı Ekle Modalı -->
    <div class="modal fade" id="addUser" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Kullanıcı Ekle</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="addUser()">
                        <label>Ad</label><br>
                        <input type="text" class="form-control mb-3" v-model="newUser[0].firstName" required>

                        <label>Soyad</label><br>
                        <input type="text" class="form-control mb-3" v-model="newUser[0].lastName" required>

                        <label>Email</label><br>
                        <input type="email" class="form-control mb-3" v-model="newUser[0].email" required>

                        <label>Parola</label><br>
                        <input type="password" class="form-control mb-3" v-model="newUser[0].pass" required>

                        <label>Doğum Tarihi</label><br>
                        <input type="date" class="form-control mb-3" v-model="newUser[0].birthdate" required>

                        <label >Rol</label>
                        <select class="form-select" v-model="newUser[0].role">
                            <option value=0>Kullanıcı</option>
                            <option value=1>Admin</option>
                        </select>
                        <button style="margin: 5px; margin-bottom: 3px;" class="btn btn-outline-success w-100"
                            type="submit">Kullanıcı Ekle</button>
                        <span>{{ userMessages }}</span>
                    </form>
                </div>

            </div>
        </div>
    </div>

</template>
<script>

export default {

    data() {

        return {
            users: [],

            newUser: [
                { firstName: "", lastName: "", email: "", pass: "", birthdate: "", role: 0 },

            ],
            baseUrl: "http://localhost:3001",
            userMessages: null,

        };

    },

    mounted() {
        // Get and mount Users
        this.getUsers()


    },

    methods: {
        async getUsers() {
            this.error = null;

            try {
                const res = await fetch(`${this.baseUrl}/api/users`);
                if (!res.ok) throw new Error("users endpoint hatası");
                this.users = await res.json();
            } catch (e) {
                this.error = e.message;
            }
        },
        async addUser() { // POST - kullanıcı Ekleme
            try {

                const res = await fetch(`${this.baseUrl}/api/users`, { //istekte bulunduğumuz yer.
                    method: "POST", // Post isteğinde bulunduk
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ // istekle beraber neleri yolluyorsun?
                        firstName: this.newUser[0].firstName,
                        lastName: this.newUser[0].lastName,
                        email: this.newUser[0].email,
                        pass: this.newUser[0].pass,
                        birthdate: this.newUser[0].birthdate,
                        role: this.newUser[0].role,
                    })

                });
                if (!res.ok) throw new Error("addUser endpoint hatası");
                const data = await res.json();
                this.userMessages = data;

                this.getUsers();//ekleme işleminden sonra tekrar verileri çek 
                this.newUser[0].firstName = "";
                this.newUser[0].lastName = "";
                this.newUser[0].email = "";
                this.newUser[0].pass = "";
                this.newUser[0].birthdate = "";
                this.newUser[0].role= 0;
            }
            catch (e) {
                this.userMessages = e.message
            }
        },

        async updateUser(u_id, u_firstName, u_lastName, u_email, u_pass, u_birthdate,u_role) {
            try {
                const res = await fetch(`${this.baseUrl}/api/users/${u_id}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        firstName: u_firstName,
                        lastName: u_lastName,
                        email: u_email,
                        pass: u_pass,
                        birthdate: u_birthdate,
                        role: u_role
                    })
                });
                if (!res.ok) throw new Error("updateUser endpoint hatası");

                const data = await res.json();
                if (data) alert("Kullanıcı Güncellendi.")

                this.getUsers();//ekleme işleminden sonra tekrar verileri çek 
            }
            catch (e) {
                console.log(e);
            }

        },
        // Delete user
        async deleteUser(u_id) {

            try {

                const res = await fetch(`${this.baseUrl}/api/users/${u_id}`, { //istekte bulunduğumuz yer.
                    method: "DELETE", // Put isteğinde bulunduk
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ // istekle beraber neleri yolluyorsun?
                    })

                });
                if (!res.ok) throw new Error(res.error);

                const data = await res.json();
                if (data) alert("Kullanıcı Silindi.")

                this.getUsers();//ekleme işleminden sonra tekrar verileri çek
                //before get datas  
            }
            catch (e) {
                console.log(e);
            }
        },

    }

};

</script>

<style scoped></style>