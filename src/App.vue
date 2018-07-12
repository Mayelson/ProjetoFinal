<template>
    <div class="container">
        <nav-bar></nav-bar>
            <br>
            <router-view></router-view>
            <br>
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
    background-color: #dae0e5;
  }
</style>