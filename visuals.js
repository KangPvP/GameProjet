
function deathEffect(x, y) {

    let explosion = document.createElement('div')
    
    explosion.style.position = 'absolute'
    explosion.style.top = x/2 + 'px'
    explosion.style.left = y/2 + 'px'
    explosion.classList.add('deathEffect')
    explosion.classList.add('shade-off')

    document.body.appendChild(explosion)

    setTimeout(() => {
        explosion.remove()
    }, 1000)

}

module.exports.deathEffect = deathEffect