let mast = document.querySelector(".mast");
let il = new ILoading(".frame-wrapper");
// il.loadingProcess(function(count,sum){
//     mast.innerHTML = `${Math.floor(count/sum * 100)}%`;
//     if(count === sum){
//         console.log("完成");
//         mast.style.display= "none";
//     }
// });

il.loadingProcessMock(function(count,sum){
    mast.innerHTML = `${Math.floor(count/sum * 100)}%`;
    if(count === sum){
        console.log("完成");
        mast.style.display= "none";
    }
},1000);

ILoading.loadImg("http://wx.ooklady.com/imgs/kindeditor/20170106/20170106141414_392.jpg",function(err,imgObj){
    if(err){
        console.log("图片加载错误");
        return;
    }
    console.log(`成功加载${imgObj.src}`);
});

