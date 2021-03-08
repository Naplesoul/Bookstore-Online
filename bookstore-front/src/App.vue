<template>
  <body>
  <div id="container">
    <div id="header">
      <div class="logo">
        <img alt="logo" src="./assets/logo.png" height="100%">
      </div>
      <div class="title">
        <h1>eBookstore</h1>
      </div>
      <div class="username">
        <h3>swh</h3>
      </div>
      <div class="userimage">
        <img alt="logo" src="./assets/logo.png" height="100%">
      </div>
    </div>
    <div id="content">
      <div id="sider">
        <div class="sidebar_chosen">
          <h3>Books</h3>
        </div>
        <div class="sidebar">
          <h3>Cart</h3>
        </div>
        <div class="sidebar">
          <h3>My Orders</h3>
        </div>
        <div class="sidebar">
          <h3>My Profile</h3>
        </div>
      </div>
      <div id="app">
        <HomePage/>
      </div>
    </div>

  </div>
  </body>

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
  position: fixed;
  top: 0;
  width: 100%;
  height: 8%;
  background: #2c3e50;
}

#header>div.logo
{
  height: 70%;
  float: left;
  margin-left: 2%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

#header>div.title
{
  height: 50%;
  float: left;
  margin-left: 1%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

#header>div.title>h1
{
  font-size: 3vh;
  margin: 0;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  color: white;
}

#header>div.username
{
  height: 50%;
  width: 5%;
  float: right;
  margin-right: 2%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

#header>div.username>h3
{
  font-size: 2vh;
  margin: 0;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  color: white;
}

#header>div.userimage
{
  height: 40%;
  float: right;
  margin-right: 1%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

#content
{
  position: fixed;
  top: 8%;
  height: 92%;
  width: 100%;
  /*background: #9900CC;*/
}

#sider
{
  height: 100%;
  width: 12%;
  margin-top: 0;
  float: left;
  background: white;
  border-right: 1px solid #e8e8e8;
  /*opacity: 0.8;*/
}

#sider>div.sidebar_chosen
{
  /*position: absolute;*/
  /*top: 0;*/
  float: top;
  height: 7%;
  /*width: 10%;*/
  border-right:6px solid #2196F3;
  background: #ddffff;
}

#sider>div.sidebar_chosen>h3
{
  text-align: center;
  font-size: 2vh;
  margin: 0;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  color: black;
}

#sider>div.sidebar
{
  float: top;
  height: 7%;
}

#sider>div.sidebar>h3
{
  text-align: center;
  font-size: 2vh;
  margin: 0;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  color: black;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}

body
{
  margin: 0;
}
</style>
