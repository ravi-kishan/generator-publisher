import { expect } from "chai";
import { hello } from "./index";


describe('Hello test', () => { 
    it('should return You Overshot!', () => {
        var result = hello();
        expect(result).to.equal('hello world!');
    });
});