document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM IS READY GO FILIP!");

    const gridContainer = document.querySelector("#grid__container");
    var scoreBox = document.querySelector(".box__score--result");
    var score = 0;
    const emptyFieldColor = "white";
    const notFoundIndex = -1;
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
        let isCreateGrid = true;
        while (isCreateGrid) {

            for (grid = 0; grid < (rows * cols); grid++) {
                let gridField = document.createElement("div");
                gridField.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                gridContainer.appendChild(gridField)
            }

            isCreateGrid = isEndGame(gridContainer.children, cols);
            if (isCreateGrid) {
                gridContainer.innerHTML = "";
            }
        }
        setEventsOnFields(cols)
    }

    createGrid(8, 12);

    function setEventsOnFields(cols) {

        let gridFields = gridContainer.children;

        Array.from(gridFields).map((currentField, index) =>
            currentField.addEventListener("click", () => {
                    let similarFieldsIndex = [index];
                    // let scoreCounter = document.querySelector(".box__score--result");

                    checkNeighbourField(index, currentField.style.backgroundColor, gridFields, cols, similarFieldsIndex);

                    if (similarFieldsIndex.length > 1) {
                        score += similarFieldsIndex.length;
                        scoreBox.textContent = score;
                        currentField.style.backgroundColor = emptyFieldColor;

                        fillEmptyFields(similarFieldsIndex, gridFields, cols);

                        let endOfGame = isEndGame(gridFields, cols);
                        if (endOfGame) {
                            let gameOverDiv = document.querySelector(".hidden");
                            gameOverDiv.className = "box__gameOver";
                            let closeGameOver = document.querySelector(".close");
                            closeGameOver.addEventListener("click", () => {
                                gameOverDiv.className = "hidden"
                            })

                        }
                    }

                }
            ));
    };

    function isEndGame(gridFields, cols) {

        for (let i = 0; i < gridFields.length; i++) {
            let rightIndex = i + 1;
            let bottomIndex = i + cols;
            let currentRow = Math.floor(i / cols);
            let firstIndexInCurrentRow = currentRow * cols;
            let lastIndexInCurrentRow = firstIndexInCurrentRow + cols - 1;
            let currentFieldColor = gridFields[i].style.backgroundColor;
            if (rightIndex <= lastIndexInCurrentRow) {
                let rightFieldGridColor = gridFields[i + 1].style.backgroundColor;
                if (currentFieldColor === rightFieldGridColor) {
                    return false
                }
            }
            if (bottomIndex < gridFields.length) {
                let bottomFieldGridColor = gridFields[i + cols].style.backgroundColor;
                if (currentFieldColor === bottomFieldGridColor) {
                    return false
                }
            }
        }
        return true
    }

    function checkField(index, gridFieldColorToCheck, gridFields, cols, similarFieldsIndex) {
        var currentDiv = gridFields[index];
        var color = currentDiv.style.backgroundColor;

        if (color === gridFieldColorToCheck) {
            currentDiv.style.backgroundColor = emptyFieldColor;
            similarFieldsIndex.push(index);

            checkNeighbourField(index, gridFieldColorToCheck, gridFields, cols, similarFieldsIndex);
        }
    };

    function checkNeighbourField(index, gridFieldColorToCheck, gridFields, cols, similarFieldsIndex) {
        let currentRow = Math.floor(index / cols);
        let firstIndexInCurrentRow = currentRow * cols;
        let lastIndexInCurrentRow = firstIndexInCurrentRow + cols - 1;
        let leftIndex = index - 1;
        let rightIndex = index + 1;
        let topIndex = index - cols;
        let bottomIndex = index + cols;

        if (leftIndex >= firstIndexInCurrentRow && !similarFieldsIndex.includes(leftIndex)) {
            checkField(leftIndex, gridFieldColorToCheck, gridFields, cols, similarFieldsIndex);
        }

        if (rightIndex <= lastIndexInCurrentRow && !similarFieldsIndex.includes(rightIndex)) {
            checkField(rightIndex, gridFieldColorToCheck, gridFields, cols, similarFieldsIndex);
        }

        if (topIndex >= 0 && !similarFieldsIndex.includes(topIndex)) {
            checkField(topIndex, gridFieldColorToCheck, gridFields, cols, similarFieldsIndex);
        }

        if (bottomIndex < gridFields.length && !similarFieldsIndex.includes(bottomIndex)) {
            checkField(bottomIndex, gridFieldColorToCheck, gridFields, cols, similarFieldsIndex);

        }
    };

    function fillEmptyFields(similarFieldsIndex, gridFields, cols) {
        similarFieldsIndex.sort((a, b) => b - a).forEach((index) => {
            if (gridFields[index].style.backgroundColor === emptyFieldColor) {
                fillEmptyFieldsInColumn(index, gridFields, cols)
            }
        })

    };


    function fillEmptyFieldsInColumn(emptyFieldIndex, gridFields, cols) {
        let lastEmptyFieldIndex = emptyFieldIndex;
        let columnIndex = getColumnIndex(lastEmptyFieldIndex, cols);


        while (lastEmptyFieldIndex >= columnIndex) {
            let emptyField = gridFields[lastEmptyFieldIndex];
            let firstNotEmptyFieldIndex = getFirstNotEmptyFieldIndex(lastEmptyFieldIndex - cols, columnIndex, gridFields, cols);

            if (firstNotEmptyFieldIndex === notFoundIndex) {
                emptyField.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            } else {
                let notEmptyField = gridFields[firstNotEmptyFieldIndex];
                emptyField.style.backgroundColor = notEmptyField.style.backgroundColor;
                notEmptyField.style.backgroundColor = emptyFieldColor;
            }

            lastEmptyFieldIndex = getLastEmptyFieldIndex(lastEmptyFieldIndex - cols, columnIndex, gridFields, cols);
        }
    };

    function getLastEmptyFieldIndex(startIndex, columnIndex, gridFields, cols) {
        for (let i = startIndex; i >= columnIndex; i -= cols) {
            if (gridFields[i].style.backgroundColor === emptyFieldColor) {
                return i;
            }
        }
        return notFoundIndex;
    };

    function getFirstNotEmptyFieldIndex(startIndex, columnIndex, gridFields, cols) {
        for (let i = startIndex; i >= columnIndex; i -= cols) {
            if (gridFields[i].style.backgroundColor !== emptyFieldColor) {
                return i;
            }
        }
        return notFoundIndex;
    };

    function getColumnIndex(index, cols) {
        return index % cols;
    };


    let buttonPlay = document.getElementById("box__button__play");

    buttonPlay.addEventListener("click", () => {
        playOnButton()
    });

    function playOnButton() {
        gridContainer.innerHTML = "";
        scoreBox.textContent = 0;
        let createRows = document.getElementById("createRows").value;
        let createColumns = document.getElementById("createColumns").value;
        if (createColumns === "" || createColumns == 0 && createRows === "" || createRows <= 0) {
            confirm("please enter the number of columns and rows")
        } else if (createRows === "" || createRows <= 0) {
            confirm("please enter the number of rows")
        } else if (createColumns === "" || createColumns <= 0) {
            confirm("please enter the number of columns")
        } else {
            createGrid(parseInt(createRows), parseInt(createColumns));
        }
    }


});



