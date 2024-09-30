ZoomMtg.preLoadWasm()
ZoomMtg.prepareWebSDK()

var authEndpoint = 'http://localhost:4000/zoom_auth_jwt'
var sdkKey = '4EvPaJwQTl6lpYmcAeqFg'
// var meetingNumber = '93362050842'
var meetingNumber = '97057314707'
var passWord = '123456'
var role = 0
var userName = 'Participant'
var userEmail = 'masum@gmail.com'
var registrantToken = ''
var zakToken = 'aDFImFLu0idYeKfnun-TSKg517Sg0Ff8g'
var leaveUrl = 'http://127.0.0.1:5500/'

function getSignature() {
  fetch(authEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      meetingNumber: meetingNumber,
      role: role
    })
  }).then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data)
    startMeeting(data.signature)
  }).catch((error) => {
  	console.log(error)
  })
}



function startMeeting(signature) {
  document.getElementById('zmmtg-root').style.display = 'block'

  ZoomMtg.init({
    leaveUrl: leaveUrl,
    patchJsMedia: true,
    leaveOnPageUnload: true,
    success: (success) => {
      console.log(success)
      ZoomMtg.join({
        signature: signature,
        sdkKey: sdkKey,
        meetingNumber: meetingNumber,
        passWord: passWord,
        userName: userName,
        userEmail: userEmail,
        customerKey: "masumid",
        success: (success) => {
          console.log("success on joining meeting ------- ", success)
          ZoomMtg.joinBreakoutRoom({
            roomId: "room_1",
            success: () => {
              console.log(`Successfully joined the breakout room: ${roomId}`);
            },
            error: (error) => {
              console.error("Failed to join breakout room:", error);
            }
          })
        },
        error: (error) => {
          console.log(error)
        },
      })
    },
    error: (error) => {
      console.log(error)
    }
  })
}

function fetchBreakoutRooms() {
  ZoomMtg.getBreakoutRooms({
      success: (rooms) => {
          console.log("Fetched breakout rooms:", rooms);
          if (rooms.length > 0) {
              const firstRoomId = rooms[0].roomId; 
              joinBreakoutRoom(firstRoomId); 
          } else {
              console.log("No breakout rooms available.");
          }
      },
      error: (error) => {
          console.error("Failed to fetch breakout rooms:", error);
      }
  });
}

function joinBreakOutRoom(roomId) {
  ZoomMtg.joinBreakoutRoom({
    roomId: roomId,
    success: () => {
      console.log(`Successfully joined the breakout room: ${roomId}`);
    },
    error: (error) => {
      console.error("Failed to join breakout room:", error);
    }
  })
}

// ok. imagine a scenario. host created a meeting with 20 breakout rooms. those rooms name are something like sku_1 to sku_20. each room can contain 50 participants. give me a way to 