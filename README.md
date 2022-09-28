<p align="center">
  <img src="https://media.discordapp.net/attachments/761930839893606400/1024582404905635891/342610ca36b96f08.png?width=562&height=562" width="10%" alt="Hyuns Dash" />
</p>
<h1 align="center">find-7-in-sha256</h1>
<h5 align="center">SHA256에서 7 찾기</h5>
<p align="center"><ahref='https://find7.hyuns.dev/'>https://find7.hyuns.dev/</a></p>
<p align="center">
  <a href="LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/License-MIT-blue"/></a>
  <img alt="MIT License" src="https://img.shields.io/badge/Language-Typescript-blue?logo=typescript"/>
</p>

---


SHA256을 랜덤으로 찾아서 7의 개수를 찾는 웹사이트입니다.

localstorage에 최대값을 알아서 저장하며, sha를 위한 원 문자열은 "hyuns_(랜덤시드)_카운트" 형식입니다.

딱히 쓸모있지는 않고, 심심할 때 컴퓨터 돌려두기 괜찮습니다.

자습시간에 시간이 남아서 만든거라, 딱히 최적화는 신경 안 썼습니다.

현재 루프가 `setInterval(func, 0)`으로 돌고 있어 속도가 엄청 느립니다. 혹시 이런 ~~쓸모없는~~ 웹사이트를 만들고 싶으시다면 Web Worker나 WebGPU, WebCL 같은 것을 알아보시면 좋습니다.
