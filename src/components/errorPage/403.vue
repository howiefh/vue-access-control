<template>
  <div class="error403">
    <div class="error403-body-con">
      <div class="el-card is-always-shadow">
        <div class="el-card__body">
          <div class="error403-body-con-title">
            4<span class="error403-0-span"><span>0</span></span><span class="error403-key-span"><span>3</span></span></div>
          <p class="error403-body-con-message">You don't have permission</p>
          <div class="error403-btn-con">
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
  name: 'Error403',
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
@-webkit-keyframes error403animation {
0% {
    -webkit-transform: rotateZ(0deg);
            transform: rotateZ(0deg);
}
40% {
    -webkit-transform: rotateZ(-20deg);
            transform: rotateZ(-20deg);
}
45% {
    -webkit-transform: rotateZ(-15deg);
            transform: rotateZ(-15deg);
}
50% {
    -webkit-transform: rotateZ(-20deg);
            transform: rotateZ(-20deg);
}
55% {
    -webkit-transform: rotateZ(-15deg);
            transform: rotateZ(-15deg);
}
60% {
    -webkit-transform: rotateZ(-20deg);
            transform: rotateZ(-20deg);
}
100% {
    -webkit-transform: rotateZ(0deg);
            transform: rotateZ(0deg);
}
}
@keyframes error403animation {
0% {
    -webkit-transform: rotateZ(0deg);
            transform: rotateZ(0deg);
}
40% {
    -webkit-transform: rotateZ(-20deg);
            transform: rotateZ(-20deg);
}
45% {
    -webkit-transform: rotateZ(-15deg);
            transform: rotateZ(-15deg);
}
50% {
    -webkit-transform: rotateZ(-20deg);
            transform: rotateZ(-20deg);
}
55% {
    -webkit-transform: rotateZ(-15deg);
            transform: rotateZ(-15deg);
}
60% {
    -webkit-transform: rotateZ(-20deg);
            transform: rotateZ(-20deg);
}
100% {
    -webkit-transform: rotateZ(0deg);
            transform: rotateZ(0deg);
}
}
.error403-body-con {
  width: 700px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
}
.error403-body-con-title {
    text-align: center;
    font-size: 240px;
    font-weight: 700;
    color: #2d8cf0;
    height: 260px;
    line-height: 260px;
    margin-top: 40px;
}
.error403-body-con-title .error403-0-span {
      display: inline-block;
      position: relative;
      width: 170px;
      height: 170px;
      border-radius: 50%;
      border: 20px solid #ed3f14;
      color: #ed3f14;
      margin-right: 10px;
}
.error403-body-con-title .error403-0-span span {
        display: inline-block;
        font-size: 120px;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
}
.error403-body-con-title .error403-key-span {
      display: inline-block;
      position: relative;
      width: 100px;
      height: 190px;
      border-radius: 50%;
      margin-right: 10px;
}
.error403-body-con-title .error403-key-span span {
        display: inline-block;
        font-size: 260px;
        position: absolute;
        left: -50px;
        -webkit-transform: translate(-50%, -60%);
                transform: translate(-50%, -60%);
        -webkit-transform-origin: center bottom;
                transform-origin: center bottom;
        -webkit-animation: error403animation 2.8s ease 0s infinite;
                animation: error403animation 2.8s ease 0s infinite;
}
.error403-body-con-message {
    display: block;
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    letter-spacing: 4px;
    color: #dddde2;
}
.error403-btn-con {
  text-align: center;
  padding: 20px 0;
  margin-bottom: 40px;
}
</style>
