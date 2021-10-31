const app = {
    target: 'canvas',
    images: ['./images/bat.png', './images/pumpkin.png', './images/sweet.png'],
    max: 30,
    speed: 3,
    width: window.innerWidth,
    height: window.innerHeight,
    imageMinWidth: 30,
    imageMaxWidth: 100,
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const canvas = document.getElementById(app.target)
const context = canvas.getContext('2d')

canvas.width = app.width
canvas.height = app.height

let images = []
let j = 0
for (let i = 0; i < app.max; i++) {
    if (j >= app.images.length) {
        j = 0
    }
    const imgPath = app.images[j]

    const image = new Image()
    image.src = imgPath
    image.onload = function () {
        const x = getRandomInt(0, app.width)
        const y = getRandomInt(0, app.height)

        const newWidth = getRandomInt(app.imageMinWidth, app.imageMaxWidth)
        const newHeight = Math.round(this.height / (this.width / newWidth))

        this._newWidth = newWidth
        this._newHeight = newHeight
        this._randomX = x
        this._randomY = y
        this._randomSpeed = app.speed * Math.random() + 1

        images.push(this)

        context.drawImage(image, x, y, newWidth, newHeight)
        if (i === app.max - 1) {
            animate()
        }
    }

    j++
}

function animate() {
    requestAnimationFrame(animate)

    context.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < images.length; i++) {
        const image = images[i];

        if (image._randomY > canvas.height) {
            image._randomY = 0
            image._randomX = getRandomInt(0, canvas.width)
            image[i] = image
        }

        image._randomY += image._randomSpeed

        context.drawImage(image, image._randomX, image._randomY, image._newWidth, image._newHeight)
    }
}