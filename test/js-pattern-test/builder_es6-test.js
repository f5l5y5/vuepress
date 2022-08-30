const expect = require('chai').expect;
import RequestBuilder from '../tmp'

describe('建造者模式 es6测试', () => {
    it('构建行为分离 es6', () => {
        const requestBuilder = new RequestBuilder();
        const url = 'http://something/users';
        const method = 'GET';
        const request = requestBuilder
            .forUrl(url)
            .useMethod(method)
            .payload(null)
            .build();

        expect(request.method).to.equal(method);
        expect(request.payload).to.be.null;
        expect(request.url).to.equal(url);
    });
});