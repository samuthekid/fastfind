const colors = ['2274a5', 'f75c03', 'f1c40f', 'd90368', '00cc66']
const selections = []

const initFF = () => {

  const onKeyDown = e => {
    // console.log('key down ', e.key)
    if (e.target.nodeName === 'INPUT') return false

    if (e.key === 'f') {
      const text = window.getSelection().toString()
      if (text) {
        data = { text: togglBR(text, true), tag: `<b class="ff">${text}</b>` }
        replaceOnDOM(data.text, data.tag)
        selections.push(data)
      } else
        removeLastFromDOM()
    } else if (e.key === 'd')
      while(selections.length)
        removeLastFromDOM()
  }

  const style = document.createElement("style")
  style.innerHTML = ".ff {background-color: lightblue}"
  document.head.appendChild(style)

  document.body.addEventListener('keydown', onKeyDown)
}

const removeLastFromDOM = () => {
  data = selections.pop()
  data && replaceOnDOM(data.tag, togglBR(data.text, false))
}

const togglBR = (text, x) => x
  ? text.replace(new RegExp('\n', 'g'), '<br>\n')
  : text.replace(new RegExp('<br>\n', 'g'), '\n')

const replaceOnDOM = (text, val) =>
  document.body.innerHTML = document.body.innerHTML.replace(new RegExp(text, 'g'), val)

window.onload = initFF()
