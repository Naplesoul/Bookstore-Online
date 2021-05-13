<template>
  <div id="browsePageContainer">

    <div id="main">
      <div class="item">
        <div class="picture">
          <img alt="pic" src="../assets/book1.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname1</h3>
          <h4 class="price">￥79.99</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="../assets/book2.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname2</h3>
          <h4 class="price">￥83.00</h4>
        </div>
      </div>

      <div class="item">
        <div class="picture">
          <img alt="pic" src="../assets/book1.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname1</h3>
          <h4 class="price">￥79.99</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="../assets/book2.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname2</h3>
          <h4 class="price">￥83.00</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="../assets/book1.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname1</h3>
          <h4 class="price">￥79.99</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="../assets/book2.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname2</h3>
          <h4 class="price">￥83.00</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="../assets/book1.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname1</h3>
          <h4 class="price">￥79.99</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="../assets/book2.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname2</h3>
          <h4 class="price">￥83.00</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="../assets/book1.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname1</h3>
          <h4 class="price">￥79.99</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="../assets/book2.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname2</h3>
          <h4 class="price">￥83.00</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="../assets/book1.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname1</h3>
          <h4 class="price">￥79.99</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="../assets/book2.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname2</h3>
          <h4 class="price">￥83.00</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="../assets/book1.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname1</h3>
          <h4 class="price">￥79.99</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="../assets/book2.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname2</h3>
          <h4 class="price">￥83.00</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="../assets/book1.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname1</h3>
          <h4 class="price">￥79.99</h4>
        </div>
      </div>
      <div class="item">
        <div class="picture">
          <img alt="pic" src="../assets/book2.jpg" width="100%">
        </div>
        <div class="info">
          <h3 class="name">bookname2</h3>
          <h4 class="price">￥83.00</h4>
        </div>
      </div>

    </div>
    <div id="footer">
      <ul class="pageNumber">

      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "BrowsePage"
}
</script>

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

#main>div.item
{
  border-radius: 5px;
  height: 90%;
  width: 75%;
  background: #4c667f;
}

#main>div.item>div.picture>img
{
  height: 70%;
  float: top;
  border-radius: 5px 5px 0 0;
}

#main>div.item>div.info
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