let colorsCnt = 0
const colorsTotal = 12
const colorsCSS = `ffelem {
  color: #F6F6F6;
  border-radius: 1.5px;
}
.color0 { background-color: #1EA896 }
.color1 { background-color: #FF6164 }
.color2 { background-color: #0071BC }
.color3 { background-color: #1FB85C }
.color4 { background-color: #F75C03 }
.color5 { background-color: #659B5E }
.color6 { background-color: #FAA916 }
.color7 { background-color: #C2202C }
.color8 { background-color: #B52890 }
.color9 { background-color: #4930F0 }
.color10 { background-color: #5A136C }
.color11 { background-color: #17442B }`

const selections = []

const initFF = () => {

  const onKeyDown = e => {
    if (e.target.nodeName === 'INPUT' || event.metaKey) return false

    if (e.key === 'f') {
      const text = window.getSelection().toString().trim()
      if (text) {
        if (selections.includes(text))
          removeFromDOM(text)
        else {
          findAndReplaceDOMText(document.body,
            {
              preset: 'prose',
              find: text,
              wrap: 'ffelem',
              wrapClass: `color${colorsCnt++%colorsTotal} ${text}`,
            })
          window.getSelection().empty()
          selections.push(text)
        }
      } else {
        selections.length && removeFromDOM(selections[selections.length - 1])
      }
    } else if (e.key === 'd')
      while(selections.length)
        removeFromDOM(selections[selections.length - 1])
  }

  const style = document.createElement('style')
  style.innerHTML = colorsCSS
  document.head.appendChild(style)

  document.body.addEventListener('keydown', onKeyDown)
}

const removeFromDOM = (text) => {
  if (!text) return false
  selections.splice(selections.indexOf(text), 1)
  var elems = Array.prototype.slice.call( document.getElementsByTagName('ffelem') )
  elems.forEach(e => {
    const tagText = e.className.substring(e.className.indexOf(' ') + 1)
    if(tagText === text)
      e.replaceWith(e.innerHTML)
  })
}

window.onload = initFF()
