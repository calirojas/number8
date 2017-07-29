/*
	Number8 Calendar
	Cali Rojas <juancarlosr@msn.com>
	LinkedIn: https://www.linkedin.com/in/cali-rojas-17403334/
*/

$(function(){
	var $startDate 			= $('#startDate'),
		$endDate			= $('#endDate'),
		$numberOfDays 		= $('#numberOfDays'),
		$countryCode 		= $('#countryCode'),
		componentSelector 	= '.c-calendar';

	$.numberEightCalendar = {
		setLastDate: function(){
			var lastDate = $startDate.datepicker('getDate');

			lastDate.setDate(lastDate.getDate() + parseInt($numberOfDays.val()));
			$endDate.datepicker('setDate', lastDate);
		},
		monthsToShow: function(){
			var startDate 	= new Date($startDate.val()),
				endDate		= new Date($endDate.val()),
				months 		= (endDate.getFullYear() - startDate.getFullYear()) * 12;

				months -= startDate.getMonth() + 1;
				months += endDate.getMonth() + 1;

				return months <= 0 ? 1 : months + 1;
		}
	};

	$startDate.add($endDate).datepicker({
		onSelect: function(){
			if($(this).attr('id') == 'startDate'){
				$.numberEightCalendar.setLastDate();
			}
		}
	});

	$numberOfDays.on('change keyup', function(){
		$.numberEightCalendar.setLastDate();
	});
});
