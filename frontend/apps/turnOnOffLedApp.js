
function app(){
  console.log("in app()");
  queryTags(['led1'], function(tags, err) {
    console.log("APP tags are", tags);
    listExistingTags(tags, setup);
  });
};

function listExistingTags(links, cb){
  console.log("links is : ", links);
  for (var key in links) {
    if (links[key] !== undefined)
    $('<a>',{
      text: " " +"http://" + links[key],
      title: key,
      href: "http://" + links[key]
    }).appendTo('#'+ key);
  }
  cb(links);
}

function setup() {
  //- ROT.readTag("tag", function cb(resp, err) { ... } ) => resp: WHATEVER THE URLS OF THAT TAG RETURNS
  //- ROT.writeTag("tag", data, cb(resp, err) { ... } ) => data: whatever data you want, resp: tag will respond whatever it wants

  //I set a new tag for raspberry-cam and use it as stream source

  readTag('led1', function(data, err) {
    if (err)
      console.log("****************** I fail miserably to read url of my led :(******************", err);
    console.log("**** |o/ **************************** data is ", data);
    var url = "http://" + data;
  })
  var pushMe = $('<button/>',
    {
      text: 'ChangeState',
      click: function () { console.log('hi');
        readTag("led1", function(state) {
          console.log("STATE of led1 in readTAG is ", state);
          if (state === "on") {
            console.log("---------------i am in state is on");
            writeTag("led1", "off", function(err){console.log("LED1 OFF-----", err);});
          } else {
            writeTag("led1", "on", function(err){console.log("LED1 ON----", err);  });
          }
        });
        readTag('led1', function(data, err){console.log("read state of led1: ", data);});

      }}).addClass("btn btn-success");
  $("#myDiv").append(pushMe);
}

function forEach(obj, cb) {
  for (var e in obj) {
    cb(e);
  }
}

init(app);