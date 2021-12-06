/**
 * Form variable to perform operations on calc form.
 */
var form = "";


var frame_no = 1;
var throw_no = 1;

//var scores = new Array();
var results = [];//new Array();

/**
 * Function to return result for the operation performed on calc.
 */
function calc(op) {
 
  form = document.getElementById("bowling-calculator");
  
  if ( throw_no == 1 ) {
    results[frame_no] = [];
  } else if (throw_no == 2) {
    for( var j=0; j < 10; j++) {
      eval("form['e-" + j + "'].disabled=false");
      $('#e-'+j).removeClass("hidetd");
    }
    form['e-/'].disabled = false;
    $('#e-d').removeClass("hidetd");
  }
  
  if (op == "1" || op == "2" || op == "3" || op == "4" || op == "5" ||
      op == "6" || op == "7" || op == "8" || op == "9" || op == "0") {
	
	results[frame_no][throw_no] = parseInt(op);
	
	if ( throw_no == 1 ) {   
	    eval("form['input" + frame_no + "-1'].value = " + op);
	    throw_no++;
	    form['e-X'].disabled=true;
	    $('#e-X').addClass("hidetd");
	    
	    form['e-/'].disabled=false;
	    $('#e-d').removeClass("hidetd");
	    for(var k=parseInt(10-op); k < 10; k++) {
	      eval("form['e-" + k + "'].disabled=true");
	      $('#e-'+k).addClass("hidetd");
	    }
	  } else if (throw_no == 2) {
	    
	    results[frame_no]['status'] = 'no';
	    
	    	    
      	    eval("form['input" + frame_no + "-2'].value = " + op);
	    
	    if ( frame_no != 10) {
		//alert("normal");
		calculate_frame_result(parseInt(results[frame_no][throw_no] + results[frame_no][throw_no-1]));
		throw_no--;
		frame_no++;
		form['e-/'].disabled=true;
		$('#e-d').addClass("hidetd");
		form['e-X'].disabled=false;
		$('#e-X').removeClass("hidetd");
	    } else {
	      if (results[frame_no]['1'] != 10) {
		calculate_frame_result(parseInt(parseInt(results[frame_no][throw_no]) + parseInt(results[frame_no][throw_no-1])));
		end_game();
	      } else {
		throw_no++;
	      }
	    }
	  } else {
	    //kolmas heitto
	    eval("form['input" + frame_no + "-3'].value = " + op);
	    //alert("kolme");
	    //alert(throw_no);
	    //eval("alert('heitto3='" + throw_no + ", 'frame='" + frame_no + ")");

	    calculate_frame_result(parseInt(parseInt(results[frame_no][throw_no]) + parseInt(results[frame_no][throw_no-1]) + parseInt(results[frame_no][throw_no-2])));
	    if (frame_no == 10) {
	      end_game();
	    } else {
	      throw_no = 1;
	      frame_no++;
	      for(var k=1; k < 10; k++) {
		  eval("form['e-" + k + "'].disabled=false");
		  $('#e-'+k).removeClass("hidetd");
		  form['e-X'].disabled=false;
		  $('#e-X').removeClass("hidetd");
		  form['e-/'].disabled=true;
		  $('#e-d').addClass("hidetd");
	      }
	    }
	  }
   // alert("loppu");
   // alert(throw_no);
    return;
  }
  
  if (op == "X") {

    if (frame_no == 10) {

      results[frame_no][throw_no] = '10';

      switch (throw_no) {
	case 1:
          eval("form['input" + frame_no + "-1'].value = 'X'");
	  break;
	case 2:
          eval("form['input" + frame_no + "-2'].value = 'X'");
	  form['e-/'].disabled=true;
	  $('#e-d').addClass("hidetd");
	  break;
	case 3:
          eval("form['input" + frame_no + "-3'].value = 'X'");
	  calculate_frame_result(parseInt(parseInt(results[frame_no]['1'])+parseInt(results[frame_no]['2'])+parseInt(results[frame_no]['3'])));
	  end_game();
	  break;
      }
      throw_no++;
    } else {
      results[frame_no]['status'] = 'X';
      results[frame_no][throw_no] = '10';
      results[frame_no][throw_no+1] = '';
      calculate_frame_result(parseInt(10));
      eval("form['input" + frame_no + "-1'].value = ''");
      eval("form['input" + frame_no + "-2'].value = 'X'");
  
      frame_no++;
      form['e-/'].disabled=true;
      $('#e-d').addClass("hidetd");
    }	
	
    return;
  }
  
  if (op == "/") {
	
    if (frame_no == 10) {
    
      results[frame_no][throw_no] = parseInt(10 - parseInt(results[frame_no][throw_no-1]));
    
      switch (throw_no) {
	case 2:
          eval("form['input" + frame_no + "-2'].value = '/'");
	  form['e-X'].disabled=false;
	  $('#e-X').removeClass("hidetd");
	  form['e-/'].disabled=true;
	  $('#e-d').addClass("hidetd");
	  throw_no++;
	  break;
	case 3:
          eval("form['input" + frame_no + "-3'].value = '/'");
	  calculate_frame_result(parseInt(parseInt(results[frame_no]['1']) +
					  parseInt(results[frame_no]['2']) +
					  parseInt(results[frame_no]['3'])));
	  end_game();
	  break;
      }
    } else {
	results[frame_no]['status'] = '/';
	results[frame_no][throw_no] = parseInt(10 - results[frame_no][throw_no-1]);
	calculate_frame_result(parseInt(10));
	eval("form['input" + frame_no + "-2'].value = '/'");
	
	frame_no++;
	throw_no--;
	form['e-X'].disabled=false;
	$('#e-X').removeClass("hidetd");
	form['e-/'].disabled=true;
	$('#e-d').addClass("hidetd");
    }
	
    return;
  }
  
  if (op == "new") {
    for (var i=1; i <= 10; i++) {
      eval("form['input" + i + "-1'].value = ''");
      eval("form['input" + i + "-2'].value = ''");
      eval("form['input" + i + "-res'].value = ''");
      results.length = 0;
    }
      eval("form['input10-3'].value = ''");
      form['bowl_result'].value = '';
      frame_no = 1;
      throw_no = 1;
      for( var j=0; j < 10; j++) {
	eval("form['e-" + j + "'].disabled=false");
	$('#e-'+j).removeClass("hidetd");
      }
      form['e-X'].disabled = false;
      $('#e-X').removeClass("hidetd");
      form['e-/'].disabled = true;
      $('#e-d').addClass("hidetd");
  }
}

