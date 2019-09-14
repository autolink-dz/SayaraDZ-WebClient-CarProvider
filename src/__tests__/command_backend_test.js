var request = require("request");

var base_url = "https://us-central1-sayaradz-75240.cloudfunctions.net/sayaraDzApi/api/v1";




describe("Gestion des Models Ajout modification Supression", function() {
    describe("Login as fabriquant", function () {
        it("returns status code 200 + local storage", function (done) {
            let email = "fab@gmail.com";
            let password = "fab2019";
            request.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAtt4h5FUVwtrMPJK2EHmRnHcq9MpCgj_o',
                {json: true, body: { email:email,
                        password:password,'returnSecureToken':'true'}}, function (error, response, body) {
                    expect(response.statusCode).toBe(200);
                    localStorage.setItem('idtoken',body.idToken)
                    done();
                });
        });
    });

    describe("gestion des command backend", function () {
        var id_cmd = "";
        it("test get commands", function (done) {
            var options = {
                url: base_url+"/commandes?id_marque=HE54VwUdghgPRb6ZO6I8",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('idtoken'),
                    'cache-control': 'no-cache'
                }
            };
            request.get(options, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("modifier une command !", function (done) {
            let body={
                'etas':"etas"
            };
            var options = {
                url: base_url+'/commandes/'+id_cmd,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('idtoken'),
                    'cache-control': 'no-cache'
                }
                ,
                form:body
            };
            request.put(options, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("supprimer une command !", function (done) {
            var options = {
                url: base_url+'/versions?next=0&page=20',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('idtoken'),
                    'cache-control': 'no-cache'
                }
            };
            request.delete(options, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe("Ajouter modifier suprimer une verssion ", function () {
        var id = "";
        it("test l'ajout d une verssione !", function (done) {
            let body={
                "nom": "testmodel2",
                "url": "https://www.autobip.com/storage/photos/car_models/3235.png",
                "code": "code_testmode2",
                "id_marque": "HE54VwUdghgPRb6ZO6I8",
                "options": [
                    {
                        "code": "VOL_PASSAT_OPT_1",
                        "nom": "Volant cuir"
                    },
                    {
                        "code": "VOL_PASSAT_OPT_2",
                        "nom": "Commandes aux volant"
                    },
                    {
                        "code": "VOL_PASSAT_OPT_3",
                        "nom": "Vitres teintés"
                    },
                    {
                        "code": "VOL_PASSAT_OPT_4",
                        "nom": "Verouillage centralisé"
                    },
                    {
                        "code": "VOL_PASSAT_OPT_5",
                        "nom": "Anti démarrage"
                    },
                    {
                        "code": "VOL_PASSAT_OPT_6",
                        "nom": "Boite a gants refrigerante"
                    }
                ],
                "couleurs": [
                    {
                        "code": "VOL_PASSAT_CLR_V",
                        "nom": "vert"
                    },
                    {
                        "code": "VOL_PASSAT_CLR_R",
                        "nom": "rouge"
                    },
                    {
                        "code": "VOL_PASSAT_CLR_O",
                        "nom": "orange"
                    },
                    {
                        "code": "VOL_PASSAT_CLR_N",
                        "nom": "noir"
                    }
                ],
            };
            var options = {
                url: "https://us-central1-sayaradz-75240.cloudfunctions.net/sayaraDzApi/api/v1/modeles",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('idtoken'),
                    'cache-control': 'no-cache'
                },json:true,
                form:body

            };
            request.post(options,function (error, response, body) {

                id=body.id
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("test la modification d'un model !", function (done) {
            let body={
                id:id,
                nom:"nomtestput",
                url:"https://www.autobip.com/storage/photos/car_models/3235.png"
            };
            var options = {
                url: "https://us-central1-sayaradz-75240.cloudfunctions.net/sayaraDzApi/api/v1/modeles/"+id,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('idtoken'),
                    'cache-control': 'no-cache'
                },json:true,
                form:body

            };
            request.put(options,function (error, response, body) {

                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("test la supression de modele ajouter", function (done) {
            var options = {
                url: base_url+"/modeles/"+id,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('idtoken'),
                    'cache-control': 'no-cache'
                },
            };
            request.delete(options, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});