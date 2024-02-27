const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);    // Passes 98382 as the rover's position.
let response = rover.receiveMessage(message);

describe("Rover class", function() {

  //test 7
  it("constructor sets position and default values for mode and generatorWatts",()=>{
      expect(rover.position).toEqual(98382)
      expect(rover.mode).toEqual('LOW_POWER')
      expect(rover.generatorWatts).toEqual(110)
  })

  //test 8
  it("response returned by receiveMessage contains the name of the message",()=>{
      expect(response['message']).toEqual('Test message with two commands')
  })

  //test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message",()=> {
    expect(response['results'].length).toEqual(message.commandsArr.length)
  })

  //test10
  it("responds correctly to the status check command",()=>{

    expect(response['results'][1]['roverStatus']['mode']).toEqual('LOW_POWER')
    expect(response['results'][1]['roverStatus']['generatorWatts']).toEqual(110)
    expect(response['results'][1]['roverStatus']['position']).toEqual(98382)
  })

  //test11
  it("responds correctly to the mode change command",()=>{
    expect(response['results'][0]['completed']).toEqual(true)
    expect(rover.mode === "LOW_POWER" || rover.mode === "NORMAL").toBeTruthy()
  })


    //test12
    it("responds with a false completed value when attempting to move in LOW_POWER mode",()=>{
      commands = [new Command('MODE_CHANGE', 'LOW_POWER'),new Command('MOVE', 40000)];
      message = new Message('Test message with two commands', commands);
      response = rover.receiveMessage(message);
      expect(response['results'][1]['completed']).toEqual(false)
      expect(rover.position).toEqual(98382)
    })

    //test13
    it("responds with the position for the move command",()=>{
      commands = [new Command('MODE_CHANGE', 'NORMAL'),new Command('MOVE', 40000)];
      message = new Message('Test message with two commands', commands);
      response = rover.receiveMessage(message);
      expect(response['results'][1]['completed']).toEqual(true)
      expect(rover.position).toEqual(40000)
    })



});
