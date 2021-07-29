$(document).ready(function() {
    setData();
})

function setData() {
    for(var i = 0; i <= 1; i++) {
        var item = `<a class="item" cid="${i}" href="../html/main.html">
            <div class="item-text">Khu vườn ${i}</div>
        </a>`;
        $('#control').find('.content').append(item);
    }
}