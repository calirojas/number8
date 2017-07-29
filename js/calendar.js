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
