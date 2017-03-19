class ILoading{
    //传入包裹图片的父元素
    constructor(wrapper){
        this.wrapper = null;

        if(typeof wrapper === "string"){
            this.wrapper = document.querySelector(wrapper);
        }else if(typeof wrapper === "object" && wrapper.innerHTML){
            this.wrapper = wrapper;
        }

        if(this.wrapper){
            this.allImgs = this.wrapper.getElementsByTagName("img") || null;
        }
    }
    
    /*用户获得加载进度，通过传入回调函数的形式获得当前加载的数量
        new ILoading(dom).loadingProcess((count,sum)=>{  //count: how many images has loaded , sum: the sum of the image need load.    })
    */
    loadingProcess(cb){
        let sum = this.allImgs.length;
        let self = this;
        let count = 0;
        if(!this.allImgs || sum === 0){
            console.error("ImgLoading don not get imgs!");
        }
        
        for(let i = 0;i<sum;i++){
            let imgObj = new Image();
            imgObj.onload = function(){
                count++;
                cb && cb(count,sum);
            }

            imgObj.onerror = function(){
                console.error("img load error");
            }
            imgObj.src = this.allImgs[i].src;
        }
    }
    /*有时图片加载的太快，我们看不到弱网状态下的loading页效果，这时就需要用这个函数了，可以设置每隔多久请求一张图片。
        new ILoading(dom).loadingProcessMock((count,sum)=>{  //count: how many images has loaded , sum: the sum of the image need load.    },time count by milliosection)
    */
    loadingProcessMock(cb,mil){
        let sum = this.allImgs.length;
        let self = this;
        let count = 0;
        let index = 0;
        let interval = mil || 200;
        if(!this.allImgs || sum === 0){
            console.error("ImgLoading don not get imgs!");
        }

        let startTime = +new Date();

        loop();
        function loading(i){
            let imgObj = new Image();
            imgObj.onload = function(){
                count++;
                cb && cb(count,sum);
            }

            imgObj.onerror = function(){
                console.error("img load error");
            }
            imgObj.src = self.allImgs[i].src;

        }
        function loop(){
            if(sum === index) return;
            let now  = +new Date();
            if(now - startTime > interval){
                startTime = now;
                loading(index);
                index++;
            }
            requestAnimationFrame(loop);
        }
    }



}
        
/*静态函数，用于异步加载单张图片
    param src  String  img src
    param cb   Function callback 
*/
ILoading.loadImg = function(src,cb){
    if(!src || "string" !== typeof src){
        return console.error("loadImg first param necessary and neet be string");
    }
    
    let imgObj = new Image();
    imgObj.onload = function(){
        cb && cb(null,imgObj);
    }
    imgObj.onerror = function(err){
        cb && cb(err);
        console.error(`img src '${src}' load error`);
    }
    imgObj.src = src;
    
}
module.exports = ILoading;