
window.$(document).ready(function() {

    /* scroll */



    /* timer */

    function update() {
        var Now = new Date(),
            Finish = new Date();
        Finish.setHours(23);
        Finish.setMinutes(59);
        Finish.setSeconds(59);
        if (Now.getHours() === 23 && Now.getMinutes() === 59 && Now.getSeconds === 59) {
            Finish.setDate(Finish.getDate() + 1);
        }
        var sec = Math.floor((Finish.getTime() - Now.getTime()) / 1000);
        var hrs = Math.floor(sec / 3600);
        sec -= hrs * 3600;
        var min = Math.floor(sec / 60);
        sec -= min * 60;
        $(".timer .hours").html(pad(hrs));
        $(".timer .minutes").html(pad(min));
        $(".timer .seconds").html(pad(sec));
        setTimeout(update, 200);
    }

    function pad(s) {
        s = ("00" + s).substr(-2);
        return "<span>" + s[0] + "</span><span>" + s[1] + "</span>";
    }
    update();

    /* validate form */

    $(".order_form").submit(function(e) {
			sendForm(e);
      // e.preventDefault();
			if ($(this).find("input[name='name']").val() == "" && $(this).find("input[name='phone']").val() == "") {
				alert("Введите Ваши имя и телефон");
				$(this).find("input[name='name']").focus();
				return false;
			} else if ($(this).find("input[name='name']").val() == "") {
				alert("Введите Ваше имя");
				$(this).find("input[name='name']").focus();
				return false;
			} else if ($(this).find("input[name='phone']").val() == "") {
				alert("Введите Ваш телефон");
				$(this).find("input[name='phone']").focus();
				return false;
			}
			return true;
    });

	function sendForm(data) {
		console.log(data);
		return fetch('http://localhost:3000/api/data')
			.then(response => response.json())
			.then(data => {
				// do something with the data received from the server
				console.log(data);
			})
			.catch(error => console.error(error));
	};

// SLIDER START
$('.carousel').slick({
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
});


$('.carousel-1').slick({
    autoplay: false,
    autoplaySpeed: 2000,
    arrows: false,
});
// SLIDER END
 

});



    
  
  



