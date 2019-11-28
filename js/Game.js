document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM IS READY GO FILIP!");


    const container = document.querySelector("#container");
    const colors = [
        orange = "rgb(255,186,28)",
        blue = "rgb(101,124,255)",
        lightblue = "rgb(79,219,255)",
        violet = "rgb(125,98,163)",
        red = "rgb(255,140,80)"

    ];


     function makeRows(rows, cols) {
        container.style.setProperty('--grid-rows', rows);
        container.style.setProperty('--grid-cols', cols);
        for (el = 0; el < (rows * cols); el++) {
            let cell = document.createElement("div");
            cell.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            let gridElementClass = (el + 1);
            container.appendChild(cell).className = `div${gridElementClass}`;

        };

         let gridElements=document.getElementById("container").children;
         Array.from(gridElements).map((el)=>
             el.addEventListener("click", () =>
             gridElementInfo(el.className,el.style.backgroundColor)
         ))
     };

    makeRows(5, 12);


    const gridElementInfo=(divName,divColor)=>{

var divClassName=parseInt(divName.slice(3));

        function check() {
            var up = divClassName+12;
            var up12 = document.querySelector(".div" + `${up}`);
            console.log(up)
            var color12 = up12.style.backgroundColor;
            if (divColor === color12) {
                console.log("ok");

            }
        }

check()

        };














});