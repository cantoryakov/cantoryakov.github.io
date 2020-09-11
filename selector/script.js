/*
  Random Name Seletor JS

  Author : John Mclear
  Editors : Mark Fisher

*/

var text;
// Add names to namesbox
function loadData(){
  // re-enable go button
  $('#go').removeAttr('disabled');
  var namesupdated = "";
  if(gup('names') != ""){
    var names = gup('names');
    namesupdated = names.replace(/101/g,'\n');
    namesupdated = namesupdated.replace(/%20/g,' ');
  } else {
    names = returnNames();
    for(var i in names){
      name = names[i];
      if (name != "" && typeof(name) != undefined){
        if (namesupdated == "") namesupdated = name;
        else namesupdated = namesupdated + "\n" + name;
      }
    }
  }
  $("#namesbox").val(namesupdated);
}

// Turns text to speech
/*
function tts(text){
  $('#playback').show('slow');
  cleantext = text.replace(/[^a-zA-Z 0-9]+/g,'');
  $.ajaxSetup ({
    cache: false
  });
  var ajax_load = "<img src='/loading.gif' alt='loading...' />";
  var loadUrl = "tts.php";
  $("#playback").html(ajax_load).load(loadUrl, "string="+cleantext)
}
*/

// shows the help box
function help(){
  $('#logo').animate({"height":"40px"});
  $('#camel').hide();
  $("#popdown").show();
  $("#values").hide();
  $("#saveload").hide();
  $("#names").hide();
  $("#help").show();
}

function gup(para){
  para = para.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+para+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if(results == null) return "";
  else return results[1];
}

// shorten bitly urls
function bitly(url){
  // set up default options
  var defaults = {
    version:    '2.0.1',
    login:      'johnyma22',
    apiKey:     'R_362b047f38a8d6f34bbfdee3fdaeab9c',
    history:    '0',
    longUrl:    url
  };

  // Build the URL to query
  var daurl = "http://api.bit.ly/shorten?"
    +"version="+defaults.version
    +"&longUrl="+defaults.longUrl
    +"&login="+defaults.login
    +"&apiKey="+defaults.apiKey
    +"&history="+defaults.history
    +"&format=json&callback=?";

    // Utilize the bit.ly API
  $.getJSON(daurl, function(data){
    // Make a good use of short URL
    $('#saveurl').html('<input type=text class=biglink value='+data.results[url].shortUrl+'>');
    $('#esaveurl').html('<input type=text class=elink value="<iframe width=800 height=600 src=&quot;'+data.results[url].shortUrl+'&quot;&gt;&lt;/iframe&gt;">');
    $('#asaveurl').html('<input type=text class=biglink value='+url+'>');
    $('#aesaveurl').html('<input type=text class=elink value="<iframe width=800 height=600 src=&quot;'+url+'&quot;&gt;&lt;/iframe&gt;">');
  });
}

function randOrd(){
  return (Math.round(Math.random())-0.5);
}

// Get save / load URL
function saveload(){
  $('#logo').animate({"height":"40px"});
  $('#camel').hide();
  $("#popdown").show();
  $("#values").hide();
  $("#help").hide();
  $("#names").hide();
  $("#saveload").show();
  $("div").remove("#result1");
  savenames = $("#namesbox").val();
  savenames = savenames.replace(/\n\r?/g, '101');
  $("#saveurl").show();
  $("#esaveurl").show();
  //console.log(savenames);
  bitlyurl = 'http://' + location.host + location.pathname + '?names='+savenames;
  bitly(bitlyurl);
}

function namesshow(){
  $('#logo').animate({"height":"40px"});
  $('#camel').hide();
  $("#popdown").show();
  $("#values").hide();
  $("#help").hide();
  $("#saveload").hide();
  $("#names").show();
  $('body').css({"overflow-y": "visible"});
}

