// khởi tạo mảng các giá trị về nhiệt độ
var a = {
    title: {
        text: 'Biểu đồ nhiệt độ',
    },
    xAxis: {
        categories: []
    },
    yAxis: {
        title: {
            text: 'Temperature (°C)'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    tooltip: {
        valueSuffix: '°C'
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    series: [{
        data: [
            
        ]
    }]
};


$(function () {
    //hàm chèn dữ liệu từ database realtime
    function updateTemp() {
        var dataRef = db.ref('/data/temperature');
        dataRef.on('value', function(snapshot) {
            // snapshot.forEach(function(childSnapshot) {
            var childData = snapshot.val();
            // });
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + "<br>"
                        + today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            a.xAxis.categories.push(time);
            if(a.series[0].data.length > 15) {
                a.series[0].data = a.series[0].data.shift();
            }
            a.series[0].data.push(childData);
            if(childData >= 35) {
                a.yAxis.plotLines[0].color = '#fd0000';
            }
            Highcharts.chart('chart1', a);
            a.yAxis.plotLines[0].color = '#808080';
        });
    }
    function work() {
        setTimeout(doSome(), 1000);
    }
    function doSome() {
        updateTemp();
    }
    work();
});
