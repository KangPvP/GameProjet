const datagame = require('./datagame.json')
const { Preset, presets } = require('./preset.js')

class Obstacle {

    constructor(id, x, time, direction, speed, width, height, texture, preset) {
        this.id = id;
        this.x = x;
        this.time = time;
        this.direction = direction;
        this.speed = speed;
        this.width = width;
        this.height = height;
        this.texture = texture;
        this.preset = preset;

        if(preset != undefined) {

            let presetname = this.preset
            let nPreset = presets[presetname]

            if(nPreset != undefined) {

                if(nPreset.direction != undefined) this.direction = nPreset.direction 
                if(nPreset.speed != undefined) this.speed = nPreset.speed 
                if(nPreset.width != undefined) this.width = nPreset.width 
                if(nPreset.height != undefined) this.height = nPreset.height
                if(nPreset.texture != undefined) this.texture = nPreset.texture 

            }


        }
    }

    static fromObj(obj) {
        return new Obstacle(obj.id, obj.x, obj.time, obj.direction, obj.speed, obj.width, obj.height, obj.texture, obj.preset)
    }

    create() {

        let obstacle = document.createElement("img")
        obstacle.id = this.id
        obstacle.style.position = 'absolute'

        obstacle.src = './img/' + this.texture
        obstacle.width = this.width
        obstacle.height = this.height
        obstacle.style.left = this.x + 'px'
        obstacle.style.top = -50 - this.height + 'px'
        
        console.log(obstacle)
        document.getElementById('obstacles').appendChild(obstacle)
    }

    tick() {
        if(!isCreated(this.id)) return;
        let obstacle = document.getElementById(this.id)
        obstacle.style.top = obstacle.offsetTop + this.speed * 10 + 'px'
        obstacle.style.left = obstacle.offsetLeft + this.direction + 'px'
        if(obstacle.offsetTop > 800) {
            obstacle.remove()
        }
    }

}

function readObstacles(jsonList) {
    console.log(jsonList)
    let obstacleList = []
    jsonList.forEach((element, index) => {
        element.id = index
        obstacleList.push(Obstacle.fromObj(element))
    })
    return obstacleList
}

// permet de créer les obstacles dans l'html si leur temps est arrivé
function creationTick(obstacleList, timePassed) {
    obstacleList.forEach((element) => {
        // si le temps d'activation de l'obstacle est comprit entre le temps actuel et le temps actuel + 50 ms
        if(timePassed >= element.time && !(timePassed >= element.time + 50) && !isCreated(element.id)) {
            element.create()
        }
    })
}

// si un objet est déja passé et qu'il n'est plus dans le document, il ne sera pas dans la liste returned
function checkRemove(obstacleList, timePassed) {
    obstacleList.forEach((element, index) => {
        // s'il est déja passé et qu'il n'est plus dans le document
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
