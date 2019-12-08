document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM IS READY GO FILIP!");

    const gridContainer = document.querySelector("#grid__container");
    var score = 0;
    const emptyDivColor = "white";
    const NOT_FOUND_INDEX = -1;
    const colors = [
        "rgb(255,186,28)",
        "rgb(101,124,255)",
        "rgb(79,219,255)",
        "rgb(125,98,163)",
        "rgb(255,140,80)"
    ];

    function createGrid(rows, cols) {
        gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        for (el = 0; el < (rows * cols); el++) {
            let cell = document.createElement("div");
            cell.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            const rowPositionClass = Math.floor([el] / cols);
            const colPositionClass = [el] % cols;
            gridContainer.appendChild(cell).className = `${rowPositionClass + 1}/${colPositionClass + 1}`;
        }
        currentGridElement(cols)
    }

    createGrid(8, 12);

    function currentGridElement(cols) {

        let gridElements = document.getElementById("grid__container").children;
        Array.from(gridElements).map((el, index) =>
            el.addEventListener("click", () => {
                    let similarDivsIndex = [index];
                    let scoreCounter = document.querySelector(".box__score--result");

                    const divInfo = {
                        index: index,
                        colorToCheck: el.style.backgroundColor,
                        gridElements: gridElements,
                        cols: cols,
                        similarDivsIndex: similarDivsIndex
                    };
                    checkNeighbourDiv(index, el.style.backgroundColor, gridElements, cols, similarDivsIndex);
                    if (similarDivsIndex.length > 1) {

                        score += similarDivsIndex.length;
                        scoreCounter.textContent = score;
                        el.style.backgroundColor = emptyDivColor;
                        fillSimilarDivs(divInfo);
                    }

                }
            ));
    };

    function checkDiv(index, colorToCheck, gridElements, cols, similarDivsIndex) {
        var currentDiv = gridElements[index];
        var color = currentDiv.style.backgroundColor;

        if (color == colorToCheck) {
            currentDiv.style.backgroundColor = emptyDivColor;
            similarDivsIndex.push(index);

            checkNeighbourDiv(index, colorToCheck, gridElements, cols, similarDivsIndex);
        }

    };

    function checkNeighbourDiv(index, colorToCheck, gridElements, cols, similarDivsIndex) {
        let currentRow = Math.floor(index / cols);
        let firstIndexInCurrentRow = currentRow * cols;
        let lastIndexInCurrentRow = firstIndexInCurrentRow + cols - 1;
        let leftIndex = index - 1;
        let rightIndex = index + 1;
        let topIndex = index - cols;
        let bottomIndex = index + cols;

        if (leftIndex >= firstIndexInCurrentRow && !similarDivsIndex.includes(leftIndex)) {
            checkDiv(leftIndex, colorToCheck, gridElements, cols, similarDivsIndex);
        }

        if (rightIndex <= lastIndexInCurrentRow && !similarDivsIndex.includes(rightIndex)) {
            checkDiv(rightIndex, colorToCheck, gridElements, cols, similarDivsIndex);
        }

        if (topIndex >= 0 && !similarDivsIndex.includes(topIndex)) {
            checkDiv(topIndex, colorToCheck, gridElements, cols, similarDivsIndex);
        }

        if (bottomIndex < gridElements.length && !similarDivsIndex.includes(bottomIndex)) {
            checkDiv(bottomIndex, colorToCheck, gridElements, cols, similarDivsIndex);
        }
    };

    function fillSimilarDivs(divInfo) {
        divInfo.similarDivsIndex.sort((a, b) => b - a).forEach((index) => fillEmptyDivsInColumn(index, divInfo))

    };

    function fillEmptyDivsInColumn(index, divInfo) {
        var lastEmptyIndex = index;
        divInfo.columnIndex = getColumnIndex(lastEmptyIndex, divInfo.cols);


        while (lastEmptyIndex >= divInfo.columnIndex) {
            let emptyDiv = divInfo.gridElements[lastEmptyIndex];
            let firstNotEmptyDivIndex = getFirstNotEmptyDivIndex(lastEmptyIndex - divInfo.cols, divInfo);

            if (firstNotEmptyDivIndex == NOT_FOUND_INDEX) {
                emptyDiv.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            } else {
                let notEmptyDiv = divInfo.gridElements[firstNotEmptyDivIndex];
                emptyDiv.style.backgroundColor = notEmptyDiv.style.backgroundColor;
                notEmptyDiv.style.backgroundColor = emptyDivColor;
            }

            lastEmptyIndex = getLastEmptyDivIndex(lastEmptyIndex - divInfo.cols, divInfo);
        }
    };

    function getLastEmptyDivIndex(startIndex, divInfo) {
        for (let i = startIndex; i >= divInfo.columnIndex; i -= divInfo.cols) {
            if (divInfo.gridElements[i].style.backgroundColor == emptyDivColor) {
                return i;
            }
        }
        return NOT_FOUND_INDEX;
    };

    function getFirstNotEmptyDivIndex(startIndex, divInfo) {
        for (let i = startIndex; i >= divInfo.columnIndex; i -= divInfo.cols) {
            if (divInfo.gridElements[i].style.backgroundColor != emptyDivColor) {
                return i;
            }
        }
        return NOT_FOUND_INDEX;
    };
    const getColumnIndex = (index, cols) => index % cols;

    let button = document.querySelectorAll("button");

    function playOnButton() {
        gridContainer.innerHTML = "";

        let scoreBox = document.querySelector(".box__score--result").textContent = 0;
        score = 0;
        let createRows = document.getElementById("createRows").value;
        let createColumns = document.getElementById("createColumns").value;

        if (createColumns === "" && createRows === "") {
            confirm("please enter the number of columns and rows")
        } else if (createRows === "") {
            confirm("please enter the number of rows")
        } else if (createColumns === "") {
            confirm("please enter the number of columns")
        }
        createGrid(createRows, createColumns);
    }
    button[0].addEventListener("click", () => {
        let timeSettings = document.getElementById("timeSettings").value;

        const playOnTime = () => {
            setTimeout(() => {
                confirm("Time's up!\nYour score " + score);
            }, `${timeSettings * 1000}`);
        };

        playOnTime();
        playOnButton()
    });
    button[1].addEventListener("click", () => {
        playOnButton()

    });

});



