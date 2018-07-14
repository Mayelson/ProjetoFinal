<template>
  <div>
    <nav-bar></nav-bar>
    <div class="container">
        <br>
        <router-view></router-view>
        <br>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script type="text/javascript">

    import  Navbar from './components/Layout/NavBar.vue'
    import  Footer from './components/Layout/Footer.vue'

    export default {
      components: {
         'nav-bar': Navbar,
         'footer-bar': Footer
      },
      
    } 
</script>


<style type="text/css">
  body{
    background-color: #841818;
  }
</style>