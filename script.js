document.addEventListener("DOMContentLoaded", function () {
    const redRange = document.getElementById("redRange");
    const greenRange = document.getElementById("greenRange");
    const blueRange = document.getElementById("blueRange");
    const redInput = document.getElementById("redInput");
    const greenInput = document.getElementById("greenInput");
    const blueInput = document.getElementById("blueInput");
    const colorPicker = document.getElementById("colorPicker");
    const colorBox = document.getElementById("colorBox");
    const hexCode = document.getElementById("hexCode");

    function updateColor() {
        const r = parseInt(redRange.value);
        const g = parseInt(greenRange.value);
        const b = parseInt(blueRange.value);
        const hex = rgbToHex(r, g, b);

        colorBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        hexCode.textContent = hex;
        colorPicker.value = hex; // Actualiza el color picker

        redInput.value = r;
        greenInput.value = g;
        blueInput.value = b;
    }

    function syncSliders() {
        redRange.value = redInput.value;
        greenRange.value = greenInput.value;
        blueRange.value = blueInput.value;
        updateColor();
    }

    function syncFromColorPicker() {
        const hex = colorPicker.value;
        const rgb = hexToRgb(hex);

        redRange.value = rgb.r;
        greenRange.value = rgb.g;
        blueRange.value = rgb.b;

        redInput.value = rgb.r;
        greenInput.value = rgb.g;
        blueInput.value = rgb.b;

        updateColor();
    }

    function rgbToHex(r, g, b) {
        return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
    }

    function hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    }

    redRange.addEventListener("input", updateColor);
    greenRange.addEventListener("input", updateColor);
    blueRange.addEventListener("input", updateColor);

    redInput.addEventListener("input", syncSliders);
    greenInput.addEventListener("input", syncSliders);
    blueInput.addEventListener("input", syncSliders);

    colorPicker.addEventListener("input", syncFromColorPicker);

    updateColor(); // Inicializa el color
});
