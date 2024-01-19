const btn = document.querySelector('button');
const chatBox = document.querySelector('.chatBox');
const audio = document.querySelector('audio');
const header = document.querySelector('.header');
const opmusic = axios.create()
// 页面初始值
let Enmae = "派蒙";
// 接收发送的消息
let tv;
let timer
function renderInfo(fx,pinfo,pheader) {
   tv = pinfo
   test.value = ""
   if (fx === "right") {
      chatBox.insertAdjacentHTML("beforeend", `<div class="message my_message">
            <p>${pinfo}<br></p>
            <div class="rightheadimg">
               <img src="./img/op.png" class="cover">
            </div>
      </div>`)
   }else if (fx === "left") {
      chatBox.insertAdjacentHTML("beforeend", `<div class="message frnd_message">
         <div class="leftheadimg">
            <img src="${pheader}" class="cover">
         </div>
         <p>${pinfo}<br></p>
      </div>`)
   }
}
function debounce(fn, t) {
   return (function () {
     // 2.3.4
     if (timer) clearTimeout(timer)
     timer = setTimeout(function () {
       fn()
     }, t)
   })()
 }
opmusic.interceptors.request.use(function (config) {
   const Qjshow = document.querySelector('.show');
   renderInfo("left", "正在输入", Qjshow.firstElementChild.firstElementChild.src)
   chatBox.scrollTop = chatBox.scrollHeight;
   return config;
}, function (error) {
   return Promise.reject(error);
});


opmusic.interceptors.response.use(function (response) {
   chatBox.lastChild.remove()
   return response;
}, function (error) {
   return Promise.reject(error);
});


// 封装函数,获取消息和语音
async function op() {
   console.log(123);
   const Qjshow = document.querySelector('.show');
   try {
      const a = await axios.get("https://api.lolimi.cn/API/AI/bj.php", { params: { msg: tv } });
      const newInfo = a.data.data.output.replace(/（.*?）/g,"")
      console.log(newInfo);
      const b = await opmusic.get("https://api.lolimi.cn/API/yyhc/y.php", { params: { msg: newInfo, speaker: Enmae, noisew: "0.3", sdp: "1", Length: "1", noise: "0.6", type: "1" } })
      audio.src = b.data.music
      audio.play()
      renderInfo("left",newInfo,Qjshow.firstElementChild.firstElementChild.src)
      chatBox.scrollTop = chatBox.scrollHeight;
   } catch (error) {
      renderInfo("left","网络错误,请检查网络",Qjshow.firstElementChild.firstElementChild.src)
      console.log(error);
   }
}
btn.addEventListener('click',function (e) {
   renderInfo("right",test.value)
   debounce(op, 3000)
})

test.addEventListener('keydown', function (e) {
   if (e.key === "Enter" && test.value.trim() !== "") {
      renderInfo("right",test.value);
      debounce(op, 3000);
   }
})




// 排他切换角色语音
header.addEventListener('click', function (e) {
   const show = document.querySelector('.show');
   if (e.target.classList.contains('imgText')) {
      show && show.classList.remove("show");
      e.target.classList.add("show");
      Enmae = e.target.firstElementChild.firstElementChild.dataset.name
      chatBox.innerHTML = ""
   } else if (e.target.classList.contains('cover')) {
      show && show.classList.remove("show");
      e.target.parentElement.parentElement.classList.add("show");
      Enmae = e.target.dataset.name
      chatBox.innerHTML = ""
   }
})