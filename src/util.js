export default {
  install(Vue, options) {
    //格式化时间 yyyy-mm-dd
    Vue.prototype.formatterTime = function (time, rule = "yyyy-mm-dd") {
      var t = new Date(time);
      var y = t.getFullYear();
      var m = t.getMonth() + 1 >= 10 ? t.getMonth() + 1 : "0" + (t.getMonth() + 1);
      var d = t.getDate() >= 10 ? t.getDate() : "0" + t.getDate();
      if (rule === "yyyy-mm-dd") {
        return y + '-' + m + '-' + d;
      } else if (rule === "yyyy-mm-dd hh:mm:ss") {
        var h = t.getHours() >= 10 ? t.getHours() : "0" + t.getHours();
        var min = t.getMinutes() >= 10 ? t.getMinutes() : "0" + t.getMinutes();
        var s = t.getSeconds() >= 10 ? t.getSeconds() : "0" + t.getSeconds();
        return y + '-' + m + '-' + d + " " + h + ":" + min + ":" + s;
      } else if (rule === "年月日") {
        return y + '年' + m + '月' + d + '日';
      }
    }
    //将时间对象处理成时间戳
    Vue.prototype.handleDate = function (r) {
      var time = new Date(r);
      return time.getTime();
    }

    //判断是JSON对象还是JSON字符串，如果是字符串就转义
    Vue.prototype.checkJSONType = function (json) {
      let data = json;
      if (typeof data === 'string') {
        data = eval('(' + data + ')');
      }
      return data;
    }

    //获取星期
    Vue.prototype.getWeek = function () {
      var t = new Date();
      var w = t.getDay();
      switch (w) {
        case 1:
          return '一';
          break;
        case 2:
          return '二';
          break;
        case 3:
          return '三';
          break;
        case 4:
          return '四';
          break;
        case 5:
          return '五';
          break;
        case 6:
          return '六';
          break;
        case 0:
          return '日';
          break;
      }
    }

    //获取随机数
    Vue.prototype.getRandomNumber = function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

  }
}
