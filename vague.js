const datagame = require('./datagame.json')
const { readObstacles } = require('./obstacle.js')

let stade = 0
let vagues = []

class Vague {
    constructor(obstacles, type) {
        this.type = type;
        this.obstacles = obstacles;
    }
}

class VagueType {
    
    constructor(id, duration, name, coef){
        this.id = id
        this.duration = duration
        this.name = name
        this.coef = coef
    }

    static fromObj(obj) {
        return new VagueType(obj.id, obj.duration, obj.name, obj.coef)
    }

}

function readVagues() {
    datagame.vagues.forEach(vague => {
        vagues.push(new Vague(readObstacles(vague.obstacles), VagueType.fromObj(vague.type)))
    })
}

function isVagueFinished(timePassed){
    let vagueActuel = getVagueActuelle()
    console.log(timePassed)
    
    return timePassed >= vagueActuel.type.duration
}

function vagueInfo(){
    let vagueActuel = getVagueActuelle()
    
    let vagueName = vagueActuel.name

    let vaguePName = document.createElement("p")
    vaguePName.id = vagueActuel.id
    vaguePName.style.position = 'absolute'
    vaguePName.style.top = "50%"
    vaguePName.style.left = "50%"
    vaguePName.textContent = vagueName
    vaguePName.style.color = "rgb(255,0,0"
    vaguePName.style.fontSize = 40
    
    document.body.appendChild(vaguePName)
    setTimeout(() => {
        vaguePName.classList.add('shade-off')
        setTimeout(() => {
            vaguePName.remove()
        }, 990)
    }, 1000)

}

function getVagueActuelle() {
    return vagues[stade]
}

function augmenterStade(amount) {
    stade += amount
}

module.exports.Vague = Vague
module.exports.readVagues = readVagues
module.exports.vagues = vagues
module.exports.stade = stade
module.exports.getVagueActuelle = getVagueActuelle
module.exports.isVagueFinished = isVagueFinished
module.exports.vagueInfo = vagueInfo
module.exports.augmenterStade = augmenterStade

//WhenVagueIsFinish


