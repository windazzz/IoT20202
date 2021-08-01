$(document).ready(function() {
    setData();
    initEvent();
})
  

var s = localStorage.getItem('userControl');
function setData() {
    for(var i = 0; i <= s.length; i++) {
        if(s[i] == 1){
            var item = `<a class="item id-garden" cid="${i + 1}" href="../html/main.html">
                <div class="item-text">Khu vườn ${i + 1}</div>
            </a>`;
            $('#control').find('.content').append(item);
        }
    }
}

function initEvent() {
    $('a').click(function(){
        var indexOfGardenControl = $(this).attr('cid');
        localStorage.setItem('gardenControl', indexOfGardenControl);
    })
}