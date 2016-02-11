var intervalID;
var t = $('#minutes').text()*60*1000 + $('#seconds').text()*1000; // keeps the remaining time
var seconds = $('#seconds').text();
var minutes = $('#minutes').text();

var workTime = +($('#workTime').text());
var breakTime = +($('#breakTime').text());

var isWorkTime = true;

// clock is continuous, 2 states: work and break

var isRunning = false;

// functions
// show the time
function showClock(){
  $('#minutes').text(('0' + minutes).slice(-2));
  $('#seconds').text(('0' + seconds).slice(-2));
}

// starts the clock
function iniTime(){
  isRunning = true;
  t = t - 1000;
  seconds = Math.floor((t/1000) % 60);
  minutes = Math.floor((t/1000/60) % 60);

  $('#minutes').text(('0' + minutes).slice(-2));
  $('#seconds').text(('0' + seconds).slice(-2));


  if (t <= 0) {
    if (isWorkTime) {
      t = breakTime*60*1000;
      isWorkTime = false;
      $('#time').removeClass('orange').addClass('olive');
    } else {
      t = workTime*60*1000;
      isWorkTime = true;
      $('#time').removeClass('olive').addClass('orange');
    }
  }
};

// buttons
$('#start').on('click', function(){
  t = $('#minutes').text()*60*1000 + $('#seconds').text()*1000;
  intervalID = setInterval(iniTime, 1000);
  $('#start').hide();
  $('#stop').show();
});

$('#stop').on('click', function(){
  clearInterval(intervalID);
  isRunning = false;
  $('#stop').hide();
  $('#start').show();
});

function stopTime(newTime) {
  clearInterval(intervalID);
  isRunning = false;
  $('#stop').hide();
  $('#start').show();
  minutes = newTime;
  seconds = 0;
  showClock();
}
// increase work time
$('#morepomo').on('click', function(){
  $('#workTime').text(workTime + 1);
  workTime += 1;
  stopTime(workTime);
});
$('#lesspomo').on('click', function(){
  if (workTime > 1) {
    $('#workTime').text(workTime - 1);
    workTime -= 1;
    stopTime(workTime);
  };

});
$('#morebreak').on('click', function(){
  $('#breakTime').text(breakTime + 1);
  breakTime += 1;
  if (!isWorkTime) {stopTime(breakTime)};
});
$('#lessbreak').on('click', function(){
  if (breakTime > 1) {
    $('#breakTime').text(breakTime - 1);
    breakTime -= 1;
    if (!isWorkTime) {stopTime(breakTime)};
  };
});

showClock();
