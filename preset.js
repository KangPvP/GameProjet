const datagame = require('./datagame.json')
let presets = {}

class Preset {

    constructor(name, direction, speed, width, height, texture) {
        this.name = name;
        this.direction = direction;
        this.speed = speed;
        this.width = width;
        this.height = height;
        this.texture = texture;
    }

    static fromObj(obj) {
        return new Preset(obj.name, obj.direction, obj.speed, obj.width, obj.height, obj.texture)
    }

}

function loadPresets() {
    datagame.presets.forEach(preset => {
        presets[preset.name] = preset
    })
}

module.exports.Preset = Preset
module.exports.loadPresets = loadPresets
module.exports.presets = presets