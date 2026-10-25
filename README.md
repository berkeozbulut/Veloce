# VELOCE .

Motosiklet sürücüleri için geliştirilmiş, ekipman satışı ve içerik sunan bir e-ticaret sitesi. Kullanıcılar ürünleri inceleyip arayabilir, sepete ekleyip sipariş verebilir ve kendi panellerinden siparişlerini takip edebilir. Yöneticiler ise ürünleri, kullanıcıları, siparişleri ve iletişim mesajlarını admin panelinden yönetir.

Bu proje, full stack geliştirme eğitimim sürecinde frontend, backend ve veritabanı katmanlarını uçtan uca kurmak amacıyla geliştirilmiştir.

## Kullanılan Teknolojiler

**Frontend**
- **Vue 3 (Options API):** Sayfalar ve bileşenler
- **Vue Router:** Sayfa yönlendirme ve rol bazlı sayfa koruması (route guard)
- **Bootstrap 5 + Bootstrap Icons:** Responsive arayüz ve ikonlar
- **Vite:** Geliştirme sunucusu ve build

**Backend**
- **Node.js + Express 5:** REST API
- **MySQL (XAMPP / MariaDB):** Veritabanı, `mysql2` ile bağlantı

**Güvenlik ve dosya yönetimi**
- **JWT (jsonwebtoken):** Giriş yapan kullanıcıya token verilir, korumalı endpoint'ler token ile doğrulanır
- **bcrypt (bcryptjs):** Şifreler veritabanına hash'lenerek kaydedilir
- **Multer:** Ürün görsellerinin yüklenmesi (yalnızca görsel dosyaları, en fazla 2 MB)
- **dotenv:** Veritabanı bilgileri ve gizli anahtarlar kod dışında, `.env` dosyasında tutulur

## Özellikler

**Kullanıcı tarafı**
- Ürün listeleme ve ürün adına göre arama
- Sepet: adet artırma/azaltma (stok sınırına kadar), ürün silme
- Üye olarak veya misafir olarak sipariş verme
- Kullanıcı paneli: sipariş özeti, sipariş geçmişi, kişisel bilgileri ve şifreyi güncelleme, hesap silme
- Blog: kategorili yazılar, yazının tamamı açılır pencerede okunur
- İletişim formu, Hakkımızda ve SSS sayfaları
- Tüm sayfalar mobil uyumlu (responsive)

**Admin paneli**
- Ürün ekleme, güncelleme, silme ve ürün görseli yükleme
- Kullanıcı ekleme, güncelleme (rol atama dahil) ve silme
- Sipariş durumlarını güncelleme
- İletişim mesajlarını okundu olarak işaretleme ve silme

**Güvenlik**
- Rol bazlı yetkilendirme: `verifyToken`, `isAdmin` ve `isSelfOrAdmin` middleware'leri. Kullanıcı yalnızca kendi verisine, admin tüm verilere erişir.
- Sipariş tutarı ve stok kontrolü backend'de, veritabanındaki fiyatlarla hesaplanır. Tarayıcıdan gelen tutara güvenilmez.
- Aynı e-posta ile ikinci kez kayıt olunamaz (veritabanında `UNIQUE` kuralı).
- Silme ve çıkış işlemleri için onay penceresi, işlem sonuçları için site temalı uyarı kutuları.

## Kurulum

**Gereksinimler:** [Node.js](https://nodejs.org) (22.18 veya üzeri), [XAMPP](https://www.apachefriends.org) (MySQL için), Git

**1. Projeyi indirin**
```bash
git clone <repo-adresi>
cd VELOCE
```

**2. Veritabanını kurun**
1. XAMPP Control Panel'den **MySQL**'i başlatın.
2. phpMyAdmin'de (`http://localhost/phpmyadmin`) `veloce` adında yeni bir veritabanı oluşturun.
3. `veloce` seçiliyken **İçe aktar** sekmesinden `database/veloce.sql` dosyasını içe aktarın.

**3. Backend'i çalıştırın**
```bash
cd backend
npm install
```
`backend/sql-db/.env.example` dosyasını aynı klasöre `.env` adıyla kopyalayın ve değerleri doldurun. XAMPP'ın varsayılan ayarlarında `DB_PASSWORD` boş kalabilir. `JWT_SECRET` için uzun ve tahmin edilemez bir değer yazın.
```bash
npm start
```
Backend `http://localhost:3001` adresinde çalışır.

**4. Frontend'i çalıştırın** (yeni bir terminalde)
```bash
cd frontend
npm install
npm run dev
```
Site `http://localhost:5173` adresinde açılır.

## Test Hesapları

| Rol | E-posta | Şifre |
|---|---|---|
| Admin | test.admin@veloce.com | Admin123. |
| Kullanıcı | test.kullanici@veloce.com | Kullanici123. |

## Bilinen Eksikler

- **Ödeme simülasyondur.** Kart bilgileri formda yer alır ancak backend'e gönderilmez ve saklanmaz.
- **Backend adresi sabit yazılıdır** (`http://localhost:3001`). Canlı ortama taşınırken bir ortam değişkenine alınmalıdır.
- **Token süresi 1 saattir** ve yenileme (refresh token) mekanizması yoktur. Süre dolunca kullanıcı tekrar giriş yapar. Token `sessionStorage`'da tutulur.
- **Sipariş kaydı ve stok düşümü bir transaction içinde değildir.** Aynı anda gelen iki sipariş son ürünü birlikte alabilir.
- **Misafir siparişlerinde `u_id` tarayıcıdan gelir.** Siparişin hangi kullanıcının listesinde görüneceği istemci tarafından belirlenir; tutar ve stok bundan etkilenmez.
- Ürün görseli değiştirildiğinde veya ürün silindiğinde **eski görsel dosyası `uploads` klasöründen silinmez.**
- E-posta değişikliğinde doğrulama (onay e-postası) yapılmaz.
- Blog yazıları veritabanında değil, frontend'deki bir veri dosyasında tutulur.

## Planlanan Geliştirmeler

- Mobil cihazlar için alt menü çubuğu (bottom navigation)
- Ürün detay sayfası
- Admin panelinden ürünlere indirim tanımlama
- Blog yazılarının admin panelinden yönetilmesi
- Motosiklet karşılaştırma ve forum sayfaları
- Sipariş sonrası e-posta bildirimi
- Ürünler sayfası için filtre özelliği (cinsiyet-yaş-beden ölçüsü)
