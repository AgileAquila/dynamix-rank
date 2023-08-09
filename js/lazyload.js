export default function lazyLoad(imgSelector){

    const clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, scrollTop = document.documentElement.scrollTop;
  
    let imgsNodes = document.querySelectorAll(imgSelector);

    imgsNodes.forEach((v) => {
        if (
            v.offsetTop < clientHeight + scrollTop && v.offsetTop + v.offsetHeight > scrollTop
        ){
            setTimeout(() => {
                v.src = v.getAttribute("data-srcString");
            }, 800);
        }
    });
}