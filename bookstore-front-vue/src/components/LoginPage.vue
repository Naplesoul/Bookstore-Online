<template>
  <div id="loginPageContainer">
<!--    <img alt="background" src="../assets/loginBackground.jpg" width="100%">-->
    <main>
      <div class="icon">
        <img alt="logo" src="../assets/logo.png" height="100%">
      </div>
      <input id="Email" name="email" type="email" placeholder="e-Mail">
      <input id="Password" name="password" type="password" autocomplete="current-password" placeholder="Password">
      <button class="loginButton">Login</button>
      <div class="switch">
        <a id="SignUp" tabindex="0" role="checkbox" aria-checked="false">Signup </a>
        <span style="color: white">|</span> <a id="ResetPassword" tabindex="0" role="checkbox" aria-checked="false">Forget password</a>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "LoginPage"
}
</script>

<style scoped>

#loginPageContainer
{
  overflow-y: hidden;
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/loginBackground.jpg");
  background-size: 100%;
}

#loginPageContainer>main
{
  height: 45vh;
  width: 30vw;
  background: #2c3e50a0;
  /*border-color: rgba(255,255,255,.03);*/
  /*box-shadow: rgba(0,0,0,.3) 0 20px 50px;*/
  position: relative;
  margin: 0 auto;
  text-align: center;
  top: 50vh;
  transform: translateY(-50%);

  border-radius: 10px;
  display: block;

}

#loginPageContainer>main>div.icon
{
  float: top;
  height: 17vh;
  width: 100%;
  margin-left: auto;
  margin-bottom: 2vh;
  position: relative;
  top: 2vh;
}

#loginPageContainer>main>input
{
  background: #ffffff30;

  border-radius: 5px;
  display: block;
  font-size: 2vh;
  font-family: "Arial";

  margin: 1vh auto;
  padding: 1vh 1vw;
  width: 75%;
  transition: border-color .2s;
}

#loginPageContainer>main>button.loginButton
{
  width: 82%;
  border-radius: 5px;
  display: block;
  font-family: "Arial";
  font-weight: bolder;
  font-size: 2vh;
  margin: 2vh auto;
  padding: 1vh 1vw;
  transition: all .25s;
  background: #02e785;
}

#loginPageContainer>main>div.switch>a
{
  font-family: "Arial";
  color: white;
}

</style>