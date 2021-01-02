module.exports = function(io){
    io.on('connection', function(socket){
        console.log('connection established')
        // THIS IS COMMIN FROM CLIENT
        socket.on('meetup/subscribe', function(meetupId) {
             
             console.log('joining meetup', `meetup-${meetupId}`)
             socket.join(`meetup-${meetupId}`)
        })

        socket.on('meetup/unsubscribe',function(meetupId){
            console.log('leaving-meetup', `meetup-${meetupId}`)
            socket.leave(`meetup-${meetupId}`)
        })

        socket.on('meetup/postSaved', function(post){
            console.log('emmting to meetup', `meetup-${post.meetup}`)
           
            socket.to(`meetup-${post.meetup}`).emit('meetup/postPublished', post)
        })
      })

}

// module.exports = function(io){
//     io.on('connection', function(socket){
//         console.log('connection established')

//           socket.on('meetup/subscribe', function(meetupId) {
             
//              console.log('joining meetup', `meetup-${meetupId}`)
//              socket.join(`meetup-${meetupId}`)
//   })



//         socket.on('meetup/postSaved', function(post){
//             // this comming from client
            
//             io.emit('meetup/postPublished', post)
//         })
        
//     })
// }