<template>
  <div>
    <div class="container-fluid tm-container-content tm-mt-60">
      <div class="row mb-4">
        <h2 class="col-12 tm-text-primary">{{ imageData.chemin }}</h2>
      </div>
      <div class="row tm-mb-90">
        <div class="col-8">
          <div v-if="formatImage == 'petit'" class="col-xl-8 col-lg-7 col-md-6 col-sm-12">
            <img :src="require('../assets/photos/petit-' + imageData.chemin)" alt="Image" style="margin-bottom: 10%" class="img-fluid">
          </div>

          <div v-if="formatImage == 'moyen'" class="col-xl-8 col-lg-7 col-md-6 col-sm-12">
            <img :src="require('../assets/photos/moyen-' + imageData.chemin)" alt="Image" style="margin-bottom: 10%" class="img-fluid">
          </div>

          <div v-if="formatImage == 'grand'" class="col-xl-8 col-lg-7 col-md-6 col-sm-12">
            <img :src="require('../assets/photos/grand-' + imageData.chemin)" alt="Image" style="margin-bottom: 10%" class="img-fluid">
          </div>

        </div>

        <div class=" col-4 col-xl-4 col-lg-5 col-md-6 col-sm-12">
          <div class="tm-bg-gray tm-video-details">
            <ul class="tm-social pl-0 mb-0">
              <span class="tm-text-gray-dark">Format: </span><span class="tm-text-primary">
                <br>
              <li @click="formatImage = 'petit'" class="tm-text-primary mr-4 mb-2 d-inline-block">Petit</li>
              <li @click="formatImage = 'moyen'" class="tm-text-primary mr-4 mb-2 d-inline-block">Moyen</li>
              <li @click="formatImage = 'grand'" class="tm-text-primary mr-4 mb-2 d-inline-block">Grand</li>

              </span>
            </ul>

            <div class="text-center mb-5">
              <a @click="downloadpicture" class="btn btn-primary tm-btn-big">Download</a>
            </div>

            <div class="text-center mb-5">
              <a @click="downloadZippicture" class="btn btn-primary tm-btn-big">ZIP DOWNLOAD</a>
            </div>

            <div class="mb-4">
              <h3 class="tm-text-gray-dark mb-3">Description</h3>
              <p>{{ imageData.description }}</p>
            </div>
            <div>
              <h3 class="tm-text-gray-dark mb-3">Tags</h3>
              <a href="#" class="tm-text-primary mr-4 mb-2 d-inline-block">Cloud</a>
              <a href="#" class="tm-text-primary mr-4 mb-2 d-inline-block">Bluesky</a>
              <a href="#" class="tm-text-primary mr-4 mb-2 d-inline-block">Nature</a>
              <a href="#" class="tm-text-primary mr-4 mb-2 d-inline-block">Background</a>
              <a href="#" class="tm-text-primary mr-4 mb-2 d-inline-block">Timelapse</a>
              <a href="#" class="tm-text-primary mr-4 mb-2 d-inline-block">Night</a>
              <a href="#" class="tm-text-primary mr-4 mb-2 d-inline-block">Real Estate</a>
            </div>
          </div>
        </div>
      </div>

    </div>


    <div style="display: none">
      <img id="small_picture" :src="require('../assets/photos/petit-' + imageData.chemin)" alt="Image" style="margin-bottom: 10%" class="img-fluid">
      <img id="middle_picture" :src="require('../assets/photos/moyen-' + imageData.chemin)" alt="Image" style="margin-bottom: 10%" class="img-fluid">
      <img id="big_picture" :src="require('../assets/photos/grand-' + imageData.chemin)" alt="Image" style="margin-bottom: 10%" class="img-fluid">
    </div>


  </div>
</template>


<script>

import axios from 'axios';
import jszip from 'jszip';
import { saveAs } from 'file-saver';



