document.addEventListener('DOMContentLoaded',() => {
    let t = document.querySelector('#titles')
    let titles = [
        'Web Developer.',
        'UI Developer.',
        'Frontend Developer.',
        'Full Stack Engineer.'
    ]
    let initial = 0
    t.textContent = titles[initial]

    setInterval(() => {
        t.textContent = titles[initial]
        initial++
        if(initial > titles.length - 1)
            initial = 0
    },2000)    
})