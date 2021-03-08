<template>
  <div id="container">

    <div id="main">
      <div class="item">
        <h1>item</h1>
      </div>
      <div class="item">
        <h1>item</h1>
      </div>
      <div class="item">
        <h1>item</h1>
      </div>
      <div class="item">
        <h1>item</h1>
      </div>
      <div class="item">
        <h1>item</h1>
      </div>
      <div class="item">
        <h1>item</h1>
      </div>
    </div>
    <div id="footer">

    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


#main
{
  display: grid;
  float: left;
  margin-left: 15%;
  margin-top: 2%;

}

.item
{
  margin: 20px;
  height: 300px;
  width: 200px;
  background: #2196F3;
}


</style>
