<template>
  <div class="home-container">
    <div class="home-side">
      <div class="home-middle">
        <div class="m-top">
          <div class="bbsinfo-wrap">
            <BbsInfo></BbsInfo>
          </div>
        </div>
        <div class="m-bottom">
          <div class="tradeinfo-wrap">
            <MarketPrice></MarketPrice>
          </div>
        </div>
      </div>
      <div class="home-right">
        <div class="calendar-wrap">
          <CalenDar></CalenDar>
        </div>
        <div class="marketinfo-wrap">
          <MarketInfo></MarketInfo>
        </div>
        <div class="discinfo-wrap">
          <Discinfo></Discinfo>
        </div>
      </div>
    </div>
    <!-- <div class="home-top flextwo">
            <div class="bbsinfo-wrap">
                <BbsInfo></BbsInfo>
            </div>
            <div class="calendar-wrap">
                <CalenDar></CalenDar>
            </div>
        </div>
        <div class="home-bottom flextwo">
            <div class="bl-wrap flextwo">
                <div class="tradeinfo-wrap">
                    <MarketPrice></MarketPrice>
                </div>
                <div class="discinfo-wrap">
                    <Discinfo></Discinfo>
                </div>
            </div>

            <div class="marketinfo-wrap">
                <MarketInfo></MarketInfo>
            </div>
    </div>-->
  </div>
</template>

<script>
import BbsInfo from "./components/BbsInfo";
import CalenDar from "./components/calendar";
import MarketInfo from "./components/marketinfo";
import Discinfo from "./components/discinfo";
import MarketPrice from "./components/marketPrice";
// import LoginStyle from './components/LoginStyle'
export default {
  components: {
    BbsInfo,
    CalenDar,
    MarketInfo,
    Discinfo,
    MarketPrice,
    // LoginStyle
  },
  props: {},
  data() {
    return {
      eventModel: {
        eventCode: "B2C00011",
        eventSysCode: "uc",
        eventFunc: "",
        eventArgs: {
          environment: "模拟",
          versionArray: [],
        },
      },
      version: {
        system: "uc",
        version: "MOCK-10007",
      },
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  created() {},
  mounted() {
    if (!window.localStorage.getItem("name")) {
      this.eventModel.eventArgs.versionArray.push(this.version);
    }
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.home-side {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.home-right {
  width: 430px;
  margin-left: 7px;
  // .login{
  //     min-height: 200px;
  // }
  .calendar-wrap {
    height: 194px;
  }
  .marketinfo-wrap {
    margin-top: 8px;
    background: #223a6a;
    height: 287px;
  }
  .discinfo-wrap {
    // width: 360px;
    background: #223a6a;
    margin-top: 8px;
  }
}
.home-middle {
  width: calc(100% - 430px);
  padding: 0 0 0 7px;
  .bbsinfo-wrap {
    // height: 490px;
  }
  .m-bottom {
    margin-top: 8px;
    // display: flex;
    // flex-direction: row;
    // justify-content: space-between;
    // .discinfo-wrap {
    //     width: 360px;
    //     background: #223A6A;
    //     height: 360px;
    // }
    .tradeinfo-wrap {
      // width: calc(100% - 365px);
      // background: #223A6A;
      // height: 340px;
    }
  }
}
//@import url(); 引入公共css类
.flextwo {
  display: flex;
  justify-content: space-between;
}
.home-container {
  width: 100%;
  height: auto;
  background: #f1f1f1;
  padding: 17px 0 0 0;
}
.home-top {
  width: 100%;
  padding-left: 5px;

  & > div {
    height: 310px;
    background: #223a6a;
  }
  .bbsinfo-wrap {
    width: calc(100% - 330px);
  }
  .calendar-wrap {
    width: 320px;
  }
}
.home-bottom {
  width: 100%;
  padding-left: 5px;
  margin-top: 8px;
  & > div {
    height: 310px;
  }
  .bl-wrap {
    width: calc(100% - 330px);
    .tradeinfo-wrap {
      width: calc(100% - 365px);
      background: #223a6a;
    }
    .discinfo-wrap {
      width: 360px;
      background: #223a6a;
    }
  }
  .marketinfo-wrap {
    width: 320px;
    background: #223a6a;
  }
}
</style>
// <style lang="scss">
// // 设置tabs页 样式
// // 头部
// .el-tabs__header {
//     height: 45px;
//     line-height: 45px;
//     border-bottom: 1px solid #162542;
//     margin: 0 0 0 !important;
// }
// .el-tabs__item {
//     height: 45px !important;
//     text-align: center!important;
//     color: #fff!important;
//     font-size: 22px!important;
//     border-right: 1px solid #131c39!important;

// }
// .el-tabs__nav-scroll {
//         background: #2c3f60 url(/@/assets/tabboxbg.png) repeat-x 0 0;

// }
// .el-tabs__active-bar {
//     background-color: transparent !important;
// }
// .el-tabs__nav-wrap::after {
//     background-color: transparent !important;
// }
// .el-tabs__item.is-active {
//     background: #273758 !important;
//     color: #bc9a5a !important;
//     border-bottom: 3px solid #bc9a5a !important;

// }

//
</style>
