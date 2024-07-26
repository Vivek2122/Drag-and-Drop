const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

let getAfterElement = (container, y) => {
   let elements = [...container.querySelectorAll('.draggable:not(.dragging)')]
   return elements.reduce((closest, child) => {
    let box = child.getBoundingClientRect()
    let offset = y - (box.top + box.height / 2)
    if(offset < 0 && offset > closest.offset)
    {
        return { offset: offset, element: child}
    }
    else
    {
        return closest
    }
},{ offset : Number.NEGATIVE_INFINITY}).element
}

Array.from(draggables).forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

Array.from(containers).forEach(container => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault()
        let afterElement = getAfterElement(container, e.clientY)
        console.log(afterElement);
        let draggable = document.querySelector('.dragging')
        if(!afterElement)container.appendChild(draggable)
        container.insertBefore(draggable, afterElement)
    })
})

