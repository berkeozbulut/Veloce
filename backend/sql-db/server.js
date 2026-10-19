require("dotenv").config(); // env dosyamızı import ettik 
const express = require("express");

const cors = require("cors");

const app = express();



app.use(cors());

const db = require("./db"); // db.js dosyamızı import ettik 
// ! Multer Yapısı
const multer = require("multer");
const path = require("path");

// Dosya nereye ve hangi isimle kaydedilsin
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, "uploads")),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // en fazla 2 MB
    fileFilter: (req, file, cb) => cb(null, file.mimetype.startsWith("image/")) // sadece görsel
});

// uploads klasörünü dışarı aç: http://localhost:3001/uploads/dosya.png
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

// ! Part of AdminProducts

//? PRODUCTS LISTELE - SQL sorgu : Select 
app.get("/api/products/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const [control] = await db.query("SELECT u_role FROM users WHERE u_id=?", [id])
        if (control.length === 0) return res.status(404).json({ error: "Kullanıcı bulunamadı" });
        if (Number(control[0].u_role) == 1) {
            var [rows] = await db.query("SELECT * FROM products ORDER BY p_id ASC",); //!var ile her yerden erişip değiştirebiliriz
        }
        else {
            var [rows] = await db.query("SELECT * FROM products WHERE u_id=? ORDER BY p_id ASC", [id]);
        }
        res.status(200).json(rows);//! var sayesinde if/else dışında erişebiliyoruz
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//? PRODUCTS EKLE - POST - SQL sorgu : INSERT INTO
app.post("/api/products", upload.single("image"), async (req, res) => {
    try {
        const { name, stock, price, desc, u_id } = req.body;
        if (!name || stock === undefined || stock === "" || !(Number(price) > 0) || !desc || !desc.trim()) return res.status(400).json({ error: "Hatalı veri geldi" });
        const image = req.file ? "/uploads/" + req.file.filename : null;
        const [result] = await db.query(
            "INSERT INTO products (p_name,p_active,p_stock,p_price,p_disc,p_desc,u_id,p_images ) VALUES (?,?,?,?,?,?,?,?)",
            [name.trim(), 1, stock, price, price, desc.trim(), u_id, image]
        );

        // const [rows] = await db.query("SELECT * FROM products WHERE p_id=?", [result.id]);
        res.status(201).json(name + " " + "adlı ürün eklendi");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//? PRODUCTS GÜNCELLE - PUT - SQL sorgu : UPDATE
app.put("/api/products/:id", upload.single("image"), async (req, res) => {

    try {

        const id = Number(req.params.id);

        const { name, stock, price, desc } = req.body;

        if (isNaN(id)) return res.status(400).json({ error: "Geçersiz ID" });

        if (!name || stock === undefined || stock === "" || !(Number(price) > 0) || !desc || !desc.trim()) return res.status(400).json({ error: "Hatalı veri geldi" });

        const image = req.file ? "/uploads/" + req.file.filename : null;

        const [result] = await db.query(

            "UPDATE products SET p_name=?, p_stock=?, p_price=?, p_desc=?, p_images=COALESCE(?,p_images) WHERE p_id=?",

            [name.trim(), stock, price, desc, image, id]

        );
        res.status(200).json(name + " isimli ürün güncellendi");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Sunucu hatası" });

    }

});
//? PRODUCTS SİL - SQL sorgu : DELETE
app.delete("/api/products/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const [result] = await db.query("DELETE FROM products WHERE p_id=?",
            [id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Silinecek ürün bulunamadı." });
        }
        res.status(200).json({ message: "Ürün silindi." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ! Part of AdminMessages

//? GET MESSAGES - SQL sorgu : Select 
app.get("/api/messages", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM messages ORDER BY m_id DESC");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//? MESSAGE UPDATE - PUT - SQL sorgu : UPDATE
app.put("/api/messages/:id", async (req, res) => {

    try {

        const id = Number(req.params.id);

        const { status } = req.body;

        if (isNaN(id)) return res.status(400).json({ error: "Geçersiz ID" });

        if (status === undefined) return res.status(400).json({ error: "Durum bilgisi eksik" });


        const [result] = await db.query(

            "UPDATE messages SET m_status=?  WHERE m_id=?",

            [status, id]

        );
        res.status(200).json("Durum güncellendi!");
    } catch (err) {

        res.status(500).json({ error: "Sunucu hatası" });

    }

});
//? DELETE MESSAGE - SQL sorgu : DELETE
app.delete("/api/messages/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const [result] = await db.query("DELETE FROM messages WHERE m_id=?",
            [id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Silinecek mesaj bulunamadı." });
        }
        res.status(200).json({ message: "Mesaj silindi." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ! Part of AdminUsers

//? List USERS - SQL sorgu : Select 
app.get("/api/users", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM users ORDER BY u_id ASC");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//? GET USER PROFILE - SQL sorgu : Select
app.get("/api/users/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "Geçersiz ID" });
        const [rows] = await db.query(
            "SELECT u_id, u_firstName, u_lastName, u_email, u_birthdate FROM users WHERE u_id=?",
            [id]
        );
        if (rows.length === 0) return res.status(404).json({ error: "Kullanıcı bulunamadı" });
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//? UPDATE USER PROFILE - PUT - SQL sorgu : UPDATE
app.put("/api/users/:id/profile", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { firstName, lastName, email, birthdate } = req.body;
        if (isNaN(id)) return res.status(400).json({ error: "Geçersiz ID" });
        if (!firstName || !lastName || !email || !birthdate)
            return res.status(400).json({ error: "Eksik bilgi var" });

        const [result] = await db.query(
            "UPDATE users SET u_firstName=?, u_lastName=?, u_email=?, u_birthdate=? WHERE u_id=?",
            [firstName.trim(), lastName.trim(), email.trim(), birthdate, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: "Kullanıcı bulunamadı" });
        res.status(200).json({ message: "Bilgilerin güncellendi" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//? CHANGE USER PASSWORD - PUT - SQL sorgu : SELECT + UPDATE
app.put("/api/users/:id/password", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { currentPass, newPass } = req.body;
        if (isNaN(id)) return res.status(400).json({ error: "Geçersiz ID" });
        if (!currentPass || !newPass)
            return res.status(400).json({ error: "Mevcut ve yeni şifre zorunludur" });
        if (newPass.length < 8)
            return res.status(400).json({ error: "Yeni şifre en az 8 karakter olmalı" });

        const [rows] = await db.query("SELECT u_id FROM users WHERE u_id=? AND u_pass=?", [id, currentPass]);
        if (rows.length === 0) return res.status(401).json({ error: "Mevcut şifre hatalı" });

        await db.query("UPDATE users SET u_pass=? WHERE u_id=?", [newPass, id]);
        res.status(200).json({ message: "Şifren güncellendi" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//? Add USERS - POST - SQL sorgu : INSERT INTO
app.post("/api/users", async (req, res) => {
    try {
        const { firstName, lastName, email, pass, birthdate, role } = req.body;
        if (!firstName || !lastName || !email || !pass || !birthdate) return res.status(400).json({ error: "Hatalı veri geldi" });
        const [result] = await db.query(
            "INSERT INTO users (u_firstName,u_lastName,u_email,u_pass,u_birthdate, u_role) VALUES (?,?,?,?,?,?)",
            [firstName.trim(), lastName.trim(), email.trim(), pass, birthdate, role]
        );

        // const [rows] = await db.query("SELECT * FROM products WHERE p_id=?", [result.id]);
        res.status(201).json(firstName + " " + lastName + " adlı kullanıcı eklendi");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//? Update USERS - PUT - SQL sorgu : UPDATE
app.put("/api/users/:id", async (req, res) => {

    try {

        const id = Number(req.params.id);

        const { firstName, lastName, email, pass, birthdate, role } = req.body;

        if (isNaN(id)) return res.status(400).json({ error: "Geçersiz ID" });

        if (!firstName || !lastName || !email || !pass || !birthdate) return res.status(400).json({ error: "Hata! Kullanıcı eklenemedi" });


        const [result] = await db.query(

            "UPDATE users SET u_firstName=?, u_lastName=?, u_email=?, u_pass=?, u_birthdate=?, u_role=?  WHERE u_id=?",

            [firstName.trim(), lastName.trim(), email.trim(), pass, birthdate, role, id]

        );

        // const [rows] = await db.query("SELECT * FROM products WHERE p_id=?", [id]);

        res.status(200).json(firstName + " " + lastName + " isimli kullanıcı güncellendi");
    } catch (err) {

        res.status(500).json({ error: "Sunucu hatası" });

    }

});
//? Delete USERS - SQL sorgu : DELETE
app.delete("/api/users/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const [result] = await db.query("DELETE FROM users WHERE u_id=?",
            [id]
        );
        res.status(200).json("Kullanıcı silindi.");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ! Part of AdminOrders

//? List ORDERS - SQL sorgu : Select 
app.get("/api/orders", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM orders ORDER BY o_id DESC");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//? List USER ORDERS - sql sorgu: Select 
app.get("/api/orders/user/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "Geçersiz ID" });
        const [rows] = await db.query("SELECT * FROM orders WHERE u_id=? ORDER BY o_id DESC", [id]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});
//? USER DASHBOARD SUMMARY - SQL sorgu : COUNT, SUM, LIMIT
app.get("/api/orders/user/:id/summary", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "Geçersiz ID" });

        const [user] = await db.query("SELECT u_firstName FROM users WHERE u_id=?", [id]);
        if (user.length === 0) return res.status(404).json({ error: "Kullanıcı bulunamadı" });

        const [stats] = await db.query(
            "SELECT COUNT(*) AS orderCount, COALESCE(SUM(o_amount), 0) AS totalSpent FROM orders WHERE u_id=? AND o_status <> 0",
            [id]
        );

        const [last] = await db.query(
            "SELECT o_no, o_status, o_created_at FROM orders WHERE u_id=? ORDER BY o_id DESC LIMIT 1",
            [id]
        );

        res.status(200).json({
            firstName: user[0].u_firstName,
            orderCount: stats[0].orderCount,
            totalSpent: Number(stats[0].totalSpent),
            lastOrder: last.length > 0 ? last[0] : null
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//? Add ORDERS - POST - SQL sorgu : INSERT INTO
app.post("/api/orders", async (req, res) => {
    try {
        const { sepet, order, amount, u_id } = req.body; // checkOut'un gönderdiği 4 alan

        if (!Array.isArray(sepet) || sepet.length === 0)
            return res.status(400).json({ error: "Sepet boş" });
        if (!order || !order.firstName || !order.lastName || !order.address)
            return res.status(400).json({ error: "Sipariş bilgileri eksik" });
        if (!amount || amount <= 0)
            return res.status(400).json({ error: "Geçersiz tutar" });
        // !burayı incele
        const orderNo = "#KS" + Date.now(); // tablodaki #KS formatı

        const products = sepet.map(urun => urun.p_name + " x" + urun.quantity).join(", ");
        const pids = sepet.map(urun => urun.p_id).join(",");

        await db.query(
            "INSERT INTO orders (o_no, o_products, o_pids, o_person, o_address, o_amount, o_status, u_id) VALUES (?,?,?,?,?,?,?,?)",
            [orderNo, products, pids, order.firstName.trim() + " " + order.lastName.trim(), order.address.trim() + " / " + order.state, amount, 1, u_id || null]

        );
        for (const urun of sepet) {
            await db.query("UPDATE products SET p_stock = p_stock - ? WHERE p_id = ?", [urun.quantity, urun.p_id]);
        }


        res.status(201).json({ message: "Siparişin alındı! No: " + orderNo, orderNo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//? Update ORDERS - PUT - SQL sorgu : UPDATE
app.put("/api/orders/:id", async (req, res) => {

    try {

        const id = Number(req.params.id);

        const { status } = req.body;

        if (isNaN(id)) return res.status(400).json({ error: "Geçersiz ID" });

        if (status === undefined) return res.status(400).json({ error: "Durum bilgisi eksik" });


        const [result] = await db.query(

            "UPDATE orders SET o_status=? WHERE o_id=?",

            [status, id]

        );

        res.status(200).json("Sipariş durumu güncellendi");
    } catch (err) {

        res.status(500).json({ error: "Sunucu hatası" });

    }

});
//? Delete ORDERS - SQL sorgu : DELETE
app.delete("/api/orders/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const [result] = await db.query("DELETE FROM orders WHERE o_id=?",
            [id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: "Sipariş bulunamadı" });
        res.status(200).json("Sipariş silindi.");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// !------------------------------------------

// ? CONTACT MESSAGES - POST - SQL SORGU : INSERT INTO 
app.post("/api/contact", async (req, res) => {
    try {
        const { firstName, lastName, email, message } = req.body;
        if (!firstName || !lastName || !email || !message) return res.status(400).json({ error: "Hatalı veri geldi" });
        const [result] = await db.query(
            "INSERT INTO messages (m_firstName,m_lastName,m_email,m_message,m_status) VALUES (?,?,?,?,?)",
            [firstName.trim(), lastName.trim(), email.trim(), message.trim(), 0]
        );

        res.status(201).json("Mesajınız alındı");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ? REGISTER - POST - SQL SORGU: INSERT INTO
app.post("/api/register", async (req, res) => {
    try {
        const { firstName, lastName, email, pass, birthdate } = req.body;

        if (!firstName || !lastName || !email || !pass || !birthdate) return res.status(400).json({ error: "Eksik ya da hatalı veri geldi" });
        const [result] = await db.query(
            "INSERT INTO users (u_firstName,u_lastName,u_email,u_pass,u_birthdate,u_role) VALUES (?,?,?,?,?,?)",
            [firstName.trim(), lastName.trim(), email.trim(), pass, birthdate, 0]
        );

        res.status(201).json(firstName + " " + lastName + " adlı kullanıcı eklendi");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// ? LOGIN - POST - SQL SORGU : Select 
app.post("/api/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const [rows] = await db.query("SELECT u_id,u_role,u_firstName FROM users WHERE u_email=? AND u_pass=?", [email, pass]);

        if (rows.length > 0)
            return res.status(200).json(rows);
        else
            return res.status(401).json({ error: "E-posta veya parola hatalı" })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//? ADMIN PAGE- USERNAME
app.post("/api/getUsername", async (req, res) => {
    const { id } = req.body;
    try {
        const [rows] = await db.query("SELECT u_firstName FROM users WHERE u_id=?", [id]);
        if (rows.length > 0)
            return res.status(200).json(rows[0].u_firstName);
        else
            return res.status(404).json({ error: "Kullanıcı bulunamadı" })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// !------------------------------------------

// !Products Page
app.get("/api/productPage", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM products WHERE p_active=1 ORDER BY p_id ASC",);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT;

app.use((req, res) => {
    res.status(404).json({ error: "Endpoint bulunamadı: " + req.method + " " + req.originalUrl });
});
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: "Dosya Yüklenemedi: " + err.message });
    }
    res.status(500).json({ error: err.message });
});
app.listen(PORT, () => console.log(`Backend: http://localhost:${PORT}`));