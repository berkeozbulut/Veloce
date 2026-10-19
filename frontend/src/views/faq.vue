<template>
<div class="content">
            <div class="accordion mt-5" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            1. Siparişlerim ne zaman kargoya verilir?
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            Hafta içi saat 16.00'ya kadar verilen siparişler aynı gün, diğer siparişler ise bir sonraki
                            iş günü kargoya teslim edilir.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            2. Ürün iadesi yapabilir miyim?
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            Evet. Kullanılmamış ve orijinal ambalajı bozulmamış ürünleri 14 gün içerisinde kolayca iade
                            edebilirsiniz.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            3. Kask bedenimi nasıl seçebilirim?
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            Her ürün sayfasında bulunan beden tablosunu inceleyerek baş çevrenize en uygun kask ölçüsünü
                            seçebilirsiniz. </div>
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

<style scoped>

</style>