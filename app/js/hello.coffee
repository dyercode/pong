window.pong = ->
  html = JST['app/templates/pong.us']()
  document.body.innerHTML += html

$ ->
	pong()
	Game.start()