export default {
  data() {
    return {
      imageData : [],
      formatImage : "moyen",
      formatCheminDl : "",
    };
  },
  created() {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  },
  mounted() {
    console.log("Ici")


    let id = localStorage.getItem("idPhotoClick")
    axios.get("http://localhost:8085/api/v1/images/"+ id, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })
        .then(responseDataImage => {
          console.log("DATA IMAGES")
          console.log(responseDataImage.data)
          this.imageData = responseDataImage.data
        })
        .catch(error => {
          console.log("erreur")
          console.log(error)
        })
  },
  methods: {

    goodFormatDate(dateFormat){
      let dateGoodFormat = dateFormat.split("-")

      return dateGoodFormat[2]+"/"+dateGoodFormat[1]+"/"+dateGoodFormat[0]

    },
    photoDetailsDirector(id){
      console.log("Id de l'image bg")
      console.log(id)

      localStorage.setItem("idPhotoClick", id)
      this.$router.push('/photo-details')
    },
    downloadpicture(){



      if (this.formatImage == 'petit') {
        this.formatCheminDl = "petit"
      } else if (this.formatImage == 'moyen') {
        this.formatCheminDl = "moyen"
      } else if (this.formatImage == 'grand') {
        this.formatCheminDl = "grand"
      }

      let pictureLink = require('../assets/photos/'+ this.formatCheminDl +'-' + this.imageData.chemin)
      console.log(pictureLink)

      var fileURL = 'http://localhost:8082' + pictureLink;
      var fileLink = document.createElement('a');

      console.log();

      console.log(fileURL);
      console.log(fileLink);
      fileLink.href = fileURL;
      fileLink.setAttribute('download', this.imageData.chemin);
      document.body.appendChild(fileLink);

      fileLink.click();

    },


    downloadZippicture(){
      let zip = new jszip();
      zip.file("Hello.txt", "Hello World\n");

      if (this.formatImage == 'petit') {
        this.formatCheminDl = "petit"
      } else if (this.formatImage == 'moyen') {
        this.formatCheminDl = "moyen"
      } else if (this.formatImage == 'grand') {
        this.formatCheminDl = "grand"
      }













      zip.file("Goodbye.txt", "Goodbye, cruel world\n");
      let middle_picture = document.getElementById('middle_picture')
      let small_picture = document.getElementById('small_picture')
      let big_picture = document.getElementById('big_picture')
      // .getAttribute("data");
      let dataImage_middle = this.getBase64Image(middle_picture)
      let dataImage_small = this.getBase64Image(small_picture)
      let dataImage_big = this.getBase64Image(big_picture)



      console.log(dataImage_middle.width)

      var img = zip.folder("images");
      img.file("middle_" + this.imageData.chemin , dataImage_middle , {base64: true});
      img.file("small_" + this.imageData.chemin , dataImage_small , {base64: true});
      img.file("big_" + this.imageData.chemin , dataImage_big , {base64: true});


      zip.generateAsync({type:"blob"})
          .then(function(content) {
            // see FileSaver.js
            saveAs(content, "images.zip");
          });
    },

    getBase64Image(img) {
      // Create an empty canvas element
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      // Copy the image contents to the canvas
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Get the data-URL formatted image
      // Firefox supports PNG and JPEG. You could check img.src to
      // guess the original format, but be aware the using "image/jpg"
      // will re-encode the image.
      var dataURL = canvas.toDataURL("image/png");

      return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

  },
  components: {
  }
};
</script>

<style scoped>
.imgList {
  display: flex;
  flex-wrap: wrap;
}
.imgBlock {
  padding: 0.5rem;
  margin: 1rem;
  box-shadow: 0px 5px 10px rgb(221, 221, 221);
}
.imgPreview {
  max-width: 20vw;
  max-height: 20vh;
}

input {
  border: 0px;
  box-shadow: inset 0px 2px 10px rgb(221, 221, 221), inset 0px -2px 10px rgb(221, 221, 221);
  width: 50%;
  height:2rem;
  padding: 0.5rem;
}


#loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
}
#loader {
  display: block;
  position: relative;
  left: 50%;
  top: 50%;
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #3498db;

  -webkit-animation: spin 2s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
  animation: spin 2s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */

  z-index: 1002;
}

#loader:before {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #e74c3c;

  -webkit-animation: spin 3s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
  animation: spin 3s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
}

#loader:after {
  content: "";
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #f9c922;

  -webkit-animation: spin 1.5s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
  animation: spin 1.5s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
}

