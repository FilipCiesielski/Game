document.addEventListener("DOMContentLoaded", ()=> {
    console.log("DOM IS READY GO FILIP!");

    const colors = [
        orange = "rgb(255,186,28)",
        blue = "rgb(101,124,255)",
        lightblue = "rgb(79,219,255)",
        violet = "rgb(125,98,163)",
        red = "rgb(255,140,80)"

    ];

    const divParent = document.querySelector(".parent");
    console.log(divParent.children);

    let divBox = divParent.children;

    divBox = Array.from(divBox);

    const checkBoxInfo =  (divName, divColor)=> {

        var classNumber = parseInt(divName.slice(3));


     if(classNumber>12){
         var up=classNumber- 12};
        if(classNumber<48){
            var down=classNumber+ 12};
        if(classNumber<60){
            var right1=classNumber+ 1};


        if(classNumber>2){
            var left=classNumber- 1};



        let upClassName = ".div" + up;
        let downClassName = ".div" + down;
        let rightClassName = ".div" + right;
        let leftClassName = ".div" + left;

        // console.log(upClassName);
        //
        // console.log(document.querySelector(leftClassName));

        let divUp=document.querySelector(upClassName);
        let divDown=document.querySelector(downClassName);
        let divRight=document.querySelector(rightClassName);
        let divLeft=document.querySelector(leftClassName);

//id divup up!==null {let let divUpColor=divUp.style.backgroundColor;
        if(divUp!==null){
            var divUpColor=divUp.style.backgroundColor;
        }
        if(divDown!==null){
            var divDownColor=divDown.style.backgroundColor;
        }
        if(divRight!==null){
            var divRightColor=divRight.style.backgroundColor;
        }
        if(divLeft!==null){
            var divLeftColor=divLeft.style.backgroundColor;
        }




if(divUpColor===divColor){
    divUp.style.backgroundColor="white"
   console.log()

}else if( divDownColor===divColor){
    divDown.style.backgroundColor="white"
}else if(divRightColor===divColor){
    divRight.style.backgroundColor="white"
}else if(divLeftColor===divColor){
    divLeft.style.backgroundColor="white"
}
        // console.log(divUp.style.backgroundColor);



    };

    divBox.map((e) => (
        e.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)],
            e.addEventListener("click", () =>
                checkBoxInfo(e.className, e.style.backgroundColor)
            )))


});