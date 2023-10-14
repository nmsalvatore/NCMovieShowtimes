export function getTodayDateString() {
    const today = new Date()
    const dateString = today.toLocaleDateString('en-US', { timeZone: 'America/Los_Angeles'})
    return formatMMDDYYYY(dateString)
}

export function convertDateToLongString(date) {
    const dateObj = new Date(date)
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return formattedDate;
}

function formatMMDDYYYY(date) {
    let [month, day, year] = date.split('/')
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    return `${month}/${day}/${year}`
}


export function convertToAbbreviatedDateString(date) {
    const [day_name, month, day] = date.toDateString().split(' ')
    return `${day_name}, ${month} ${day}`
}

export async function updateDatesData() {
    const res = await fetch("http://localhost:3000/api/dates");
    const dates = await res.json()
    const today = getTodayDateString()
    return dates.filter(date => date >= today)
}

export function enableSideScroll(scrollContainer) {
    let isDown = false;
    let startX;
    let scrollLeft;

    const slider = scrollContainer;
  
    slider.addEventListener("mousedown", (e) => {
        isDown = true;
        slider.style.cursor = "grabbing";
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
        isDown = false;
        slider.style.cursor = "grab";
    });

    slider.addEventListener("mouseup", () => {
        isDown = false;
        slider.style.cursor = "grab";
    });

    slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1;
        slider.scrollLeft = scrollLeft - walk;
    });

    return () => {
        // Cleanup event listeners
        slider.removeEventListener("mousedown");
        slider.removeEventListener("mouseleave");
        slider.removeEventListener("mouseup");
        slider.removeEventListener("mousemove");
    };
}
