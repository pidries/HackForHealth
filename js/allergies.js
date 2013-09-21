$(document).ready(function () {
    $(".navbar-right").click(function () {
        console.log(('.toggle'));
        $('.toggle').slideToggle();
    });

    function getAllergies() {
        var $allergies = $("#allergies tbody");
        $allergies.empty();
        $.getJSON('http://medicinecabinets.apiary.io/v1/cabinets/1/familymembers/1/allergies/', function (data) {
            var allergies = data.allergies;
            for (var i = 0; i < allergies.length; i++) {
                var allergy = allergies[i];
                print = '<tr>';
                print += '  <td>' + allergy.name + '</td>';
                print += '  <td>';
                print += '    <button onclick="toggleIcon(this)" type="button" class="btn btn-default btn-sm">';
                print += '      <span class="glyphicon ' + (allergy.selected ? 'glyphicon-ok' : 'glyphicon-remove') + '"></span>';
                print += '    </button>';
                print += '  </td>';
                print += '</tr>';

                $allergies.append(print);
            }
        })
        .done(function (data) {
        })
        .complete(function (data) {
        });
    }

    getAllergies();
});

function toggleIcon(obj) {
    $(obj).find(".glyphicon").toggleClass("glyphicon-ok");
    $(obj).find(".glyphicon").toggleClass("glyphicon-remove");
}