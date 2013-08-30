(function(){

  var $rain_canvas = $('#rain-canvas');

  var canvas_width  = $(window).width();
  var canvas_height = $(window).height();


  var CONFIG = {
      mark_number: 1,
      marker_width: 175,
      animation_speed: 100
    }

  // This makes it explode using CSS transitions
  // You have to give it the delay otherwise it doesn't know that it's transitioning to anything
  var popMarker = function(mark_number){
    $('#marker_' + mark_number).addClass('expand-marker')
  };


  var addMarker = function(mark_number){
    var starting_x = getRandom(0, canvas_width);
    var end_y      = getRandom(canvas_height, canvas_height + 20);
    var hex        = Math.floor(Math.random()*16777215).toString(16);

    var circle = '<div id="marker_'+mark_number+'" style="top:-50px;left:'+starting_x+'px;color:#'+hex+'" class="marker">:(</div>';
    $rain_canvas.append(circle);

    $('#marker_' + mark_number).bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
      $(this).remove();
    });

    var speedA = 1150,
        speedB = speedA * 1.47
    // console.log(end_y)
    _.delay(popMarker, speedA, mark_number)
    $('#marker_'+mark_number).animate({
      'top': end_y + 'px'
    }, speedB, 'easeInSine', function() {
        // popMarker(mark_number)
    });
  };

  function playTimer(){
    window.time_var = setInterval(function(){
      CONFIG.mark_number++;
      addMarker(CONFIG.mark_number);
    }, CONFIG.animation_speed);
  };

  function stopTimer(){
    var end_int = clearInterval(time_var);
  };

  $(document).click(function(){
      playTimer();
  })



  function getRandom (min, max) {
    return Math.random() * (max - min) + min;
  }

  $('#rain-btn').click(function(){
    $(this).effect( "explode", {pieces: 16}, 350 );
    playTimer();
  });

}).call(this);