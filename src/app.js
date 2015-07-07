var ajax = require('ajax');
var UI = require('ui');
var Vector2 = require('vector2');
var Vibe = require('ui/vibe');

var val = 5;

var wind = new UI.Window({
  fullscreen: true,
  backgroundColor: 'white',
  action: {
    up: 'images/Icon Plus.png',
    down: 'images/Icon Minus.png',
    select: 'images/Icon Check.png'
  }  
});

var val_field = new UI.Text({
  position: new Vector2(0, 65),
  size: new Vector2(114, 30),
  font: 'gothic-28-bold',
  text: '???',
  textAlign: 'center',
  color: 'black',
});

var stat_field = new UI.Text({
  position: new Vector2(0, 140),
  size: new Vector2(114, 30),
  font: 'gothic-14-bold',
  text: 'Status',
  textAlign: 'center',
  color: 'white',  
});

wind.add(val_field);
wind.add(stat_field);

function on_click(e) {
  if(e.button == 'up') {
    if(val < 10) {
      val += 1;
    } else {
      Vibe.vibrate('short');
    }
  } else {
    if(val > 0) {
      val -= 1;
    } else {
      Vibe.vibrate('short');
    }
  }
  val_field.text('Value = ' + val);    
  console.log('Value = ' + val);
}

function show_status(stat_text) {
  stat_field.text(stat_text);
  stat_field.color('black');
  setTimeout(function () {
    stat_field.color('white');
  }, 1000);
}

wind.on('click', 'up', on_click);
wind.on('click', 'down', on_click);
wind.on('click', 'select', function(e) {
  ajax({
      'url': 'http://cleg.pagekite.me/api',
      'method': 'post',
      'type': 'json',
      'data': {'num': val}
    },
    function(data, status, request) {
      console.log('It\'s OK, server said: ' + JSON.stringify(data));
      show_status('GUT !');
    },
    function(error, status, request) {
      console.log('The ajax request failed: ' + error);
      show_status('FAIL :(');
    }
  );
  console.log('Tried to set value=' + val);
});

ajax(
  {
    url: 'http://cleg.pagekite.me/api',
    type: 'json'
  },
  function(data, status, request) {
    val = data.val;
    val_field.text('Value = ' + val);
  },
  function(error, status, request) {
    console.log('The ajax request failed: ' + error);
  }
);

wind.show();
