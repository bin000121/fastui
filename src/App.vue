<template>
  <router-view />
</template>

<script>

export default {
  name: 'App'
}
</script>
<style>
:root{
  --primary: #1661ab;
  --primary-disabled: #9fc7e8;
}
html, body{
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: 100%;
  font-family: Helvetica!important;

}
#app{
  height: 100%;
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
ul > li{
  list-style: none;
}
code{
  line-height: 1.5;
  font-size: 13px;
  background-color: #fafafa!important;
  border: 1px solid #eee;
  font-family: Menlo,Monaco,Consolas,Courier;
}
div.desc{
  color: #999;
  margin: 30px 0;
  line-height: 1.2;
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
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
[class^='f-icon'] {
  font-family: "fast-icons" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
h3 [class='f-icon-anchor'] {
  font-size: 19px;
  vertical-align: bottom;
  font-weight: 700;
  color: #1661abb3;
  display: none;
}
h3 [class='f-icon-anchor']:hover{
  color: #1661ab;
}
</style>
