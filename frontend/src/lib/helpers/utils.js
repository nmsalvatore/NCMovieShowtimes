export function enableSideScroll(scrollContainer) {
    let isDown = false
    let startX
    let scrollLeft

    const slider = scrollContainer
  
    slider.addEventListener('mousedown', (e) => {
        isDown = true
        slider.style.cursor = 'grabbing'
        startX = e.pageX - slider.offsetLeft
        scrollLeft = slider.scrollLeft
    })

    slider.addEventListener('mouseleave', () => {
        isDown = false
        slider.style.cursor = 'grab'
    })

    slider.addEventListener('mouseup', () => {
        isDown = false
        slider.style.cursor = 'grab'
    })

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return
        e.preventDefault()
        const x = e.pageX - slider.offsetLeft
        const walk = (x - startX) * 1
        slider.scrollLeft = scrollLeft - walk
    })

    return () => {
        slider.removeEventListener('mousedown')
        slider.removeEventListener('mouseleave')
        slider.removeEventListener('mouseup')
        slider.removeEventListener('mousemove')
    }
}