@-webkit-keyframes spin {
  0%   {
    -webkit-transform: rotate(0deg);  /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(0deg);  /* IE 9 */
    transform: rotate(0deg);  /* Firefox 16+, IE 10+, Opera */
  }
  100% {
    -webkit-transform: rotate(360deg);  /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(360deg);  /* IE 9 */
    transform: rotate(360deg);  /* Firefox 16+, IE 10+, Opera */
  }
}
@keyframes spin {
  0%   {
    -webkit-transform: rotate(0deg);  /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(0deg);  /* IE 9 */
    transform: rotate(0deg);  /* Firefox 16+, IE 10+, Opera */
  }
  100% {
    -webkit-transform: rotate(360deg);  /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(360deg);  /* IE 9 */
    transform: rotate(360deg);  /* Firefox 16+, IE 10+, Opera */
  }
}

#loader-wrapper .loader-section {
  position: fixed;
  top: 0;
  width: 51%;
  height: 100%;
  background: #222222;
  z-index: 1001;
  -webkit-transform: translateX(0);  /* Chrome, Opera 15+, Safari 3.1+ */
  -ms-transform: translateX(0);  /* IE 9 */
  transform: translateX(0);  /* Firefox 16+, IE 10+, Opera */
}

#loader-wrapper .loader-section.section-left {
  left: 0;
}

#loader-wrapper .loader-section.section-right {
  right: 0;
}

/* Loaded */
.loaded #loader-wrapper .loader-section.section-left {
  -webkit-transform: translateX(-100%);  /* Chrome, Opera 15+, Safari 3.1+ */
  -ms-transform: translateX(-100%);  /* IE 9 */
  transform: translateX(-100%);  /* Firefox 16+, IE 10+, Opera */

  -webkit-transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
  transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
}

.loaded #loader-wrapper .loader-section.section-right {
  -webkit-transform: translateX(100%);  /* Chrome, Opera 15+, Safari 3.1+ */
  -ms-transform: translateX(100%);  /* IE 9 */
  transform: translateX(100%);  /* Firefox 16+, IE 10+, Opera */

  -webkit-transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
  transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
}

.loaded #loader {
  opacity: 0;
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
}
.loaded #loader-wrapper {
  visibility: hidden;

  -webkit-transform: translateY(-100%);  /* Chrome, Opera 15+, Safari 3.1+ */
  -ms-transform: translateY(-100%);  /* IE 9 */
  transform: translateY(-100%);  /* Firefox 16+, IE 10+, Opera */

  -webkit-transition: all 0.3s 1s ease-out;
  transition: all 0.3s 1s ease-out;
}

p { line-height: 1.8; }

