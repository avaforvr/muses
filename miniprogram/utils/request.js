// 同时发送异步代码的次数
let ajaxTime=0;
export const request=(params) => {
    ajaxTime++;
    // 数据加载效果
    // wx.showLoding({
    //    title: "加载中",
    //     mask: true
    // });
    return new Promise((resolve, reject) => {
        wx.request({
            // 解构传递的参数
            ...params,
            success: (result) => {
                resolve(result);
            },
            faile: (err) => {
            	reject(err);
        	},
            complete: () => {
                ajaxTime--;
                if(ajaxTime === 0) {
                   // 关闭正在等待的图标
                	// wx.hideLoading();
                }                
            }
        });
    });
}