function calculate_frame_result(frame_res) {

  switch (frame_no) {
    case 1:
      results[frame_no]['result'] = frame_res;
      break;
    case 2:
      if ( results[frame_no-1]['status'] == 'X' ) {
	results[frame_no-1]['result'] = parseInt(results[frame_no-1]['result']) + frame_res;
      } else if (results[frame_no-1]['status'] == '/') {
	results[frame_no-1]['result'] = parseInt(results[frame_no-1]['result']) + parseInt(results[frame_no]['1']);
      }
      results[frame_no]['result'] = parseInt(results[frame_no-1]['result'] + frame_res);
      break;
    default:
      if ( results[frame_no-1]['status'] == 'X' ) {
	if ( results[frame_no-2]['status'] == 'X' ) {
	  results[frame_no-2]['result'] = parseInt(results[frame_no-2]['result']) + parseInt(results[frame_no]['1']);
	  results[frame_no-1]['result'] = parseInt(results[frame_no-1]['result']) + parseInt(results[frame_no]['1']);
	} 
	results[frame_no-1]['result'] = parseInt(results[frame_no-1]['result']) +
					parseInt(results[frame_no]['1']) +
					(results[frame_no]['2'] == '' ? parseInt(0) : parseInt(results[frame_no]['2']));
      } else if (results[frame_no-1]['status'] == '/') {
	results[frame_no-1]['result'] = parseInt(results[frame_no-1]['result']) + parseInt(results[frame_no]['1']);
      }
      results[frame_no]['result'] = parseInt(results[frame_no-1]['result'] + frame_res);
      break;
  }
  update_frame_result();
  return;
}

function update_frame_result() {
  
  switch (frame_no) {
    case 1:
      eval("form['input" + frame_no + "-res'].value = " + results[frame_no]['result']);
      break;
    case 2:
      eval("form['input" + parseInt(frame_no-1) + "-res'].value = " + results[frame_no-1]['result']);
      eval("form['input" + frame_no + "-res'].value = " + results[frame_no]['result']);
      break;
    default:
      eval("form['input" + parseInt(frame_no-2) + "-res'].value = " + results[frame_no-2]['result']);
      eval("form['input" + parseInt(frame_no-1) + "-res'].value = " + results[frame_no-1]['result']);
      eval("form['input" + frame_no + "-res'].value = " + results[frame_no]['result']);
      break;
  }
  eval("form['bowl_result'].value = " + results[frame_no]['result']);
  return;
}

function end_game() {
  for(var i=0; i<10; i++) {
    eval("form['e-" + i + "'].disabled = true");
  }
  form['e-/'].disabled = true;
  form['e-X'].disabled = true;

}