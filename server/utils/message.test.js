const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', ()=>{

    it('should create correct message object', ()=>{
        // store res in variable
        var from = 'jem', text = 'Some Message';
        var message = generateMessage(from, text);
        // assert createdAt is number
        expect(typeof message.createdAt).toBe('number');
        // assert text match
        expect(message).toMatchObject({from, text});
        
    });
});