// does the actual animation
function go(){
  var count = 1;
  // Get all possible names to cycle through from the namesbox.
  var names = $("#namesbox").val().split("\n").sort(randOrd);
  // Get number of seconds to use.
  var timer = $("#timeselect").val() * 1000;
  // get sound enabled
  var sound = ($(".sound").val() == "yes") ? true : false;

  $('#logo').animate({"height":"40px"});
  $('body').css({"overflow-y": "hidden"});
  $('#go').attr('disabled','disabled');
  $('#camel').show();
  $("div").remove("#result1");
  $("#values").show();
  $(".name").show();
  $("#popdown").hide();
  $('#countdown').hide();
  $("div").remove(".name");
  $("div").remove(".extra");
  $("#playback").html("");
  var newtop = names.length * 200 * -1;
  //$('#values').css({top: -300});
  $('#values').css({top: + newtop});
  //console.log(newtop);
  //alert(newtop);
  for(var i in names){
    if (names[i] != "" && typeof(names[i]) != undefined){
      name = names[i];
      $('#values').append('<div id=result'+count+' class="name">'+names[i]+'</div>');
      count++;
    }
  }
  for(var i in names){
    if (names[i] != "" && typeof(names[i]) != undefined){
      name = names[i];
      $('#values').append('<div id=result'+count+' class="name">'+names[i]+'</div>');
      count++;
    }
  }
  for(var i in names){
    if (names[i] != "" && typeof(names[i]) != undefined){
      name = names[i];
      $('#values').append('<div id=result'+count+' class="name">'+names[i]+'</div>');
      count++;
    }
  }
  text = $('#result1').text()
//  topResult = $('#result1');
  $('#values').animate({top: '+176'},timer);
  if (sound === true) $('#playback').append('<div id=slot><embed src="niftyplayer.swf?file=slot.mp3&as=1" quality="high" bgcolor="#fbe34b" width="185" height="45" name="niftyPlayerslot" swLoveConnect=true" type="application/x-shockwave-flash"></div>').show('slow');
  // Hide playback timer
  setTimeout("$('#playback').hide('slow')",(timer * 1.5));
  // make it stand out
///  setTimeout("standout(topResult)",timer);
  setTimeout(function(){
    standout(text);
  },timer);
  $('#camel').hide();
}
function standout(){
  $('#result1').css('background','black');
  $('#result1').css('color','#fbe34b');
  $('#result1').removeClass('name');
  $('.name').animate({opacity: .25});
  $('#result1').animate({height: '+=80px'});
  $('#result1').append('<div class="extra"><a href="#" onClick="removevictim(\''+text+'\');">Remove item from list</a></div>');

  // send the chosen one as a text string to tts
  $('div').remove('#slot');
  // tts(text);
  $('#go').removeAttr('disabled','disabled');
}

function stopwatch(time){
  $('#camel').hide();
  $('#countdown').show();
  $('#countdown').html('<Br/><br/><iframe src="http://cd.justinjc.com/'+time+'m" width="800" height="170px" border=0 frameBorder=0 name="countdown" scrolling=no></iframe><a onClick="closeStopwatch();return false;" style="cursor:hand"><br/>Close Stopwatch</a>');
}

function removevictim(text){
  $('#countdown').hide();
  // Get current names from the textarea
  names = $("#namesbox").val().split("\n");
  // Removing victim from array and UI
  var nameupdated = "";
  for(var i in names){
    name = names[i];
    if (name != "" && name != text && typeof(name) != undefined){
      if (nameupdated == "") nameupdated = name;
      else nameupdated = nameupdated + "\n" + name;
    }
  }
  $('#namesbox').val(nameupdated);
  $('#result1').html("Item removed");
  $('#result1').fadeOut(1000);
  $("div").remove(".name");
  $("div").remove(".extra");
}

function changesound(el){
  if (el.value == "yes") $(el).val("no");
  else $(el).val("yes");
}
// Names Array
function returnNamesDev(){
  return Array('1','2','3','4','5','6','7','8');
}
function returnOldNames(){
  return Array('');
}
function returnNames(){
  return Array('');
}
