<template>
  <div class="error404">
    <div class="error404-body-con">
      <div class="el-card is-always-shadow">
        <div class="el-card__body">
          <div class="error404-body-con-title">4<span>0</span>4</div>
          <p class="error404-body-con-message">YOU&nbsp;&nbsp;LOOK&nbsp;&nbsp;LOST</p>
          <div class="error404-btn-con">
            <button type="button" class="el-button el-button--text el-button--large" style="width: 200px;" @click="goHome">
              <span>返回首页</span>
            </button>
            <button v-if="$route && !$route.query.noGoBack" type="button" class="el-button el-button--primary el-button--large" style="width: 200px; margin-left: 40px;" @click="backPage">
              <span>返回上一页</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Error404',
  methods: {
    backPage() {
      this.$router.go(-1)
    },
    goHome() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>
@-webkit-keyframes error404animation {
0% {
    -webkit-transform: rotateZ(0deg);
            transform: rotateZ(0deg);
}
20% {
    -webkit-transform: rotateZ(-60deg);
            transform: rotateZ(-60deg);
}
40% {
    -webkit-transform: rotateZ(-10deg);
            transform: rotateZ(-10deg);
}
60% {
    -webkit-transform: rotateZ(50deg);
            transform: rotateZ(50deg);
}
80% {
    -webkit-transform: rotateZ(-20deg);
            transform: rotateZ(-20deg);
}
100% {
    -webkit-transform: rotateZ(0deg);
            transform: rotateZ(0deg);
}
}
@keyframes error404animation {
0% {
    -webkit-transform: rotateZ(0deg);
            transform: rotateZ(0deg);
}
20% {
    -webkit-transform: rotateZ(-60deg);
            transform: rotateZ(-60deg);
}
40% {
    -webkit-transform: rotateZ(-10deg);
            transform: rotateZ(-10deg);
}
60% {
    -webkit-transform: rotateZ(50deg);
            transform: rotateZ(50deg);
}
80% {
    -webkit-transform: rotateZ(-20deg);
            transform: rotateZ(-20deg);
}
100% {
    -webkit-transform: rotateZ(0deg);
            transform: rotateZ(0deg);
}
}
.error404-body-con {
  width: 700px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
}
.error404-body-con-title {
    text-align: center;
    font-size: 240px;
    font-weight: 700;
    color: #2d8cf0;
    height: 260px;
    line-height: 260px;
    margin-top: 40px;
}
.error404-body-con-title span {
      display: inline-block;
      color: #19be6b;
      font-size: 230px;
      -webkit-animation: error404animation 3s ease 0s infinite alternate;
              animation: error404animation 3s ease 0s infinite alternate;
}
.error404-body-con-message {
    display: block;
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    letter-spacing: 12px;
    color: #dddde2;
}
.error404-btn-con {
  text-align: center;
  padding: 20px 0;
  margin-bottom: 40px;
}
</style>
