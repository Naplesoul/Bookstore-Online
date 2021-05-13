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
      <div class="buy">
        <button class="cartButton">加入购物车</button>
        <button class="buyButton">立即购买</button>
      </div>
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
  width: 33vw;
  float: left;
  margin-left: 20vw;
  margin-top: 8vh;
}

div.description
{
  float: left;
  height: 64vh;
  width: 30vw;
  margin-left: 5vw;
  margin-top: 12vh;
}

.description>h2
{
  font-family: "Microsoft YaHei UI";
  font-size: 3vh;
  font-weight: bolder;
  margin: 3vh 1vw;
}

.description>p
{
  font-family: "Microsoft YaHei UI";
  font-size: 2vh;
  margin: 2vh 1vw;
}

div.description>div.buy
{
  position: absolute;
  top: 76vh;
  width: 30vw;
  height: 8vh;
  /*background: #ddffff;*/
}

div.buy>button.cartButton
{
  float: left;
  height: 8vh;
  width: 40%;
  border-radius: 10px;
  font-size: 3vh;
  font-family: "Microsoft YaHei UI";
  font-weight: bolder;
  background: #f5d651;
}

div.buy>button.buyButton
{
  float: right;
  height: 8vh;
  width: 40%;
  border-radius: 10px;
  font-size: 3vh;
  font-family: "Microsoft YaHei UI";
  font-weight: bolder;
  background: #d53838;
  color: white;
}

</style>