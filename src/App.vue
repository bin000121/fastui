<template>
  <router-view />
</template>

<script>

export default {
  name: 'App'
}
</script>
<style>
html, body{
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: 100%;
}
#app{
  height: 100%;
  font-family: Helvetica;
}
a{
  text-decoration: none;
}
h2{
  font-weight: 300;
}
h3{
  margin: 60px 0 15px;
}
code{
  line-height: 20px;
  font-size: 13px;
  background-color: #fafafa!important;
  border: 1px solid #eee;
  font-family: Menlo,Monaco,Consolas,Courier;
}
div.desc{
  color: #999;
  margin: 15px 0;
}
div.desc b{
  display: inline-block;
  padding: 2px 8px;
  color: #666;
  background-color: #eee;
  border: 1px solid #bbb;
  vertical-align: baseline;
  border-radius: 5px;
}
</style>
