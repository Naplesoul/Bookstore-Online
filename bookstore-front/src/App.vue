<template>
  <div id="container">
    <div id="header">
      <div class="logo">
        <img alt="logo" src="./assets/logo.png" height="50" width="50">
      </div>
      <div class="title">
        <h1>eBookstore</h1>
      </div>
      <div class="username">
        <h3>swh</h3>
      </div>
      <div class="userimage">
        <img alt="logo" src="./assets/logo.png" height="30" width="30">
      </div>
    </div>
    <div id="content">
      <div id="sider">

      </div>
      <div id="app">
        <HomePage/>
      </div>
    </div>

  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'

export default {
  name: 'App',
  components: {
    HomePage
  }
}
</script>

<style>
#container
{

}

#header
{
  float: top;
  height: 80px;
  background: #2c3e50;
}

#header>div.logo
{
  height: 50px;
  float: left;
  margin-top: 15px;
  margin-left: 30px;
}

#header>div.title
{
  height: 50px;
  float: left;
  margin-top: 15px;
  margin-left: 30px;
}

#header>div.title>h1
{
  size: 50px;
  margin-top: 0px;
  color: white;
}

#header>div.username
{
  float: right;
  margin-right: 30px;
  margin-top: 25px;
  height: 30px;
}

#header>div.username>h3
{
  size: 30px;
  margin-top: 0px;
  color: white;
}

#header>div.userimage
{
  height: 30px;
  width: 30px;
  float: right;
  margin-right: 10px;
  margin-top: 25px;
  /*background: cyan;*/
}

#content
{
  height: 720px;
  /*background: #9900CC;*/
}

#sider
{
  height: 715px;
  width: 200px;
  margin-top: 5px;
  float: left;
  background: aqua;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
