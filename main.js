let $buttons = $('.buttons > button')
let $slides = $('.images')
let $images = $('.images > img') //代表四张图片
let current = 0

makeFakeSlides()
$slides.css({ transform:'translateX(-400px)'}) //初始位置
bindEvent()

function makeFakeSlides(){
    let $firstCopy = $images.eq(0).clone(true)   //代表第一张图片
    let $lastCopy = $images.eq($images.length-1).clone(true) //代表最后一张图片
    $slides.append($firstCopy)//将$firstCopy放到最后一个
    $slides.prepend($lastCopy)//将$lastCopy放到slides的第一个
}

function bindEvent(){
    $buttons.eq(0).on('click',function(){
        if(current === 3){
            console.log('说明从最后一张切到第一张')
            $slides.css({
                transform:'translateX(-2000px)'
            }).one('transitionend',function(){//当动画结束，将图片1返回到真正的位置
               $slides.hide().offset()//技巧，如果hide()再show()浏览器没有反应，就在中间加一个offset()
               $slides.css({transform:'translateX(-400px)'}).show()
            })
        }else{
            $slides.css({
                transform:'translateX(-400px)'
            })
        }
        current = 0
    })
    $buttons.eq(1).on('click',function(){
        $slides.css({
            transform:'translateX(-800px)'
        })
        current = 1
    })
    $buttons.eq(2).on('click',function(){
        $slides.css({
            transform:'translateX(-1200px)'
        })
        current =2
    })
    $buttons.eq(3).on('click',function(){
        if(current === 0)
        {
            console.log('说明从第一张切到最后一张')
            $slides.css({
                transform:'translateX(0px)'
            }).one('transitionend',function(){//当动画结束，将图片1返回到真正的位置
                $slides.hide().offset()//技巧，如果hide()再show()浏览器没有反应，就在中间加一个offset()
                $slides.css({transform:'translateX(-1600px)'}).show()
             })
        }else{
            $slides.css({
                transform:'translateX(-1600px)'
            }) 
        }
        current = 3
    })
}


