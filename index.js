const opmusic = axios.create()
opmusic.interceptors.request.use(function (config) {
   const Qjshow = document.querySelector('.show');
   chatBox.insertAdjacentHTML("beforeend", `<div class="message frnd_message">
      <div class="leftheadimg">
         <img src="${Qjshow.firstElementChild.firstElementChild.src}" class="cover">
      </div>
      <p>...<br></p>
  </div>`)
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

const btn = document.querySelector('button');
const chatBox = document.querySelector('.chatBox');
const audio = document.querySelector('audio');
const header = document.querySelector('.header');

let Enmae = "派蒙";

// 封装函数,获取消息和语音
async function op() {
   const Qjshow = document.querySelector('.show');
   try {
      chatBox.insertAdjacentHTML("beforeend", `<div class="message my_message">
            <p>${test.value}<br></p>
            <div class="rightheadimg">
               <img src="./img/op.png" class="cover">
            </div>
         </div>`)
      let tv = test.value
      test.value = "";
      const a = await axios.get("https://api.lolimi.cn/API/AI/bj.php", { params: { msg: tv } });
      const b = await opmusic.get("https://api.lolimi.cn/API/yyhc/y.php", { params: { msg: a.data.data.output, speaker: Enmae, noisew: "0.3", sdp: "2", Length: "1", noise: "0.6", type: "1" } })
      audio.src = b.data.music
      audio.play()
      chatBox.insertAdjacentHTML("beforeend", `<div class="message frnd_message">
         <div class="leftheadimg">
            <img src="${Qjshow.firstElementChild.firstElementChild.src}" class="cover">
         </div>
         <p>${a.data.data.output}<br></p>
      </div>`)
      test.value = ""
      chatBox.scrollTop = chatBox.scrollHeight;
   } catch (error) {
      console.log(error);
   }
}
btn.addEventListener('click', async function (e) {
   op()
})

test.addEventListener('keydown', function (e) {
   if (e.key === "Enter" && test.value.trim() !== "") {
      op()
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