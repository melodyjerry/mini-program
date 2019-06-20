Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 获取窗口信息
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    githubName: 'reng99',
    githubInfo: {},
    // top100中国github作者
    topHundredList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: 'loading...',
    })
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    /**
     * 获取top100请求数据
     */
    wx.request({
      url: 'https://api.github.com/search/users?page=1&per_page=100&q=location:China',
      success: (res) => {
        const data = res.data.items;
        this.setData({
          topHundredList: data
        });
        wx.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  /**
   * 下面是自定义的方法
   */
  inputGithubName: function(event) {
    this.setData({
      githubName: event.detail.value
    })
  },
  getGithubMsg: function() {
    const githubName = this.data.githubName;
    if(!githubName) {
      wx.showToast({
        title: '输入的内容不能为空!',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    this.setData({
      githubInfo: null
    })
    wx.showLoading({
      title: 'loading...',
    });
    wx.request({
      url: `https://api.github.com/users/${githubName}`,
      success: (res) => {
        const data = res.data;
        wx.hideLoading();
        if (data.message && data.message.toLowerCase() === 'not found'){
          wx.showToast({
            title: '你输入的github名不存在',
            icon: 'none',
            duration: 2000
          });
          return;
        }
        this.setData({
          githubInfo: data
        })
      },
      fail: (e) => {
        console.log(e)
      }
    })
  },
  bindChange: function(e) {
    this.setData({ currentTab: e.detail.current });
  },
  swichNav: function(e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})