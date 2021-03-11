<template>
  <div id="container2">
    <component v-bind:is="choosePage"></component>
  </div>
</template>

<script>
import Frame from "@/components/Frame.vue"
import LoginPage from "@/components/LoginPage"

export default
{
  name: 'App',
  components:
  {
    Frame, LoginPage
  },
  computed:
      {
        choosePage(){
          switch (this.loginStatus)
          {
            case -1: return 'LoginPage'
            default: return 'Frame'
          }
        }
      },
  data()
  {
    return{
      loginStatus: 0
    }
  }
}


</script>

<style>
#container
{

}



body
{
  margin: 0;
}
</style>
