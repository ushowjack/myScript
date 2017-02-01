<body> 
<script > 
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-// 
/* 
  ImageLoader, Version 1.0, JavaScript  
  (c) 2006 Christian An <anchangsi@gmail.com> 

  With copyright not modified, you can use this program freely.  
*/ 
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-// 



function ImageLoader(className,Options){ 
    this._ImageLoadStack = null; 
    this._currrentLoading = ""; 
    this._FinalRun = false; 
    this.numLoaded = 0; 
    this.ClassName = className; 
     
    if(typeof(Options)=="undefined") Options = {}; 
     
    if(isNaN(Options.Timeout) || Options.Timeout < 0 ||  Options.Timeout >100000){ 
        this.EnableTimeout = false; 
    }else { 
        this.EnableTimeout = true; 
        this.Timeout = Options.Timeout; 
    } 
     
    if(typeof(Options.func)=="undefined"){ 
        this.AfterFunction = null; 
    }else{ 
        this.AfterFunction = Options.func; 
    } 
     
    if(typeof(Options.display)=="undefined"){ 
        this.disDiv = null; 
    }else if(typeof(Options.display)=="string"){ 
        this.disDiv = document.getElementById(Options.display); 
    }else if(typeof(Options.display)=="object"){ 
        this.disDiv = Options.display; 
    }else{ 
        this.disDiv = null; 
    } 

    if(typeof(Options.process)=="undefined"){ 
        this.procDiv = null; 
    }else if(typeof(Options.process)=="string"){ 
        this.procDiv = document.getElementById(Options.process); 
    }else if(typeof(Options.process)=="object"){ 
        this.procDiv = Options.process; 
    }else{ 
        this.procDiv = null; 
    } 

     
    if(typeof(document.imageArray)=="undefined") document.imageArray = new Array(); 
     
    this.Load = function(){ 
        var args = this.Load.arguments; 
        if(args.length!=0){ 
            this._ImageLoadStack = new Array(); 
            for(i=0; i<args.length; i++){ 
                if(args[i].indexOf("#")!=0){ 
                    this._ImageLoadStack.push(args[i]); 
                } 
            } 

        }else if(this._ImageLoadStack == null){ 
            this._runFinal(); 
        } 
        this.numTotal = this._ImageLoadStack.length; 
        this._LoadAImage(); 
    } 
     
    this._LoadAImage = function(){ 
        if(this._ImageLoadStack.length!=0){ 
            var sURL = this._ImageLoadStack.shift(); 
            if(this.disDiv!=null) this.disDiv.innerHTML = sURL; 
            _currrentLoading = sURL; 
         
             
            var j = document.imageArray.length; 
            document.imageArray[j] = document.createElement("IMG"); 
            document.imageArray[j].Owner = this; 
             
            document.imageArray[j].onload = function(){ 
                this.Owner._LoadAImage(); 
                this.onload = null; 
            } 
            document.imageArray[j].onerror = function(){ 
                this.Owner._LoadAImage(); 
                this.onload = null; 
            } 
             
            if(this.EnableTimeout){ 
                window.setTimeout("if(_currrentLoading==\""+sURL+"\"){"+this.ClassName+"._LoadAImage()}",this.Timeout); 
            } 
     
            document.imageArray[j++].src = sURL; 
                if(this.procDiv!=null){ 
                this.numLoaded++; 
                var percentage = Math.floor(this.numLoaded * 100 / this.numTotal); 
                this.procDiv.innerHTML = percentage; 
            } 

        }else{ 
            this._runFinal(); 
        } 

    } 
    this._runFinal = function(){ 
            if(this._FinalRun == false){ 
                this._FinalRun = true; 
                 
                if(typeof(this.AfterFunction)=="function"){ 
                    this.AfterFunction(); 
                }else if(typeof(this.AfterFunction)=="string"){ 
                    if (window.execScript){ 
                        window.execScript(this.AfterFunction); 
                    }else{ 
                        window.eval(this.AfterFunction);  
                    } 
                } 
            } 
    } 
    this.setLoadImages = function(imageArray){ 
        if(typeof(imageArray)!="object") return; 
        this._ImageLoadStack = imageArray; 
    } 

}
</script> 
<div id="display"></div> 
<div id="process"></div> 
<div id="result"></div> 
</body> 







<script> 
function final(){ 
    $("result").innerHTML="OK"; 
}; 

function $(par){ 
    return document.getElementById(par) 
} 

 var loader = new ImageLoader("loader",{Timeout:-1,func: final,display:"display",process:$("process")}); 
  
  
 loader.Load("http://bbs.blueidea.com/images/blue/logo.gif", 
             "http://gg.blueidea.com/2006/chinaok/208x32.gif", 
            "http://gg.blueidea.com/2006/now/208x32.gif", 
            "http://gg.blueidea.com/2006/gongyi/banner.jpg", 
            "http://gg.blueidea.com/2006/flash8/pepsi.gif", 
            "http://www.google.com/intl/zh-CN_ALL/images/logo.gif"); 
</script>