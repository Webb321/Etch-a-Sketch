const container = document.querySelector('.container');
container.addEventListener('mouseover', function (e) {
    if (e.target.className === 'box') {
        let darkenLevel = +e.target.getAttribute('data-darken-level') || 0;

        // If darkenLevel is less than 10, we darken the box
        if (darkenLevel < 10) {
            darkenLevel++;
            e.target.setAttribute('data-darken-level', darkenLevel);

            // Get current background color or generate a new random one if not set
            let currentColor = e.target.getAttribute('data-original-color');
            if (!currentColor) {
                const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
                currentColor = randomColor;
                e.target.setAttribute('data-original-color', randomColor);
                e.target.style.backgroundColor = randomColor;
            }

            // Extract RGB values
            const rgb = currentColor.match(/\d+/g).map(Number);

            // Apply darkening by reducing each channel by 10%
            const newColor = rgb.map(channel => Math.floor(channel * (1 - darkenLevel * 0.1)));

            // Set new darkened color
            e.target.style.backgroundColor = `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`;
        }
    }
});

const button = document.querySelector('button');

button.addEventListener('click', function () {
    let size = +prompt('Enter the number of squares you want to create (up to 100): ');
    if (size > 100) {
        size = 100;
    }
    container.innerHTML = '';
    createGrid(size);
});

function createGrid(size) {
    for (let i = 0; i < size * size; i++) {
        const div = document.createElement('div');
        div.className = 'box';
        div.style.width = `${1500 / size}px`;
        div.style.height = `${1500 / size}px`;
        div.style.backgroundColor = 'wheat'; // Initial placeholder color
        div.setAttribute('data-darken-level', 0); // Initial darken level
        container.appendChild(div);
    }
}
