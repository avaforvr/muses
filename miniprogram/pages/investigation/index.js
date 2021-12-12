const WxValidate = require('../../utils/WxValidate').default;
let _formParams = {};

Page({
  data: {
    name: '',
    list: [],
    _gid: '1',
    _submitUser: '',
    submitParams: '',
  },
  onLoad: function (options) {
    if (options.investigationGid) {
      this.setData({
        _gid: options.investigationGid
      });
    }
    this.getIinvestigationDdetail();
  },

  getIinvestigationDdetail: function () {
    const res = {
      code: 0,
      message: 'success',
      data: {
        gid: '1',
        name: '性格测试',
        investigationItemList: [{
          gid: 'fruit',
          name: '喜欢的水果',
          itemType: 'radio',
          itemValue: [
            '草莓',
            '猕猴桃',
            '芒果',
          ],
        }, {
          gid: 'color',
          name: '喜欢的颜色',
          itemType: 'checkbox',
          itemValue: [
            '红色',
            '黄色',
            '蓝色',
          ],
        }],
      },
    };
    if (res.code === 0) {
      this.setData({
        name: res.data.name,
        list: res.data.investigationItemList
      });
    }
  },

  doSubmit: function () {
    const data = this.data;
    const rules = {
      fruit: {
        required: true,
      },
      color: {
        required: true,
      },
    };

    const messages = {
      fruit: {
        required: '请选择喜欢的水果',
      },
      color: {
        required: '请选择喜欢的颜色',
      },
    }
    this.WxValidate = new WxValidate(rules, messages)

    if (!this.WxValidate.checkForm(_formParams)) {
      const error = this.WxValidate.errorList[0]
      wx.showToast({
        icon: 'none',
        title: error.msg,
      })
      return false
    }

    const submitItems = data.list.map(item => {
      const itemValue = _formParams[item.gid];
      return {
        ...item,
        itemValue: item.itemType === 'radio' ? [itemValue] : itemValue
      }
    })

    const submitParams = {
      gid: data._gid,
      submitUser: data._submitUser,
      investigationSubmitItems: submitItems
    };

    console.log(JSON.stringify(submitParams, null, 4))

    this.setData({
      submitParams: JSON.stringify(submitParams, null, 4)
    })

  },

  formSubmit: function (e) {
    console.log('formSubmit')
    _formParams = e.detail.value
  },

  onGotUserInfo: function (e) {
    console.log('onGotUserInfo')
    const _this = this;
    const userInfo = e.detail.userInfo;
    if (userInfo && userInfo.nickName) {
      this.setData({
        _submitUser: userInfo.nickName
      })

      console.log(_formParams)
      _this.doSubmit();
    }
  },
})