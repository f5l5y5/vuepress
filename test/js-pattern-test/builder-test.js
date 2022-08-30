const expect = require('chai').expect;
const RequestBuilder = require('../tmp');

describe('建造者模式测试', () => {
    it('构建行为分离 method', () => {
        var requestBuilder = new RequestBuilder();
        var request = requestBuilder
            .forUrl('http://something/users')
            .useMethod('GET')
            .payload(null)
            .build()

        expect(request.method).to.equal('GET');
    });
});