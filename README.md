# img_loading_progress
用于监听图片加载进度的插件，适用于loading页显示图片加载进度这个场景。轻量min只有3kb
安装：
支持 通过script标签引入，es6 import ，commonjs，amd，cmd

开始使用：
new ILoading(element_name);  //传入包裹图片元素的id,classname，注意元素标识唯一

实例方法：
用户获得加载进度，通过传入回调函数的形式获得当前加载的数量
new ILoading(element_name).loadingProcess((count,sum)=>{  //count: how many images has loaded , sum: the sum of the image need load.    })

有时图片加载的太快，我们看不到弱网状态下的loading页效果，这时就需要用这个函数了，可以设置每隔多久请求一张图片。
new ILoading(dom).loadingProcessMock((count,sum)=>{  //count: how many images has loaded , sum: the sum of the image need load.    },time count by milliosection)
注意生产环境下请换成loadingProcess


静态方法：
用于在某张图片加载完成的情况下执行回调操作
ILoading.loadImg
ex：
ILoading.loadImg("http://wx.ooklady.com/imgs/kindeditor/20170106/20170106141414_392.jpg",function(err,imgObj){
    if(err){
        console.log("图片加载错误");
        return;
    }
    console.log(`成功加载${imgObj.src}`);
});

