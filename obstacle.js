const obstacles = require('./obstacles.json')

class Obstacle {

    constructor(id, x, time, direction, speed, width, height, texture) {
        this.id = id
        this.x = x;
        this.time = time;
        this.direction = direction;
        this.speed = speed;
        this.width = width;
        this.height = height;
        this.texture = texture;
    }

    static fromObj(obj) {
        return new Obstacle(obj.id, obj.x, obj.time, obj.direction, obj.speed, obj.width, obj.height, obj.texture)
    } 

    create() {
        let obstacle = document.createElement("img")
        obstacle.id = this.id
        obstacle.src = './img/' + this.texture
        obstacle.width = this.width
        obstacle.height = this.height
        obstacle.style.position = 'absolute'
        obstacle.style.left = this.x + 'px'
        obstacle.style.top = -50 - this.height + 'px'

        document.getElementById('obstacles').appendChild(obstacle)
    }

    tick() {
        if(!isCreated(this.id)) return;

        let obstacle = document.getElementById(this.id)
        obstacle.style.top = obstacle.offsetTop + this.speed * 10 + 'px'
        if(obstacle.offsetTop > 800) {
            obstacle.remove()
        }
    }


}

function readObstacles() {
    let obstacleList = []
    obstacles.forEach((element, index) => {
        element.id = index
        obstacleList.push(Obstacle.fromObj(element))
    })
    return obstacleList
}

function creationTick(obstacleList, timePassed) {
    obstacleList.forEach((element) => {
        if(timePassed >= element.time && !(timePassed >= element.time + 50) && !isCreated(element.id)) {
            element.create()
        }
    })
}

function checkRemove(obstacleList, timePassed) {
    obstacleList.forEach((element, index) => {
        if(!isCreated && timePassed > element.time + 50) {
            // enlever l'élément
            obstacleList.splice(index, 1)
        } 
    })
    return obstacleList
}

function isCreated(id) {
    return document.getElementById(id) != undefined
} 

function randomAsteroide() {
    let obstacleList = []

    for(let i = 0; i < 10; i++){
        let textureList = ["texture1.png", "texture2.png", "texture3.png", "texture4.png"]
        let asteroide = new Obstacle(i, getRandomInt(-100,-15), getRandomInt(0,1200), 1000, getRandomInt(70,110), getRandomInt(2,6), getRandomInt(1,6), getRandomInt(1,6), textureList[getRandomInt(0,5)])
        obstacleList.push(asteroide)
    }
    return obstacleList
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
module.exports.Obstacle = Obstacle
module.exports.readObstacles = readObstacles
module.exports.creationTick = creationTick
module.exports.checkRemove = checkRemove
