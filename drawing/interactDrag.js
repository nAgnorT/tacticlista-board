export default (name) => {
const classUse = '.'+name+''
return interact(classUse)
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end (event) {
        console.log(event.x0)
      }
    }
  })

function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-'+name+'-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-'+name+'-y')) || 0) + event.dy

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-'+name+'-x', x)
  target.setAttribute('data-'+name+'-y', y)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener
}