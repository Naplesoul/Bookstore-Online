<template>
  <div id="infoPageContainer">
    <div class="BookPicture">
      <img alt="book picture" src="../assets/book1.jpg" width="100%">
    </div>
    <div class="description">
      <h2>深入理解计算机系统</h2>
      <p>作者：兰德尔·E·布莱恩特</p>
      <p>分类：编程</p>
      <p><span>定价：</span><span style="font-size: 3vh; color: red">￥79.99</span></p>
      <p><span>状态：</span><span>有货 </span><span style="font-size: 1vh; color: #b84949">库存300件</span></p>
      <p>作品简介：</p>
      <p style="margin-top: 0; width: 100%">程序员必读经典著作！理解计算机系统*书目，10万程序员共同选择。第二版销售突破100000册，第三版重磅上市！</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoPage"
}
</script>

<style scoped>

div.BookPicture
{
  width: 25vw;
  float: left;
  margin-left: 27vw;
  margin-top: 8vh;
}

div.description
{
  float: left;
  width: 30vw;
  margin-left: 5vw;
  margin-top: 8vh;
}

</style>