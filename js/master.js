$(function () {
    $.fn.outerHTML = function() {
      return $(this).clone().wrap('<div></div>').parent().html();
    };

    $.fn.reverse = function() {
        return this.pushStack(this.get().reverse(), arguments);
    };

    animateAllList = function(checked, item) {
        var listHeight = $(".assignments").innerHeight();
        var liHeight = item.outerHeight();
        var liTop = checked ? item.position().top : ((listHeight - item.position().top) - liHeight);
        var moveUp = listHeight - (listHeight - liTop);
        var moveDown = liHeight;
        var id = item.attr("data-id");

        var enough = false;
        var speed = 500;
        var html = item.outerHTML();

        var lis = checked ? $(".assignments li") : $(".assignments li").reverse();
        lis.each(function() {
            if ($(this).attr("data-id") == id) return false;
            $(this).animate({"top": (checked ? '+=' : '-=') + moveDown}, speed);
        });

        item.animate({"top": (checked ? '-=' : '+=') + moveUp}, speed, function() {
            item.remove();
            var oldHtml = $(".assignments").html();
            if (checked) $(".assignments").html(html + oldHtml);
            else $(".assignments").html(oldHtml + html);
            $(".assignments li").attr("style", "");

        });
    }

    animateSingleList = function(checked, item) {
        item.fadeOut(500, function() {
            if (checked) {
                item.prependTo($(".assignments"));
            } else {
                item.appendTo($(".assignments"));
            }
         });
    }

    function getFamMembers(){
        $placeholder = $('#placeholder');
        // var dataSet = cultuur;
        $.getJSON('http://medicinecabinets.apiary.io/v1/cabinets/1/familymembers/?callback=foo', function(data) {
            print = "id: " + (data);
            console.log('loading'+ data[0].familyMemberId)
        })
        .done(function(data) {
            console.log( "second success" );

         })
        .complete(function(data) {
            console.log( "done" );

         });
    }
    getFamMembers();
    // Clicking on the assignment row in order to assign
    $(document).on("click", ".assignments li", function () {
        if ($(":animated").length > 0) return false;

        var $li = $(this);
        var checked = $li.attr("data-checked") == "false";
/*
        if (checked) {
        	var request = $.ajax({
                url: 'http://medicinecabinets.apiary.io/v1/medicines/1/assignments?patientId=1002840&questionnaireId='+$li.attr("data-id"),
                async: false,
                type: "POST"
            }).done(function ( data ) {
   			  $li.attr("data-assignment-id", data.data);
			});
        } else {
        	var request = $.ajax({
                url: 'http://medicinecabinets.apiary.io/v1/medicines/1/assignments?assignmentId='+$li.attr("data-assignment-id"),
                type: "DELETE"
            });
        }*/

        $(this).attr("data-checked", checked ? "true" : "false");

        var type = $(".assignment-filter li.active a:first").attr("data-type");
        if (type == "open") animateSingleList(checked, $li);
        else if (type == "linked") animateSingleList(checked, $li);
        else animateAllList(checked, $li);
    });

    $(document).on("click", ".jumbotron .device", function () {
        $(".devices").slideDown(500);
    });

    $(document).on("click", ".devices .device", function() {
        $(".jumbotron .device").replaceWith($(this).clone());
        $(".devices").slideUp(500);
    });

    // Selecting one of the assignment filter tabs
    $('.assignment-filter a').on("click", function (event) {
        event.preventDefault();

        $(this).tab('show');

        if ($(this).data("type") == "linked") {
            $(".assignments li[data-checked=true]").css("display", "");
            $(".assignments li[data-checked=false]").css("display", "none");
        } else if ($(this).data("type") == "open") {
            $(".assignments li[data-checked=false]").css("display", "");
            $(".assignments li[data-checked=true]").css("display", "none");
        } else {
            $(".assignments li").css("display", "");
        }
    });

    // jQuery effect to hide the patient information on page load. Show this information on profile click.
    jQuery(document).ready(function() {
        $(".navbar-right").click(function() {
            console.log(('.toggle'));
            $('.toggle').slideToggle();
        });
    });

});

$(document).ready(function() {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        },
        editable: true,
        events: [
            {
                title: 'All Day Event',
                start: new Date(y, m, 1)
            },
            {
                title: 'Long Event',
                start: new Date(y, m, d-5),
                end: new Date(y, m, d-2)
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d-3, 16, 0),
                allDay: false
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d+4, 16, 0),
                allDay: false
            },
            {
                title: 'Meeting',
                start: new Date(y, m, d, 10, 30),
                allDay: false
            },
            {
                title: 'Lunch',
                start: new Date(y, m, d, 12, 0),
                end: new Date(y, m, d, 14, 0),
                allDay: false
            },
            {
                title: 'Birthday Party',
                start: new Date(y, m, d+1, 19, 0),
                end: new Date(y, m, d+1, 22, 30),
                allDay: false
            },
            {
                title: 'Click for Google',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                url: 'http://google.com/'
            }
        ]
    });

});
