
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

async function op() {
   try {
      chatBox.insertAdjacentHTML("beforeend", `<div class="message my_message">
            <p>${test.value}<br></p>
         </div>`)
      const a = await axios.get("https://api.lolimi.cn/API/AI/bj.php", { params: { msg: test.value } });
      const b = await axios.get("https://api.lolimi.cn/API/yyhc/y.php", { params: { msg: a.data.data.output, speaker: "派蒙", noisew: "0.3", sdp: "2", Length: "1", noise: "0.6", type: "1" } })
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
