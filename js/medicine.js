$(document).ready(function() {
    $(".navbar-right").click(function() {
        console.log(('.toggle'));
        $('.toggle').slideToggle();
    });
});

function getAllMedicines() {
    $.getJSON('http://medicinecabinets.apiary.io/v1/cabinets/1/medicines', function(data) {
        for (var i = 0; i < data.medicines.length; i++) {
            print = "<h3 style='overflow: hidden'>" + data.medicines[i].name + "<span style='float: right'><button type='button' class='btn btn-default btn-sm'> <span class='glyphicon glyphicon-star'></span></button>" +
                "<button type='button' class='btn btn-default btn-sm'> <span class='glyphicon glyphicon-plus'></span></button></span>" + "</h3>" +
                "<div id='" + data.medicines[i].name + "'>" +
                "<p>" + data.medicines[i].usage + ", " + data.medicines[i].packaging.amount + " tablets left" + "</p>" +
                "<p>" + "In use by: " + data.medicines[i].familyMembers[0].name + "</p></div>";

            $('#accordion').append(print);
        }
    })
        .done(function(data) {
        })
        .complete(function(data) {
            $("#accordion").accordion();
        });
}

getAllMedicines();