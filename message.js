// it has a name and contain several commands
// responsible for building the commands from mission control and deliver to rover
class Message {
   constructor (messageName,commandsArr) {
      this.messageName = messageName
      if(!messageName){
         throw Error("Message name required!")
      }

      this.commandsArr = commandsArr

   //    if (!Array.isArray(commandsArr)) {
   //       throw Error('Commands must be in an array!');
   //   }
 
   }
}

module.exports = Message;