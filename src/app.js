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
  text: 'Value = ' + val,
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
  console.log('Set value ' + val);
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
  show_status('GUT!');
  console.log('http://ourapi.com/setval?value=' + val);
});

wind.show();
