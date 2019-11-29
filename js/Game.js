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


    function makeGrid(rows, cols) {
        gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
         gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        for (el = 0; el < (rows * cols); el++) {
            let cell = document.createElement("div");
            cell.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            const colCount = cols;
            const rowPositionClass = Math.floor([el] / colCount);
            const colPositionClass = [el] % colCount;
            gridContainer.appendChild(cell).className=`${rowPositionClass+1}/${colPositionClass+1}`;
        };

        let gridElements = document.getElementById("container").children;
        Array.from(gridElements).map((el, index) =>
            el.addEventListener("click", () => {
                    console.log(gridSingleElementPosition(index)),
                    gridSingleElementInfo(el.style.backgroundColor,el.className)
                }
            ))
    };

    makeGrid(5, 12);


    const gridSingleElementPosition = (index) => {
        const colCount = gridContainer.style.gridTemplateColumns.split(" ").length;
        const rowPosition = Math.floor(index / colCount);
        const colPosition = index % colCount;
             return {row: rowPosition, column: colPosition};
    };


const gridSingleElementInfo=(divColor,divPosition)=>{
    console.log(divColor,divPosition);
let check=()=> {
    document.getElementsByClassName(divPosition)
    const mydiv=document.getElementsByClassName(divPosition)
    console.log(mydiv[0])
}
// const mydiv=document.getElementsByClassName(divPosition)
//     console.log(mydiv[0])



};


});