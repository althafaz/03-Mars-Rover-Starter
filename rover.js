// contains information on the rover's position, operating mode, genertor watts.
// has function to receive messages and handles various types of commands and updates on rover's prop.
const Message = require('./message.js');
const Command = require('./command.js');
class Rover {
   constructor(position){
      this.position = position,
      this.mode = 'NORMAL',
      this.generatorWatts = 110
   }

   receiveMessage(newMessage) {

      let commands = newMessage.commandsArr
   
   
      let out = commands.reduce((res,cur)=>{
   
            let type = cur['commandType']
   
            if(type === "MODE_CHANGE" ){
               this.mode = cur.value
               res.push({completed: true})
            }

            if(type === "MOVE" && this.mode === "NORMAL"){
               this.position = cur.value
               res.push({completed: true})
            }

            if(type === "MOVE" && this.mode === "LOW_POWER"){
               res.push({completed: false})
            }


            if(type === "STATUS_CHECK"){
                res.push({
                  completed: true,
                  roverStatus: {mode:this.mode,generatorWatts:this.generatorWatts,position:this.position}
               })
            }
   
            return res
   
      },[])
   
      let output = {
         message:newMessage.messageName,
         results:out
      }
   
      return output
   }
}
let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]
let message = new Message('test massage',commands)
let rover = new Rover(98382);

console.log((rover.receiveMessage(message)))
console.log(JSON.stringify(rover.receiveMessage(message)))
module.exports = Rover;