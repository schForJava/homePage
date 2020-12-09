<template>
  <div class="confirmBgc animations" :style="{backgroundColor:rytColor}" v-show="isShowModal">
    <div class="rytContainer" :style="{borderRadius:rytBorderradius}">
      <h2 class="rytTitle" v-if="title">{{title}}<i class="el-icon-error" @click="clickCancel"></i></h2>
      <div class="rytContent parent">
        <slot name="content">{{this.content || this.content  }}</slot>
      </div>
      <div class="rytButtons" v-show="isShowBtn">
        <div class="button confirmStyle" @click="clickConfirm"><span>{{confirmText}}</span></div>
        <div class="rytline"></div>
        <div class="button cancel" @click="clickCancel"><span>{{cancelText}}</span></div>
      </div>
	  <div class="rytButtons" v-show="isShowBtn2">
	    <div class="button cancel" style="width: auto;" @click="clickCancel"><span>{{cancelText}}</span></div>
	  </div>
    </div>
  </div>
</template>
<script>
// 公共弹框组件-hjw
export default {
    name: 'messageBox',
    data () {
        return {
            // 背景色
            rytColor: 'rgba(0,0,0,0.6)',
            // 弹框圆角
            rytBorderradius: '1px',
            // 弹框标题
            title: '',
            // 取消按钮文本
            cancelText: '',
            // 确定按钮文本
            confirmText: '',
            // 弹框内容
            content: '',
            // 显示隐藏Box
            isShowModal: false,
            // 显示隐藏Btn
            isShowBtn: false,
			      isShowBtn2: false,
            
        }
    },
    methods: {
        // 取消按钮函数
        clickCancel () {
            this.handleCloseBox()
        },
        // 确定按钮函数
        clickConfirm    () {
            this.$emit('handleClickConfirm')
        },
        // 打开弹框
        handleOpenBox (obj) {
            this.isShowBtn = obj.isBtn? obj.isBtn :false
            this.isShowBtn2 = obj.isBtn2? obj.isBtn2:false
            this.confirmText = obj.confirmText? obj.confirmText:'确定'
            this.cancelText = obj.cancelText? bj.cancelText:'取消'
            this.title = obj.title ? obj.title:'标题'
            this.content = obj.content? obj.content:''
            this.isShowModal = true
        },
        // 关闭弹框
        handleCloseBox () {
            this.isShowModal = false
        }
    },
    watch: {
        // 监听显示隐藏
    }
};
</script>
<style scoped lang="scss">
// 弹框显示动画

@-webkit-keyframes fadeInOut {
    0% {
        opacity:0.7;
     }
    25% {
        opacity:0.8;
    }
    50% {
        opacity: 0.9;    
    }
    75% {
        opacity:1;
    }
}
.parent {
  position: relative;
}
// .parent::after {
//   margin: auto auto;
//   width: 295px;
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   content: "";
//   box-sizing: border-box;
//   height: 1px;
//   border-bottom: 1px solid #e8e8e8;
//   transform: scaleY(0.5);
//   transform-origin: 0 0;
// }
.animations {
  animation:fadeInOut 5s infinite;
  -webkit-animation:fadeInOut 1s 1; /* Safari 和 Chrome */
}
.confirmBgc {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 1000;
}
.rytContainer {
  min-width: 250px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  border: solid 1px #ebebeb;
  transform: translate(-50%, -50%);
}
.rytTitle {
   margin: 0;
  font-size: 18px;
  color: #333;
  font-weight: 700;
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  border-bottom: #f9f9f9 2px solid;
  display: flex;
  justify-content: space-between ;
  align-items: center;
  i {
      color: #757b8f;
  }
}
.rytContent {
  font-size: 16px;
  color: #333;
  box-sizing: border-box;
  padding: 16px 20px;
}
.rytButtons {
  color: #333;
  display: flex;
  border-top: 1px solid #f7f7f7;
  flex-direction: row;
  justify-content: center;
  background-color: #fafafa;
}
.button {
  width: 50%;
  height: 60px;
  line-height: 60px;
  span{
      cursor: pointer;
      padding: 10px 35px;
      width: 40px;
      text-align: center;
      line-height: 15px;
      color: #ffffff;
  }
  span:hover {
    padding: 11px 35px;
    }
}
.confirmStyle {
    text-align: right;
    span{
      margin-right: 10px;
      background-color: #1f89f7;
    }
}
.cancel {
    text-align: left;
    span {
      margin-left: 10px;
      background-color: #a8b4c5;
    }
}
.rytline {
  width: 1px;
  height: 42px;
  background-color: #fafafa;
  transform: scaleX(0.5);
  transform-origin: 0 0;
}
</style>