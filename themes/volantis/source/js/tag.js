// 多才标签云
function colortag(){
    $("ul.tag-list li").each(function(){
        let random = Math.floor(Math.random()*5+1);
        if(random == 2){
            $(this).find('a').addClass('tagred');
        } else if ( random == 3 ){
            $(this).find('a').addClass('tagyellow');
        } else if ( random == 4 ){
            $(this).find('a').addClass('tagblue');
        } else if ( random == 5 ){
            $(this).find('a').addClass('taggreen');
        } else if ( random == 2 ){
            $(this).find('a').addClass('tagpurple');
        } else if ( random == 1 ){
            $(this).find('a').addClass('taggrown');
        }

    });}

colortag();