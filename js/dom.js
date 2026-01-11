const list = [
  {
    latin: "Consuetudo est altera natura",
    rus: "Привычка - вторая натура"
  },
  {
    latin: "Nota bene",
    rus: "Заметьте хорошо!"
  },
  {
    latin: "Nulla calamitas sola",
    rus: "Беда не приходит одна"
  },
  {
    latin: "Per aspera ad astra",
    rus: "Через тернии к звёздам"
  },
]

let counter = 0

const updateOlTag = () => {
  if (list.length > 0) {
    const index = Math.floor(Math.random() * list.length)
    const dom = document.querySelector('#list')
    const span = document.createElement('span')
    const li1 = document.createElement('li')
    const li2 = document.createElement('li')
    const ul = document.createElement('ul')
    li1.textContent = list[index].latin
    li2.textContent = list[index].rus
    span.className += 'dom_span'

    if (counter % 2 === 0) {
      li1.className += 'class1'
      li2.className += 'class1'
    } else {
      li1.className += 'class2'
      li2.className += 'class2'
    }

    ul.appendChild(li2)
    span.appendChild(li1)
    span.appendChild(ul)
    dom.appendChild(span)

    list.splice(index, 1)

    counter += 1
  } else {
    alert("Фразы закончились!")
  }
}

const editColor = () => {
  const spans = document.querySelectorAll('.dom_span')
  for (let i = 0; i < spans.length; i++) {
    if (i % 2 === 0) {
      const liElements = spans[i].querySelectorAll('li')
      liElements.forEach(el => {
        el.style.fontWeight = '500'
      })
    }
  }
}
