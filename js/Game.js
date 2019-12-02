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
        }
        ;


        Array.from(gridContainer.children).map((el, index) =>
            el.addEventListener("click", () => {
                    const rowPositionSingle = Math.floor(index / cols);
                    gridSingleElementInfo(el.style.backgroundColor, index, rowPositionSingle)
                }
            ))
    };

    makeGrid(createRows, createColumns);


    const gridSingleElementInfo = (divColor, index, rowPositionSingle) => {
        console.log(divColor, index);

        const rowPositionPrevious = Math.floor((index - 1) / createColumns);
        const rowPositionNext = Math.floor((index + 1) / createColumns);

        if (index > 0 && rowPositionSingle === rowPositionPrevious) {
            var previousPosition = gridContainer.children.item(`${index - 1}`).style.backgroundColor
        }

        if (index < gridContainer.children.length - 1 && rowPositionSingle === rowPositionNext) {
            var nextPosition = gridContainer.children.item(`${index + 1}`).style.backgroundColor;
        }

        if (index >= createColumns) {
            var upPosition = gridContainer.children.item(`${index - createColumns}`).style.backgroundColor;
        }
        if (index < gridContainer.children.length - createColumns) {
            var downPosition = gridContainer.children.item(`${index + createColumns}`).style.backgroundColor;
        }
        console.log(previousPosition,nextPosition,upPosition,downPosition)

    }


});