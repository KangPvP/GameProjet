const datagame = require('./datagame.json')

let stade = 0
let vagues = []

class Vague {
    
    constructor(id, duration, name, coef){
        this.id = id
        this.duration = duration
        this.name = name
        this.coef = coef
    }

    static readVagues(){
        let vaguesTypes = datagame.vagues
        let vaguesList = []

        vaguesTypes.forEach(vague => {
            let type = vague.type
            vagueObj = new Vague(type.id, type.duration, type.name, type.coef)
            vaguesList.push(vagueObj)

        });

        vagues = vaguesList
    }
}

function isVagueFinished(stade, timePassed){
    let vagueActuel = getVagueActuelle()
    
    return timePassed >= vagueActuel.duration
}

function vagueInfo(stade){
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

}

function getVagueActuelle() {
    return vagues[stade]
}

function startVague(id) {
    stade = id
}

module.exports.Vague = Vague
module.exports.vagues = vagues
module.exports.stade = stade
module.exports.getVagueActuelle = getVagueActuelle

//WhenVagueIsFinish