a {
  text-decoration: none;
  transition: all 0.3s ease;
}
a:hover { color:#009999; }
.container-fluid { max-width: 1770px; }
.tm-container-small { max-width: 1050px; }
.btn { border-radius: 0; }
.btn-primary {
  background-color: #009999;
  border: 0;
  border-radius: 5px;
  padding: 12px 50px 14px;
  font-size: 1.2rem;
}

.btn-primary:hover,
.btn-primary:focus {
  background-color:#086969;
}

.btn-primary.disabled,
.btn-primary:disabled {
  background-color: #009999;
  pointer-events: all;
  cursor: not-allowed;
}

.form-control {
  padding: 10px 20px;
  width: 100%;
  height: auto;
}

.form-group { margin-bottom: 25px; }
.tm-btn-big { padding: 12px 90px 14px; }

.navbar-toggler:focus { box-shadow: none; }
.navbar-brand {
  color: #3399CC;
  font-size: 1.6rem;
}

.navbar-brand i { font-size: 2rem; }

.tm-hero {
  min-height: 200px;
  background: transparent;
}

.tm-mt-60 { margin-top: 60px; }
.tm-mb-50 { margin-bottom: 50px; }
.tm-mb-74 { margin-bottom: 74px; }
.tm-mb-90 { margin-bottom: 90px; }
.tm-text-primary { color: #009999; }
.tm-text-secondary { color: #CC6699; }
a.tm-text-primary:hover { color:#666666; }
.tm-bg-gray { background-color: #EEEEEE; }
.tm-input-paging {
  width: 40px;
  border-radius: 0;
  border: 1px solid #CCCCCC;
  background: #f4f4f4;
  text-align: center;
}

.nav-item { margin-right: 30px; }
.nav-item:last-child { margin-right: 0; }

.nav-link {
  color: #666666;
  border-bottom: 4px solid transparent;
  font-size: 1.2rem;
}

.nav-link-1.active,
.nav-link-1:hover {
  border-color: #33CCFF;
}

.nav-link-2.active,
.nav-link-2:hover {
  border-color: #FF6666;
}

.nav-link-3.active,
.nav-link-3:hover {
  border-color: #33CC66;
}

.nav-link-4.active,
.nav-link-4:hover {
  border-color: #CC66CC;
}

.tm-search-input {
  width: 360px;
  border-radius: 0;
  padding: 12px 15px;
  color: #009999;
  border: none;
}

.tm-search-input:focus {
  border-color: #009999;
  box-shadow: 0 0 0 0.25rem rgb(0 153 153 / 0.25);
}

.tm-search-input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #009999;
  opacity: 1; /* Firefox */
}

.tm-search-input::-ms-input-placeholder { /* Microsoft Edge */
  color: #009999;
}

.tm-search-btn {
  color: white;
  background-color: #009999;
  border: none;
  width: 100px;
  height: 50px;
  margin-left: -1px;
}

p, .tm-text-gray { color: #999; }
.tm-text-gray-light { color: #CCC; }
.tm-text-gray-dark { color: #666; }

.tm-video-item {
  position: relative;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
}

.tm-video-item img {
  position: relative;
  display: block;
  min-height: 100%;
  max-width: 100%;
  opacity: 0.8;
}

.tm-video-item figcaption {
  padding: 2em;
  color: #fff;
  text-transform: uppercase;
  font-size: 1.25em;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.tm-video-item figcaption::before,
.tm-video-item figcaption::after {
  pointer-events: none;
}

.tm-video-item figcaption,
.tm-video-item figcaption > a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.tm-video-item figcaption > a {
  z-index: 1000;
  text-indent: 200%;
  white-space: nowrap;
  font-size: 0;
  opacity: 0;
}

.tm-video-item h2 {
  word-spacing: -0.15em;
  font-weight: 300;
}

.tm-video-item h2,
.tm-video-item p {
  margin: 0;
}

.tm-video-item p {
  letter-spacing: 1px;
  font-size: 68.5%;
}

.tm-gallery div.d-block { animation: show .5s ease; }

@keyframes show {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.tm-paging-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  font-size: 1.1rem;
  color: #999;
  background-color: #EEEEEE;
  margin: 10px;
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.tm-paging-link:hover,
.tm-paging-link.active {
  background-color: #009999;
  color: #fff;
}

/*---------------*/
/***** Ming *****/
/*---------------*/

figure.effect-ming {
  background: #030c17;
}

figure.effect-ming img {
  opacity: 0.9;
  -webkit-transition: opacity 0.35s;
  transition: opacity 0.35s;
}

figure.effect-ming figcaption::before {
  position: absolute;
  top: 30px;
  right: 30px;
  bottom: 30px;
  left: 30px;
  border: 2px solid #fff;
  box-shadow: 0 0 0 30px rgba(255,255,255,0.2);
  content: '';
  opacity: 0;
  -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
  transition: opacity 0.35s, transform 0.35s;
  -webkit-transform: scale3d(1.4,1.4,1);
  transform: scale3d(1.4,1.4,1);
}

figure.effect-ming h2 {
  font-size: 1.3em;
  opacity: 0;
  -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
  transition: opacity 0.35s, transform 0.35s;
  -webkit-transform: scale(1.5);
  transform: scale(1.5);
}

figure.effect-ming:hover figcaption::before,
figure.effect-ming:hover h2 {
  opacity: 1;
  -webkit-transform: scale3d(1,1,1);
  transform: scale3d(1,1,1);
}

figure.effect-ming:hover figcaption { background-color: rgba(58,52,42,0); }
figure.effect-ming:hover img { opacity: 0.4; }

.tm-footer-links li {
  list-style: none;
  margin-bottom: 5px;
}

.tm-footer-links li a { color: #999999; }
.tm-footer-links li a:hover { color: #009999; }

.tm-social-links li {
  list-style: none;
  margin-right: 15px;
}

.tm-social-links li:last-child { margin-right: 0; }

.tm-social-links li a  {
  color: #999999;
  width: 44px;
  height: 44px;
  display: flex;
  background-color: #fff;
  align-items: center;
  justify-content: center;
}

.tm-social-links li a:hover {
  color: #fff;
  background-color: #009999;
}

.tm-footer { font-size: 0.95rem; }
.tm-footer-title { font-size: 1.4rem; }

/* Videos */
#tm-video-container {
  max-height: 400px;
  overflow: hidden;
  background-color: #333;
  margin-bottom: 90px;
  position: relative;
}

#tm-video {
  display: block;
  width: 100%;
  height: auto;
}

#tm-video-control-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  color: #e1e1e1;
}

.tm-video-details {
  height: 100%;
  padding: 40px;
}

/* About */
.tm-row-1640 { max-width: 1640px; }
.tm-about-2-col { max-width: 716px; }
.tm-about-3-col { max-width: 540px; }

.tm-about-2-col,
.tm-about-3-col {
  margin-bottom: 50px;
}

.tm-about-icon-container {
  width: 150px;
  height: 150px;
  border: 1px solid #009999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tm-about-img-text { max-width: 940px; }

/* Contact */
select.form-control { border-radius: 0; }
select.form-control option { height: 30px; }

select:not([multiple]) {
  -webkit-appearance: none;
  -moz-appearance: none;
  background-position: right 15px center;
  background-repeat: no-repeat;
  /*background-image: url(../img/select-arrow.png);*/
  padding: 14px 20px;
  padding-right: 20px;
  color: #666;
}

.mapouter{
  position:relative;
  height:480px;
  width:100%;
  max-width: 480px;
}

.gmap-canvas {
  overflow:hidden;
  background:none!important;
  height:480px;
  width:100%;
}

.tm-contact-form { max-width: 420px; }
.tm-address-col { max-width: 520px; }
.tm-contacts { padding-left: 0; }

.tm-contacts li {
  list-style: none;
  margin-bottom: 20px;
}

.tm-contacts li a i { width: 30px; }
.tm-social { display: flex; }

.tm-social li {
  list-style: none;
  margin-bottom: 20px;
  margin-right: 15px;
}

.tm-social li a i {
  width: 40px;
  height: 40px;
  color: #666666;
  background-color: #EEEEEE;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.tm-social li a:hover i {
  color: #fff;
  background-color: #009999;
}

.form-control,
input:-internal-autofill-selected,
select:not([multiple]) {
  color: #009999 !important;
}

.form-control::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color:  #009999;
  opacity: 1; /* Firefox */
}

@media (max-width: 991px) {
  .navbar-collapse {
    position: fixed;
    top: 50px;
    right: 0px;
    background: white;
    width: 150px;
    padding: 15px;
  }

  .tm-container-content { max-width: 870px; }
  .tm-contact-form, .tm-address-col, .mapouter { max-width: 100%; }
  .tm-people-row { max-width: 900px; }
}

@media (max-width: 767px) {
  .tm-paging-col { flex-direction: column; }
  .tm-paging { flex-wrap: wrap; }
  .tm-about-img-text { max-width: 640px; }
  .tm-about-2-col, .tm-about-3-col { margin-bottom: 50px; }
}

@media (max-width: 575px) {
  .tm-container-content { max-width: 420px; }

  .tm-search-form {
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
    justify-content: center;
  }

  .tm-search-input {
    width: 100%;
    max-width: 360px;
  }

  .tm-people-row { max-width: 420px; }
}

@media (max-width: 400px) {
  .tm-btn-big { padding: 12px 50px 14px; }
}

@media (max-width: 334px) {
  .tm-social-links {
    flex-wrap: wrap;
    justify-content: start !important;
  }

  .tm-social-links li { margin-right: 3px; }
}
</style>
