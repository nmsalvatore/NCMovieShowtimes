export function verticalScroll() {
    document.addEventListener('scroll', () => {
        const scrollbar = document.querySelector('.scrollbar')
        if (scrollbar) {
            if (window.innerWidth >= 600) {
                if (window.scrollY >= 96) {
                    scrollbar.classList.add('shadow')
                } else {
                    scrollbar.classList.remove('shadow')
                }
            } else {
                if (window.scrollY >= 80) {
                    scrollbar.classList.add('shadow')
                } else {
                    scrollbar.classList.remove('shadow')
                }
            }
        }
    });
}

export function horizontalScroll(scrollContainer) {
    let isDown = false
    let startX
    let scrollLeft

    const slider = scrollContainer
  
    slider.addEventListener('mousedown', (e) => {
        isDown = true
        slider.style.cursor = 'grabbing'
        slider.style.scrollBehavior = 'auto'
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
        const walk = (x - startX) * 1.25
        slider.scrollLeft = scrollLeft - walk
    })

    return () => {
        slider.removeEventListener('mousedown')
        slider.removeEventListener('mouseleave')
        slider.removeEventListener('mouseup')
        slider.removeEventListener('mousemove')
    }
}

export function arrowClick(scrollContainer) {
    const leftArrow = document.querySelector('.left.arrow')
    const rightArrow = document.querySelector('.right.arrow')
    const scrollAmount = scrollContainer.offsetWidth - 48

    leftArrow.addEventListener('click', () => {
        scrollContainer.style.scrollBehavior = 'smooth'
        scrollContainer.scrollLeft -= scrollAmount

    });

    rightArrow.addEventListener('click', () => {
        scrollContainer.style.scrollBehavior = 'smooth'
        scrollContainer.scrollLeft += scrollAmount
    });
}