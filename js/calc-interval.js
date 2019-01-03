function getTriadNum(triad) {
	var value = 0;
  if (triad == "大3度") {
		value = 4;
	} else if (triad == "小3度") {
		value = 3;
	}
	return value;
}

$(document).ready(function() {
  $("#calc").click(function() {
    var tr = getTriadNum($('#root option:selected').text());
    var t3 = getTriadNum($('#third option:selected').text());
    var t5 = getTriadNum($('#fifth option:selected').text());
    var t7 = getTriadNum($('#seventh option:selected').text());
    var t9 = getTriadNum($('#ninth option:selected').text());
    var t11 = getTriadNum($('#eleventh option:selected').text());
    var sum = tr + t3 + t5 + t7 + t9 + t11;
		
		var total = sum;
		var chord = 0;
		while (total > 12) {
			total = total - 12;
			chord = chord + 7;
		}
		var prefix = "";
		switch (total) {
			case 1:
			  prefix = "小";
				chord = chord + 2;
				break;
			case 2:
			  prefix = "大";
				chord = chord + 2;
				break;
			case 3:
			  prefix = "小";
				chord = chord + 3;
				break;
			case 4:
			  prefix = "大";
				chord = chord + 3;
				break;
			case 5:
			  prefix = "纯";
				chord = chord + 4;
				break;
			case 6:
			  prefix = "减";
				chord = chord + 5;
				break;
			case 7:
			  prefix = "纯";
				chord = chord + 5;
				break;
			case 8:
			  prefix = "小";
				chord = chord + 6;
				break;
			case 9:
			  prefix = "大";
				chord = chord + 6;
				break;
			case 10:
			  prefix = "小";
				chord = chord + 7;
				break;
			case 11:
			  prefix = "大";
				chord = chord + 7;
				break;
			case 12:
			  prefix = "纯";
				chord = chord + 8;
				break;
			default:
				prefix = "Error";
				break;
		}
    $("#result").val(prefix + chord + "度, " + sum);
  });
});
