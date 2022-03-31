// SELECT
const todoInput = document.querySelector('.todo-input')
const add_btn = document.querySelector('.add-btn')
const todoContainer = document.querySelector('.todo-container')
const select = document.querySelector('select.filter-todo')
const BODY = document.querySelector('body')
const moonDiv = document.querySelector('.moon-sun')

// EVENTS
add_btn.addEventListener('click', addText)
todoContainer.addEventListener('click', function_btns)
select.addEventListener('click', filterFunction)
moonDiv.addEventListener('click', moonFunction)

// FUNCTIONS
function createDomElement(todo){
    const UL = document.createElement('ul')
    UL.classList.add('ul1')
    todoContainer.appendChild(UL)

    const LI = document.createElement('li')
    LI.innerText = todo.text
    UL.appendChild(LI)

    const completed_btn = document.createElement('button')
    completed_btn.classList.add('completed-btn')
    completed_btn.innerHTML = '<i class="fas fa-check"></i>'
    UL.appendChild(completed_btn)

    const trash_btn = document.createElement('button')
    trash_btn.classList.add('trash-btn')
    trash_btn.innerHTML = '<i class="fas fa-trash"></i>'
    UL.appendChild(trash_btn)
}

function startPage(){
    todos = JSON.parse(localStorage.getItem('todos3'))
    if(!todos){
        localStorage.setItem('todos3', JSON.stringify([]))
    } else{
        todos.forEach(td => {
            createDomElement(td)
        });
    }
}
startPage()
saveCompleteFunction()
nightMod()

function addText(e){
    e.preventDefault()
    
    if(todoInput.value && todoInput.value!=' '){
        let arr = {
            text:todoInput.value,
            isComplete: false
        }
        todos = JSON.parse(localStorage.getItem('todos3'))
        todos.push(arr)
        localStorage.setItem('todos3', JSON.stringify(todos))
        createDomElement(arr)
    } else{
        todoInput.style.boxShadow = '0 0 2px 1px red'
        todoInput.style.transition = 'all .2s'
        setTimeout(()=>todoInput.style.boxShadow = 'none',1000)
    }

    todoInput.value = ''
}

function function_btns(e){
    let UL = e.target
    if(UL.classList[0]==='completed-btn'){
        UL.parentElement.classList.toggle('completed')
        todos = JSON.parse(localStorage.getItem('todos3'))
        let LI_text = UL.parentElement.children[0].innerText
        todos.forEach(td=>{
            if(td.text==LI_text){
                td.isComplete=!td.isComplete
            }
        })
        localStorage.setItem('todos3', JSON.stringify(todos))
    }

    if(UL.classList[0]==='trash-btn'){
        UL.parentElement.classList.add('animate')
        UL.parentElement.addEventListener('transitionend', ()=>{
            UL.parentElement.remove()
        })
        todos = JSON.parse(localStorage.getItem('todos3'))
        let LI_text = UL.parentElement.children[0].innerText
        todos = todos.filter(td=>td.text!=LI_text)
        localStorage.setItem('todos3', JSON.stringify(todos))
    }
}

function saveCompleteFunction(){
    let UL = document.querySelectorAll('.ul1')
    UL.forEach(li => {
        let LI_text = li.children[0].innerText
        todos = JSON.parse(localStorage.getItem('todos3'))
        todos.forEach(td=>{
            if(td.text==LI_text && td.isComplete==true){
                li.classList.add('completed')
            }
        })
    })
}

function filterFunction(e) {
    todoContainer.childNodes.forEach(td=>{
        switch(select.value){
            case 'all':
                td.style.display = 'flex'
            break;
            case 'complete':
                if(td.classList.contains('completed')){
                    td.style.display = 'flex'
                } else{
                    td.style.display = 'none'
                }
            break;
            case 'uncomplete':
                if(!td.classList.contains('completed')){
                    td.style.display = 'flex'
                } else{
                    td.style.display = 'none'
                }
            break;
        }
    })
}

function moonFunction(e){
    if(e.target.children[0].style.display === 'flex'){
        e.target.children[0].style.left = '40px'
        e.target.children[0].style.opacity = '0.02'
        e.target.children[0].addEventListener('transitionend', ()=>{
            e.target.children[0].style.display = 'none'
            e.target.children[1].style.display = 'flex'
            e.target.children[1].style.opacity = '1'
            e.target.children[1].style.left = '40px'
            BODY.style.filter = 'invert(1)'
            BODY.style.backgroundImage = 'linear-gradient(120deg,  blue, darkblue)'
        })
        nightMod = JSON.parse(localStorage.getItem('night'))
        nightMod.night = true
        localStorage.setItem('night', JSON.stringify(nightMod))

    } else{
        e.target.children[1].style.left = '0'
        e.target.children[1].style.opacity = '0.02'
        e.target.children[1].addEventListener('transitionend', ()=>{
            e.target.children[1].style.display = 'none'
            e.target.children[0].style.display = 'flex'
            e.target.children[0].style.opacity = '1'
            e.target.children[0].style.left = '0'
            BODY.style.filter = 'invert(0)'
            BODY.style.backgroundImage = 'linear-gradient(120deg, rgb(196, 109, 9), rgb(255, 217, 0))'
        })
        nightMod = JSON.parse(localStorage.getItem('night'))
        nightMod.night = false
        localStorage.setItem('night', JSON.stringify(nightMod))
    }
}

function nightMod(){
    let nightMod = {
        night: false
    }

    if(localStorage.getItem('night') === null){
        localStorage.setItem('night', JSON.stringify(nightMod))
    }
    nightMod = JSON.parse(localStorage.getItem('night'))
    if(nightMod.night === true){
        moonDiv.children[0].style.left = '40px'
        moonDiv.children[0].style.opacity = '0.02'
        // moonDiv.children[0].addEventListener('transitionend', ()=>{
            moonDiv.children[0].style.display = 'none'
            moonDiv.children[1].style.display = 'flex'
            moonDiv.children[1].style.opacity = '1'
            moonDiv.children[1].style.left = '40px'
            BODY.style.filter = 'invert(1)'
            BODY.style.backgroundImage = 'linear-gradient(120deg,  blue, darkblue)'
        // })
    } else{
        moonDiv.children[1].style.left = '0'
        moonDiv.children[1].style.opacity = '0.02'
        // moonDiv.children[1].addEventListener('transitionend', ()=>{
            moonDiv.children[1].style.display = 'none'
            moonDiv.children[0].style.display = 'flex'
            moonDiv.children[0].style.opacity = '1'
            moonDiv.children[0].style.left = '0'
            BODY.style.filter = 'invert(0)'
            BODY.style.backgroundImage = 'linear-gradient(120deg, rgb(196, 109, 9), rgb(255, 217, 0))'
        // })
    }
}
