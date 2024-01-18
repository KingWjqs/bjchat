
axios.interceptors.request.use(function (config) {
   chatBox.insertAdjacentHTML("beforeend", `<div class="message frnd_message">
      <p>...<br></p>
  </div>`)
   return config;
}, function (error) {
   return Promise.reject(error);
});


axios.interceptors.response.use(function (response) {
   chatBox.lastChild.remove()
   return response;
}, function (error) {
   return Promise.reject(error);
});

const btn = document.querySelector('button');
const chatBox = document.querySelector('.chatBox');
const audio = document.querySelector('audio');
const header = document.querySelector('.header');
let Enmae;
async function op() {
   try {
      chatBox.insertAdjacentHTML("beforeend", `<div class="message my_message">
            <p>${test.value}<br></p>
         </div>`)
      let tv = test.value
      test.value = "";
      const a = await axios.get("https://api.lolimi.cn/API/AI/bj.php", { params: { msg: tv } });
      const b = await axios.get("https://api.lolimi.cn/API/yyhc/y.php", { params: { msg: a.data.data.output, speaker: Enmae, noisew: "0.3", sdp: "2", Length: "1", noise: "0.6", type: "1" } })
      audio.src = b.data.music
      audio.play()
      chatBox.insertAdjacentHTML("beforeend", `<div class="message frnd_message">
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
   if (e.key === "Enter" && test.value.trim() !== ""){
      op()
   }
})




// 排他切换角色语音
header.addEventListener('click',function(e){
   if (e.target.classList.contains('imgText')) {
      header.querySelector(".show") && header.querySelector(".show").classList.remove("show");
      e.target.classList.add("show");
      Enmae = e.target.firstElementChild.firstElementChild.dataset.name
      chatBox.innerHTML = ""
   }else if (e.target.classList.contains('cover')) {
      header.querySelector(".show") && header.querySelector(".show").classList.remove("show");
      e.target.parentElement.parentElement.classList.add("show");
      Enmae = e.target.dataset.name
      chatBox.innerHTML = ""
   }
})