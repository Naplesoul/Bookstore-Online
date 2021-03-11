<template>
  <div id="homePageContainer">
    <div id="recommendation">
      <img alt="recommend" src="@/assets/recommend1.jpg" width="100%">
    </div>
    <div id="main">
      <div class="item">
        <div class="picture">
          <img alt="pic" src="@/assets/book1.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname1</h3>
          <h4 class="price">￥79.99</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="@/assets/book2.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname2</h3>
          <h4 class="price">￥83.00</h4>
        </div>
      </div>

      <div class="item">
        <div class="picture">
          <img alt="pic" src="@/assets/book1.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname1</h3>
          <h4 class="price">￥79.99</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="@/assets/book2.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname2</h3>
          <h4 class="price">￥83.00</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="@/assets/book1.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname1</h3>
          <h4 class="price">￥79.99</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="@/assets/book2.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname2</h3>
          <h4 class="price">￥83.00</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="@/assets/book1.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname1</h3>
          <h4 class="price">￥79.99</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="@/assets/book2.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname2</h3>
          <h4 class="price">￥83.00</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="@/assets/book1.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname1</h3>
          <h4 class="price">￥79.99</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="@/assets/book2.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname2</h3>
          <h4 class="price">￥83.00</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="@/assets/book1.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname1</h3>
          <h4 class="price">￥79.99</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="@/assets/book2.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname2</h3>
          <h4 class="price">￥83.00</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="@/assets/book1.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname1</h3>
          <h4 class="price">￥79.99</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="@/assets/book2.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname2</h3>
          <h4 class="price">￥83.00</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="@/assets/book1.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname1</h3>
          <h4 class="price">￥79.99</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="@/assets/book2.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname2</h3>
          <h4 class="price">￥83.00</h4>
        </div>
      </div>
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
  grid-template-columns: repeat(auto-fill, 330px);
  grid-template-rows: repeat(4, 340px);
  float: left;
  margin-left: 18%;
  margin-top: 2%;
  width: 85%;
  height: 100%;
}

#recommendation
{
  width: 50vw;
  float: left;
  margin-left: 27vw;
  margin-top: 2%;
}

.item
{
  border-radius: 5px;
  height: 90%;
  width: 75%;
  background: #4c667f;
}

.picture>img
{
  height: 70%;
  float: top;
  border-radius: 5px 5px 0 0;
}

.info
{
  margin-bottom: 0;
  float: bottom;
}

h4.price
{
  text-align: center;
  font-size: 13px;
  float: bottom;
  margin: 0;
  color: white;
}

h3.name
{
  text-align: center;
  font-size: 20px;
  margin: 0;
  float: bottom;
  color: white;
}

</style>
