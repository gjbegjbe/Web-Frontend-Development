(function (window, document) {
    var size = 4;

    function GVerify(options) { //创建一个图形验证码对象
        this.options = {}
        this.options.id = options;
        this.options.numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
        this.options.letterArr = getAllLetter();

        this.init();
        this.refresh();
    }

    GVerify.prototype = {

        //初始化
        init: function () {
            var con = document.getElementById(this.options.id);
            var canvas = document.createElement("canvas");
            this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "100";
            this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "30";
            canvas.id = this.options.canvasId;
            canvas.width = this.options.width;
            canvas.height = this.options.height;
            canvas.style.cursor = 'pointer';
            canvas.innerHTML = "您的浏览器版本不支持canvas";
            con.appendChild(canvas);
            const self = this;
            canvas.onclick = function () {
                self.refresh();
            }
        },

        //生成验证码
        refresh: function () {

            var canvas = document.getElementById(this.options.canvasId);
            var ctx = canvas.getContext('2d');

            ctx.textBaseline = "middle";

            ctx.fillStyle = randomColor(180, 240);
            ctx.fillRect(0, 0, this.options.width, this.options.height);

            var txtArr = this.options.numArr.concat(this.options.letterArr);

            //绘制验证码
            this.options.code = '';
            for (var i = 1; i <= size; i++) {
                var txt = txtArr[randomInt(0, txtArr.length)];
                this.options.code += txt;
                ctx.font = randomInt(this.options.height / 2, this.options.height) + 'px SimHei'; //随机生成字体大小
                ctx.fillStyle = randomColor(50, 160);
                ctx.shadowOffsetX = randomInt(-3, 3);
                ctx.shadowOffsetY = randomInt(-3, 3);
                ctx.shadowBlur = randomInt(-3, 3);
                ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
                var x = this.options.width / (size + 1) * i;
                var y = this.options.height / 2;
                var deg = randomInt(-30, 30);
                /**改变坐标系**/
                ctx.translate(x, y);
                ctx.rotate(deg * Math.PI / 180);
                /**填上数字**/
                ctx.fillText(txt, 0, 0);
                /**恢复坐标系**/
                ctx.rotate(-deg * Math.PI / 180);
                ctx.translate(-x, -y);
            }
            /**绘制干扰线**/
            for (var i = 0; i < 4; i++) {
                ctx.strokeStyle = randomColor(40, 180);
                ctx.beginPath();
                ctx.moveTo(randomInt(0, this.options.width), randomInt(0, this.options.height));
                ctx.lineTo(randomInt(0, this.options.width), randomInt(0, this.options.height));
                ctx.stroke();
            }
            /**绘制干扰点**/
            for (var i = 0; i < this.options.width / 4; i++) {
                ctx.fillStyle = randomColor(0, 255);
                ctx.beginPath();
                ctx.arc(randomInt(0, this.options.width), randomInt(0, this.options.height), 1, 0, 2 * Math.PI);
                ctx.fill();
            }
        },

        /**验证验证码**/
        validate: function (code) {
            var code = code.toLowerCase();
            var v_code = this.options.code.toLowerCase();
            if (code == v_code) {
                return true;
            } else {
                this.refresh();
                return false;
            }
        }
    }

    //生成字母数组
    function getAllLetter() {
        var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
        return letterStr.split(",");
    }

    //随机数
    function randomInt(from = 0, to = 1) {
        return Math.floor(Math.random() * (to - from) + from);
    }

    //随机色
    function randomColor(min = 0, max = 255) {
        var r = randomInt(min, max);
        var g = randomInt(min, max);
        var b = randomInt(min, max);
        return "rgb(" + r + "," + g + "," + b + ")";
    }

    window.GVerify = GVerify;
})(window, document);