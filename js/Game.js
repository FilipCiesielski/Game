document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM IS READY GO FILIP!");

    const gridContainer = document.querySelector("#container");

    const colors = [
        orange = "rgb(255,186,28)",
        blue = "rgb(101,124,255)",
        lightblue = "rgb(79,219,255)",
        violet = "rgb(125,98,163)",
        red = "rgb(255,140,80)"

    ];
    const createRows = 5;
    const createColumns = 12;

    const makeGrid = (rows, cols) => {
        gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        for (el = 0; el < (rows * cols); el++) {
            let cell = document.createElement("div");
            cell.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            const rowPositionClass = Math.floor([el] / cols);
            const colPositionClass = [el] % cols;
            gridContainer.appendChild(cell).className = `${rowPositionClass}/${colPositionClass}`;
            ;
        }
        ;


        Array.from(gridContainer.children).map((el, index) =>
            el.addEventListener("click", () => {
                    gridSingleElementInfo(el.style.backgroundColor, el.className, index)
                }
            ))
    };

    makeGrid(createRows, createColumns);


    const gridSingleElementInfo = (divColor, divPosition, index) => {
        console.log(divColor, divPosition, index);
        console.log(index - createColumns, gridContainer.children.length - 1);

        if (index < gridContainer.children.length - 1) {
            var nextPosition = gridContainer.children.item(`${index + 1}`).style.backgroundColor;
        }
        if (index > 0) {
            var previousPosition = gridContainer.children.item(`${index - 1}`).style.backgroundColor;
        }
        if (index >= createColumns) {
            var upPosition = gridContainer.children.item(`${index - createColumns}`).style.backgroundColor;
        }
        if (index < gridContainer.children.length - createColumns) {
            var downPosition = gridContainer.children.item(`${index + createColumns}`).style.backgroundColor;
        }

        console.log(nextPosition, previousPosition, upPosition, downPosition);
        if (divColor === previousPosition) {
            gridContainer.children.item(index).style.backgroundColor = "white";
            gridContainer.children.item(`${index - 1}`).style.backgroundColor = "white"
        }
        if (divColor === nextPosition) {
            gridContainer.children.item(index).style.backgroundColor = "white";
            gridContainer.children.item(`${index + 1}`).style.backgroundColor = "white"
        }
        if (divColor === upPosition) {
            gridContainer.children.item(index).style.backgroundColor = "white";
            gridContainer.children.item(`${index - createColumns}`).style.backgroundColor = "white"
        }
        if (divColor === downPosition) {
            gridContainer.children.item(index).style.backgroundColor = "white";
            gridContainer.children.item(`${index + createColumns}`).style.backgroundColor = "white"
        }

    }


});