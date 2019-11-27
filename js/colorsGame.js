$(function () {

    const colors = [
        orange= "rgb(255,186,28)",
        blue= "rgb(101,124,255)",
        lightblue= "rgb(79,219,255)",
       violet= "rgb(125,98,163)",
        red= "rgb(255,140,80)"

    ];

    const divParent = $(".parent").find("div");
    console.log(divParent);
    console.log($(".div1"))


    console.log(colors[Math.floor(Math.random() * colors.length)])


    const checkBox = function (className, color) {

        let classNumber = parseInt(className.slice(3));

        let up = classNumber - 12;
        let down = classNumber + 12;
        let right = classNumber + 1;
        let left = classNumber - 1;

        let upClassName = "div" + up;
        let downClassName = "div" + down;
        let rightClassName = "div" + right;
        let leftClassName = "div" + left;

        console.log(upClassName)
    };


    divParent.each(function () {
        $(this).css({"background-color": `${colors[Math.floor(Math.random() * colors.length)]}`});
        $(this).on("click", function () {
            console.log($(this).attr("class"));
            console.log($(this).css("background-color"));
            checkBox($(this).attr("class"), $(this).css("background-color"))
        })

    })


});