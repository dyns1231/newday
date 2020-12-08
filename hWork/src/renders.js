window.onload = function () {

    var address = {

      //获取节点
      query: function (selector, parent) {
        //selector: css选择器
        //parent: 父级元素, 原生DOM节点
        return (parent ? parent : document).querySelectorAll(selector);
      },

      //创建标签
      create: function (tagName) {
        return document.createElement(tagName);
      },

      //绑定事件
      addEvent: function (o) {
        //o.selector: css选择器
        //o.eventType: 事件类型
        //o.fn: 回调函数

        //获取节点
        var elements = this.query(o.selector);

        //绑定事件
        for (var i = 0; i < elements.length; i++) {
          elements[i]['on' + o.eventType] = o.fn;
        }
      },

      //移除节点
      remove: function (parentSelector, childSelector) {
        //parentSelector: 父级元素选择器
        //childSelector: 子元素选择器

        //获取父级元素
        var parent = this.query(parentSelector)[0];
        // console.log('parent ==> ', parent);

        //从parent获取子节点
        var childs = this.query(childSelector, parent);
        // console.log('childs ==> ', childs);

        //移除节点
        for (var i = 0; i < childs.length; i++) {
          parent.removeChild(childs[i]);
        }

      },

      //创建option
      createOptions: function (data, selector) {
        //data: 省数据 或者 市数据 或者 县区数据
        //selector: css选择器

        //获取select
        var select = this.query(selector)[0];

        //遍历data创建option
        for (var key in data) {
          //创建option
          var option = this.create('option');

          //将省代号作为option.value
          //将省名称作为option.textContent
          option.value = key;
          option.textContent = data[key];
          //添加一个类名，方便后续联动删除
          option.className = 'opt';

          //将option添加到select
          select.appendChild(option);
        }

      },

      //初始化
      init: function () {

        //保留this
        var self = this;

        //创建省的option
        this.createOptions(area.province_list, '#province');
        

        //省事件
        this.addEvent({
          selector: '#province',
          eventType: 'change',
          fn: function () {

            //移除市的option
            self.remove('#city', '.opt');

            //移除县/区option
            self.remove('#area', '.opt');
            
            //获取省份的代号
            var code = this.value.slice(0, 2);
            // console.log('code ==> ', code);

            //获取所有市数据
            var cityData = area.city_list;

            //当前市的数据
            var data = {};
            //根据省的代号筛选市数据
            for (var key in cityData) {
              //截取市的代号前两位
              var c = key.slice(0, 2);

              if (c == code) {
                data[key] = cityData[key];
              }
            }

            console.log('data ==> ', data);
            //创建市的option
            self.createOptions(data, '#city');

          }
        })

        //市事件
        this.addEvent({
          selector: '#city',
          eventType: 'change',
          fn: function () {

            //移除县/区option
            self.remove('#area', '.opt');

            //获取市的代号
            var code = this.value.slice(0, 4);
            console.log('code ==> ', code);

            //获取所有县/区的数据
            var areaData = area.county_list;

            //根据市的代号筛选县/区数据
            var data = {};
            for (var key in areaData) {
              var c = key.slice(0, 4);
              if (c == code) {
                data[key] = areaData[key];
              }
            }

            console.log('data ==> ', data);

            //创建县/区的option
            self.createOptions(data, '#area');

          }
        })

      }

    };

    address.init();

  }