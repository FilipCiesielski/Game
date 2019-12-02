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
    //  let button=document.querySelector(".play");
    //  button.addEventListener("click",()=>{
    //      gridContainer.innerHTML="";
    //  let createRows=document.getElementById("createRows").value;
    // let createColumns = document.getElementById("createColumns").value;
    //  if(createColumns==="" && createRows==="") {
    //      alert( "podaj liczbę wierszy i kolumn")
    //
    //  }else if(createRows==="" ) {
    //
    //      alert("podaj liczbę wierszy")
    //  }else if (createColumns==="" ){
    //
    //    alert ("podaj liczbę kolumn")
    //  }
    //      makeGrid(createRows, createColumns);
    //
    //  })

    let createRows = 5
    let createColumns = 12

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
                    gridSingleElementInfo(el.style.backgroundColor, index, rowPositionSingle, false,null,null)
                }
            ))
    };

    makeGrid(createRows, createColumns);


    const gridSingleElementInfo = (divColor, index, rowPositionSingle, previousWhite,previousIndex,previousColumn) => {
        console.log(divColor, index);
        const rowPositionPrevious = Math.floor((index - 1) / createColumns);
        const rowPositionNext = Math.floor((index + 1) / createColumns);

        if (index > 0 && rowPositionSingle === rowPositionPrevious && divColor === gridContainer.children.item(`${index - 1}`).style.backgroundColor &&  index-1!=previousIndex) {
            if (!previousWhite) {
                gridContainer.children.item(index).style.backgroundColor = "white"
            }

            gridSingleElementInfo(divColor, index - 1, rowPositionSingle, true, index)

        }

        if (index < gridContainer.children.length - 1 && rowPositionSingle === rowPositionNext && divColor === gridContainer.children.item(`${index +1}`).style.backgroundColor   && index+1!=previousIndex) {
            if (!previousWhite) {
                gridContainer.children.item(index).style.backgroundColor = "white"
            }

            gridSingleElementInfo(divColor, index + 1, rowPositionSingle, true, index)
        }

        if (index >= createColumns && divColor === gridContainer.children.item(`${index-createColumns}`).style.backgroundColor   && index+1!=previousIndex && index-createColumns!=previousColumn) {
            if (!previousWhite) {
                gridContainer.children.item(index).style.backgroundColor = "white"
            }

            gridSingleElementInfo(divColor, index -createColumns, rowPositionSingle, true, index,index)
        }
        if (index < gridContainer.children.length - createColumns && divColor === gridContainer.children.item(`${index+createColumns}`).style.backgroundColor   && index+1!=previousIndex && index+createColumns!=previousColumn) {

            if (!previousWhite) {
                gridContainer.children.item(index).style.backgroundColor = "white"
            }

            gridSingleElementInfo(divColor, index +createColumns, rowPositionSingle, true, index,index)


        }

        if (previousWhite) {
            gridContainer.children.item(index).style.backgroundColor = "white"

        }
    }


});