const images = [
  {
    img: '../assets/dragAndDrop/bird1.png',
    theme: 'bird'
  },
  {
    img: '../assets/dragAndDrop/bird2.png',
    theme: 'bird'
  },
  {
    img: '../assets/dragAndDrop/bird3.png',
    theme: 'bird'
  },
  {
    img: '../assets/dragAndDrop/fish1.png',
    theme: 'fish'
  },
  {
    img: '../assets/dragAndDrop/fish2.png',
    theme: 'fish'
  },
  {
    img: '../assets/dragAndDrop/insect1.png',
    theme: 'insect'
  },
  {
    img: '../assets/dragAndDrop/insect2.png',
    theme: 'insect'
  }
]
const rotates = [0, 45, 90, 135, 180, 225, 270, 315]

const makeDraggable = (element) => {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0

  const dragMouseDown = (e) => {
    e.preventDefault()
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    document.onmousemove = elementDrag
  }

  const elementDrag = (e) => {
    e.preventDefault()
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY

    element.style.top = (element.offsetTop - pos2) + "px"
    element.style.left = (element.offsetLeft - pos1) + "px"
  }

  const closeDragElement = () => {
    document.onmouseup = null
    document.onmousemove = null
    checkGroups()
  }

  element.onmousedown = dragMouseDown
}

const drawImages = () => {
  const container = document.querySelector('.dragAndDropBlock')
  const containerWidth = container.clientWidth
  const containerHeight = container.clientHeight

  images.forEach(el => {
    const rotate = Math.floor(Math.random() * rotates.length)
    const img = document.createElement('img')
    img.src = el.img
    img.dataset.currentTheme = el.theme
    img.dataset.currentRotationIndex = rotate
    img.style.transform = `rotate(${rotates[rotate]}deg)`

    const maxLeft = containerWidth - 150
    const maxTop = containerHeight - 150
    if (maxLeft > 0) {
      img.style.left = Math.floor(Math.random() * maxLeft) + 'px'
    } else {
      img.style.left = '0px'
    }
    if (maxTop > 0) {
      img.style.top = Math.floor(Math.random() * maxTop) + 'px'
    } else {
      img.style.top = '0px'
    }

    img.addEventListener('click', () => {
      const rotateIndex = parseInt(img.dataset.currentRotationIndex)
      const nextIndex = (rotateIndex + 1) % rotates.length
      img.dataset.currentRotationIndex = nextIndex
      img.style.transform = `rotate(${rotates[nextIndex]}deg)`
      checkGroups()
    })

    container.appendChild(img)

    makeDraggable(img)
  })
}

const checkGroups = () => {
  const images = Array.from(document.querySelector('.dragAndDropBlock').querySelectorAll('img'))
  const birdGroup = images.filter(el => el.dataset.currentTheme === 'bird')
  const fishGroup = images.filter(el => el.dataset.currentTheme === 'fish')
  const insectGroup = images.filter(el => el.dataset.currentTheme === 'insect')
  const birdSuccess = checkOneGroup(birdGroup)
  const fishSuccess = checkOneGroup(fishGroup)
  const insectSuccess = checkOneGroup(insectGroup)

  if (birdSuccess && fishSuccess && insectSuccess) {
    alert("Задание выполнено!")
  }

}

const checkOneGroup = (group) => {
  let success = false
  let firstLeft, firstTop

  group.forEach((el, index) => {
    const styles = getComputedStyle(el)
    
    if (el.dataset.currentRotationIndex === '0') {
      if (index === 0) {
        firstLeft = parseInt(styles.left.replace(/px/g, ""))
        firstTop = parseInt(styles.top.replace(/px/g, ""))
      } else {
        const left = parseInt(styles.left.replace(/px/g, ""))
        const top = parseInt(styles.top.replace(/px/g, ""))
        if (Math.abs(firstLeft - left) > 180 || Math.abs(firstTop - top) > 180) {
          success = false
          return
        } else {
          success = true
        }
      }
    }
  })

  return success
}

drawImages()
