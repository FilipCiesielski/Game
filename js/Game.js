document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM IS READY GO FILIP!");

    const gridContainer = document.querySelector("#grid__container");

    const colors = [
        "rgb(255,186,28)",
        "rgb(101,124,255)",
        "rgb(79,219,255)",
        "rgb(125,98,163)",
        "rgb(255,140,80)"
    ];

    //  let button=document.querySelector("button");
    //  button.addEventListener("click",()=>{
    //      gridContainer.innerHTML="";
    //
    //
    //  let createRows=document.getElementById("createRows").value;
    // let createColumns = document.getElementById("createColumns").value;
    //  // if(createColumns==="" && createRows==="") {
    //  //     alert( "please enter the number of columns and rows")
    //  //
    //  // }else if(createRows==="" ) {
    //  //
    //  //     alert("please enter the number of rows")
    //  // }else if (createColumns==="" ){
    //  //
    //  //   alert ("please enter the number of columns")
    //  // }
    //  //
    //  //     let scoreBox=document.querySelector("span");
    //  //     if(createRows!=="" && createColumns!=="")
    //  //         scoreBox.className="";
    //      makeGrid(createRows,createColumns)
    //  })


    makeGrid(8, 12);

    function makeGrid(rows, cols) {
        gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        for (el = 0; el < (rows * cols); el++) {
            let cell = document.createElement("div");
            cell.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            const rowPositionClass = Math.floor([el] / cols);
            const colPositionClass = [el] % cols;
            gridContainer.appendChild(cell).className = `${rowPositionClass + 1}/${colPositionClass + 1}`;
        }
        var score = 0;
        let gridElements = document.getElementById("grid__container").children;
        Array.from(gridElements).map((el, index) =>
            el.addEventListener("click", () => {
                    let similarDivsIndex = [index];
                    let scoreCounter = document.querySelector(".box__score--result");
                    console.log(scoreCounter)
                    checkNeighbourDiv(index, el.style.backgroundColor, gridElements, cols, similarDivsIndex);

                    if (similarDivsIndex.length > 1) {

                        score += similarDivsIndex.length;
                        scoreCounter.textContent = score;
                        el.style.backgroundColor = "white";
                        fillSimilarDivs(similarDivsIndex, cols, gridElements);
                    }

                }
            ));
    };


 const checkDiv=(index, colorToCheck, gridElements, cols, similarDivsIndex) => {
        var currentDiv = gridElements[index];
        var color = currentDiv.style.backgroundColor;

        if (color == colorToCheck) {
            currentDiv.style.backgroundColor = "white";
            similarDivsIndex.push(index);

            checkNeighbourDiv(index, colorToCheck, gridElements, cols, similarDivsIndex);

        }

    };

    const checkNeighbourDiv = (index, colorToCheck, gridElements, cols, similarDivsIndex) => {
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

    const fillSimilarDivs = (similarDivIndex, cols, gridElements) => {
        similarDivIndex.sort((a, b) => b - a).forEach((index) => fillEmptyDivsInColumn(index, gridElements, cols))

    };


    const NOT_FOUND_INDEX = -1;
    const fillEmptyDivsInColumn = (emptyDivIndex, gridElements, cols) => {
        var lastEmptyIndex = emptyDivIndex;
        let columnIndex = getColumnIndex(lastEmptyIndex, cols);

        while (lastEmptyIndex >= columnIndex) {
            let emptyDiv = gridElements[lastEmptyIndex];
            let firstNotEmptyDivIndex = getFirstNotEmptyDivIndex(lastEmptyIndex - cols, columnIndex, gridElements, cols);

            if (firstNotEmptyDivIndex == NOT_FOUND_INDEX) {
                emptyDiv.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            } else {
                let notEmptyDiv = gridElements[firstNotEmptyDivIndex];
                emptyDiv.style.backgroundColor = notEmptyDiv.style.backgroundColor;
                notEmptyDiv.style.backgroundColor = "white";
            }

            lastEmptyIndex = getLastEmptyDivIndex(lastEmptyIndex - cols, columnIndex, gridElements, cols);
        }
    };

    const getLastEmptyDivIndex = (startIndex, columnIndex, gridElements, cols) => {
        for (let i = startIndex; i >= columnIndex; i -= cols) {
            if (gridElements[i].style.backgroundColor == "white") {
                return i;
            }
        }
        return NOT_FOUND_INDEX;
    };

    const getFirstNotEmptyDivIndex = (startIndex, columnIndex, gridElements, cols) => {
        for (let i = startIndex; i >= columnIndex; i -= cols) {
            if (gridElements[i].style.backgroundColor != "white") {
                return i;
            }
        }
        return NOT_FOUND_INDEX;
    };

    const getColumnIndex = (index, cols) => {
        return index % cols;
    }

});