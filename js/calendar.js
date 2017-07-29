/*
	Number8 Calendar
	Cali Rojas <juancarlosr@msn.com>
	LinkedIn: https://www.linkedin.com/in/cali-rojas-17403334/
*/

$(function(){
//cache + variables
	var $startDate 			= $('#startDate'),
		$endDate			= $('#endDate'),
		$numberOfDays 		= $('#numberOfDays'),
		$countryCode 		= $('#countryCode'),
		componentSelector 	= '.c-calendar',
		HOLIDAYS_API		= {
			URL: 	'https://holidayapi.com/v1/holidays',
			KEY: 	'64957f90-49fd-4fdd-a81d-08d23ea8d372'
		};

//main object
	$.numberEightCalendar = {

	//start date + number of days
		setLastDate: function(){
			var lastDate = $startDate.datepicker('getDate');

			lastDate.setDate(lastDate.getDate() + parseInt($numberOfDays.val()));
			$endDate.datepicker('setDate', lastDate);
		},
	//number of months to be displayed
		monthsToShow: function(){
			var startDate 	= new Date($startDate.val()),
				endDate		= new Date($endDate.val()),
				months 		= (endDate.getFullYear() - startDate.getFullYear()) * 12;

				months -= startDate.getMonth() + 1;
				months += endDate.getMonth() + 1;

				return months <= 0 ? 1 : months + 2;
		},
	//generate the calendar
		createCalendar: function(){
			var $selector = $(componentSelector);

			if(parseInt($numberOfDays.val()) >= 0){
			//add the months (1 to monthsToShow)
				$selector.datepicker('destroy').datepicker({
					minDate				: $.datepicker.parseDate($.datepicker._defaults.dateFormat, $startDate.val()),
					maxDate				: $.datepicker.parseDate($.datepicker._defaults.dateFormat, $endDate.val()),
					dayNamesMin			: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
					numberOfMonths		: [parseInt($.numberEightCalendar.monthsToShow()), 1],
					hideIfNoPrevNext	: true
				});

			//remove unused rows from each month
				$selector.find('table.ui-datepicker-calendar tr').each(function(){
					var $this = $(this);

					if($this.find('td.ui-state-disabled').length == 7){
						$this.remove();
					}
				});

			//remove possible empty months
				$(componentSelector + ' .ui-datepicker-group').each(function(){
					var $this = $(this);

					if($this.find('table.ui-datepicker-calendar tbody tr').length == 0){
						$this.closest('.ui-datepicker-row-break').remove().end().remove();
					}
				});
			}
		},
	//get holidays using provided api
		getHolidays: function(theYear){
			$.ajax({
				url		: HOLIDAYS_API.URL,
				data: {
					key		: HOLIDAYS_API.KEY,
					country	:	$countryCode.val() || 'US',
					year	: theYear
				},
				dataType: 'json',
				success	: function(data){
					console.log(data);
				}
			});
		}
	};

//datepicker for date selectors on view
	$startDate.add($endDate).datepicker({
		onSelect: function(){
			if($(this).attr('id') == 'startDate'){
				$.numberEightCalendar.setLastDate();
			}

			$.numberEightCalendar.createCalendar();
		}
	});

//react to number of days change
	$numberOfDays.on('change keyup mouseup', function(){
		$.numberEightCalendar.setLastDate();
		$.numberEightCalendar.createCalendar();
	});

	return {
		init: $.numberEightCalendar.createCalendar()
	};
}).init();
