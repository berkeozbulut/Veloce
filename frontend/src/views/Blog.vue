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
        <img src="../assets/img/blog-ekipman.png" class="d-block w-100" alt="ekipman rehberi">
      </div>
      <div class="carousel-item">
        <img src="../assets/img/blog-sehir.png" class="d-block w-100" alt="Şehir sürüşü">
      </div>
      <div class="carousel-item">
        <img src="../assets/img/blog-uzunyol.png" class="d-block w-100" alt="uzun yol">

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
  <!-- !Yazı kartları -->
  <div class="row g-4 mt-2">
    <div v-for="post in blogPosts" :key="post.id" class="col-12 col-md-6 col-lg-4">
      <div class="card h-100 blog-card">
        <div class="card-body d-flex flex-column">
          <span class="blog-badge align-self-start mb-2">{{ post.category }}</span>
          <h5 class="card-title">{{ post.title }}</h5>
          <p class="card-text text-muted blog-summary">{{ post.summary }}</p>
          <div class="d-flex justify-content-between align-items-center mt-auto">
            <small class="text-muted"><i class="bi bi-clock"></i> {{ post.readTime }} dk</small>
            <button type="button" class="btn btn-sm btn-veloce" data-bs-toggle="modal" data-bs-target="#blogModal"
              @click="selectedPost = post">Yazıyı Oku</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- !Yazı modalı -->
  <div class="modal fade" id="blogModal" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-scrollable modal-fullscreen-sm-down">
      <div class="modal-content">
        <div class="modal-header align-items-start">
          <div>
            <span class="blog-badge mb-2">{{ selectedPost.category }}</span>
            <h4 class="modal-title">{{ selectedPost.title }}</h4>
            <small class="text-muted">{{ selectedPost.readTime }} dk okuma</small>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Kapat"></button>
        </div>
        <div class="modal-body blog-body">
          <template v-for="(block, i) in selectedPost.content" :key="i">
            <h5 v-if="block.h">{{ block.h }}</h5>
            <p v-else-if="block.p">{{ block.p }}</p>
            <ul v-else-if="block.ul">
              <li v-for="(item, j) in block.ul" :key="j">{{ item }}</li>
            </ul>
          </template>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { blogPosts } from '@/data/blogPosts';

export default {
  data() {
    return {
      blogPosts,
      selectedPost: blogPosts[0],
    };
  },
};
</script>

<style scoped>
.blog-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;
}

.blog-card:hover {
  transform: translateY(-4px);
}

.blog-badge {
  display: inline-block;
  color: #991b1b;
  font-size: 0.85rem;
  font-weight: 500;
  padding-bottom: 2px;
  border-bottom: 2px solid #991b1b;
}

.blog-summary {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.btn-veloce {
  background-color: #991b1b;
  color: white;
}

.btn-veloce:hover {
  background-color: #7f1d1d;
  color: white;
}

.blog-body h5 {
  margin-top: 1.5rem;
  font-weight: 700;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.6));
}


</style>
