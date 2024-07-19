// Render with KaTeX
const timeComplexity = document.querySelector('#big-o-notation')
const numOfEdges = document.querySelector('#num-of-edges')
const numOfNodes = document.querySelector('#num-of-nodes')
const startingNode = document.querySelector('#starting-node')
const nodeA = document.querySelectorAll('#node-A')
const nodeB = document.querySelectorAll('#node-B')
const nodeC = document.querySelectorAll('#node-C')
const nodeD = document.querySelectorAll('#node-D')
const nodeE = document.querySelectorAll('#node-E')
const nodeF = document.querySelectorAll('#node-F')
const nodeG = document.querySelectorAll('#node-G')
const infty = document.querySelectorAll('#infty')

const renderKaTeX = (exp, element) => {
    if (!element.length) {
        katex.render(exp, element)
        return 
    }

    for (const el of element) {
        katex.render(exp, el)
    }
}

renderKaTeX('O(|V|^2)', timeComplexity)
renderKaTeX('E', numOfEdges)
renderKaTeX('V', numOfNodes)
renderKaTeX('A', nodeA)
renderKaTeX('B', nodeB)
renderKaTeX('C', nodeC)
renderKaTeX('D', nodeD)
renderKaTeX('E', nodeE)
renderKaTeX('F', nodeF)
renderKaTeX('G', nodeG)
renderKaTeX('\\infty', infty)

// Render the "Visual Explanation" Page
const openBtn = document.querySelector('.open-visual-explanation')
const closeBtn = document.querySelector('.return-to-home')
const visualExplanationPage = document.querySelector('section')

const openVisualExplanation = () => {
    visualExplanationPage.setAttribute('data-open', 'true')
    document.body.style.overflowY = 'hidden'
}

const closeVisualExplanation = () => {
    visualExplanationPage.setAttribute('data-open', 'false')
    document.body.style.overflowY = 'scroll'
}

openBtn.addEventListener('click', openVisualExplanation)

openBtn.addEventListener('keypress', ({ key }) => {
    if (key === 'Enter') {
        openVisualExplanation()
    }
})

closeBtn.addEventListener('click', closeVisualExplanation)

closeBtn.addEventListener('keypress', ({ key }) => {
    if (key === 'Enter') {
        closeVisualExplanation()
    }
})

document.body.addEventListener('keydown', ({ key }) => {
    if (key === 'Escape') {
        closeVisualExplanation()
    }
})

// Step system
const steps = document.querySelectorAll('.step')
const asideImgs = document.querySelectorAll('.visual-explanation-img')
const contents = document.querySelectorAll('.content')
let currentIndex = 0   

for (let i = 0; i < steps.length; i++) {
    steps[i].addEventListener('click', () => {  
        if (i > currentIndex) {
            [...steps].slice(0, i + 1).map((el, index) => {
                el.setAttribute('data-active', 'true')
                contents[index].removeAttribute('data-visible')
                asideImgs[index].removeAttribute('data-visible')
    
                if (index > 0) {
                    steps[index - 1].setAttribute('data-progress', 'true')
                }

            })
        } else {
            [...steps].slice(i, currentIndex + 1).map((el, index) => {
                contents[currentIndex - index].removeAttribute('data-visible')
                asideImgs[currentIndex - index].removeAttribute('data-visible')

                if (index > 0) {
                    el.removeAttribute('data-active', 'true')
                    steps[currentIndex - index].removeAttribute('data-progress', 'true')
                }
            })
        }
        
        contents[i].setAttribute('data-visible', 'true')
        asideImgs[i].setAttribute('data-visible', 'true')
        currentIndex = i
    })
}