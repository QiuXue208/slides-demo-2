let $buttons = $('#buttons > button')
let $slides = $('.images')
let $images = $('.images > img') //代表四张图片
let current = 0

/*复制第一张和最后一张图片，并加到原滚动条上 */
makeFakeSlides()
/*初始化*/ 
$slides.css({ transform:'translateX(-400px)'})
/*点击按钮以滚动到某张图片*/
bindEvent()
/*获取上一张和下一张图片*/
addPreviousAndNext()
/**做自动轮播 */
autoPlay()


function makeFakeSlides(){
    let $firstCopy = $images.eq(0).clone(true)   //代表第一张图片
    let $lastCopy = $images.eq($images.length-1).clone(true) //代表最后一张图片
    $slides.append($firstCopy)//将$firstCopy放到最后一个
    $slides.prepend($lastCopy)//将$lastCopy放到slides的第一个
}
function bindEvent(){
    $('.buttons').on('click','button',function(e){
        let $button = $(e.currentTarget)
        let index = $button.index()
        goToSlide(index)
    })     
}
/**滚动到某一张图片 */
function goToSlide(index){
    if(index > $images.length - 1){
        index = 0
    }
    if(index < 0){
        index = $images.length - 1
    }
    if(current === $images.length-1 && index === 0){
        //从最后一张切到第一张
        $slides.css({
            transform:'translateX(-2000px)'
        })
       .one('transitionend',function(){//当动画结束，将图片1返回到真正的位置
           $slides.hide().offset()//技巧，如果hide()再show()浏览器没有反应，就在中间加一个offset()
           $slides.css({transform:`translateX(${-(index + 1)*400}px)`}).show()
        })
    }else if(current === 0 && index ===$images.length-1 ){
        //从第一张切到最后一张
        $slides.css({
            transform:'translateX(0px)'
        })
        .one('transitionend',function(){
            $slides.hide().offset()
            $slides.css({transform:'translateX(-1600px)'}).show()
         })
    }else{
        $slides.css({transform:`translateX(${-(index+1)*400}px)`})
    }
    current = index       
}
function addPreviousAndNext(){
    $(previous).on('click',function(){
        goToSlide(current - 1)
    })
    $(next).on('click',function(){
        goToSlide(current + 1)
    })
}
function autoPlay(){
    let timerId = setInterval(function(){
        goToSlide(current + 1)
    },2000)
 $(container).on('mouseenter',function(){
     clearInterval(timerId)
 })   
 $(container).on('mouseleave',function(){
     timerId = setInterval(function(){
         goToSlide(current + 1)
     },2000)
 })
}