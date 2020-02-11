var request = require("request");

var base_url = "https://us-central1-sayaradz-75240.cloudfunctions.net/sayaraDzApi/api/v1/marques";

let marque = {
    nom:'polo',
    url:'www.sdkqsl'
};

describe("Ajouter une marque API EXIST", function() {
    describe("POST / marque", function () {
        it("returns status code 200", function (done) {
            request.post({url :base_url,
                            form:marque}, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});

var base_url2 ="https://us-central1-sayaradz-75240.cloudfunctions.net/sayaraDzApi/api/v1/marques?next=0"
describe("marque List API Exists", function() {
    describe("GET /marque", function () {
        it("returns status code 200", function (done) {
            request.get({url:base_url2,headers: {'content-type' : 'application/x-www-form-urlencoded'}}, function (error, response, body) {
                console.log(body.toString())
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
})