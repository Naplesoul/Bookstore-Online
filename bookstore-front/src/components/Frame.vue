<template>
  <div id="frameContainer">
    <div id="header_container">
      <div id="header">
        <div class="logo">
          <img alt="logo" src="../assets/logo.png" height="100%">
        </div>
        <div class="title">
          <h1>eBookstore</h1>
        </div>
        <div class="username">
          <h3>Naplesoul</h3>
        </div>
        <div class="userimage">
          <img alt="logo" src="../assets/userimage1.jpg" height="100%" style="border-radius: 50%">
        </div>
        <input id="Search" name="searchBook" type="searchBook" placeholder="  Search Books">
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
      <component v-bind:is="chooseSubPage"></component>
    </div>

  </div>
</template>

<script>
import HomePage from './HomePage.vue';
import BrowsePage from "@/components/BrowsePage";
import CartPage from "@/components/CartPage";
import InfoPage from "@/components/InfoPage";
import OrderPage from "@/components/OrderPage";
import ProfilePage from "@/components/ProfilePage";

export default
{
  name: "Frame",
  components:
  {
    HomePage,
    BrowsePage,
    CartPage,
    InfoPage,
    OrderPage,
    ProfilePage,
  },
  computed:{
    chooseSubPage(){
      switch (this.subPage)
      {
        case 0: return 'HomePage'
        case 1: return 'BrowsePage'
        case 2: return 'InfoPage'
        case 3: return 'CartPage'
        case 4: return 'OrderPage'
        case 5: return 'ProfilePage'
        default: return 'HomePage'
      }
    }
  },
  data(){
    return{
      subPage: 0
    }
  }
}
</script>

<style scoped>

h1
{
  font-family: "Arial";
}

h3
{
  font-family: "Arial";
}

#header_container
{
  float: top;
  width: 100%;
  height: 8vh;
}

#header
{
  position: fixed;
  top: 0;
  width: 100%;
  height: 8vh;
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
  margin-right: 3%;
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
  height: 50%;
  float: right;
  margin-right: 1%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

#header>input#Search
{
  width: 18vw;
  height: 3vh;
  font-size: 2vh;
  font-family: "Arial";
  border-radius: 10px;
  float: right;
  margin-right: 4%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

#content
{
  float: top;
  height: 1500px;
  width: 97%;
  /*background: #9900CC;*/
}

#sider
{
  position: fixed;
  height: 100%;
  width: 12%;
  margin-top: 0;
  /*background: aqua;*/
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
  border-right: 6px solid #2196F3;
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

#app
{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>