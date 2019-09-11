var request = require("request");

var base_url = "https://us-central1-sayaradz-75240.cloudfunctions.net/sayaraDzApi/api/v1";




describe("Gestion des Models Ajout modification Supression", function() {
    describe("Login test", function () {
        it("returns status code 200 + local storage", function (done) {
            let email = "fab@gmail.com";
            let password = "fab2019";
            request.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAtt4h5FUVwtrMPJK2EHmRnHcq9MpCgj_o',
                {json: true, body: { email:email,
                        password:password,'returnSecureToken':'true'}}, function (error, response, body) {
                    expect(body.email).toBe(email);
                    localStorage.setItem('idtoken',body.idToken)
                    done();
                });
        });
    });

    describe("GET /modele test", function () {
        it("returns status code 200", function (done) {
            var options = {
                url: base_url+"/modeles?next=0&page=20'",
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
    });

    describe("Ajouter modifier suprimer un model ", function () {
        var id = "";
        var id_ver="";
        it("test l'ajout d'un model !", function (done) {
            let form={
                "nom": "testmodel47",
                "url": "https://www.autobip.com/storage/photos/car_models/3235.png",
                "code": "code_testmode47",
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
                form:form

            };
            request.post(options,function (error, response, body) { // Ajouter un modele

                id=body.id;
                var options_2 = {
                    url: base_url+"/modeles?next=0&page=20'",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('idtoken'),
                        'cache-control': 'no-cache'
                    }
                };
                request.get(options_2, function (error, response, body_set) { // get list des models
                    var set = JSON.parse(body_set);
                    expect(set.data).toContainEqual(body); // tester si la list contien l'element ajouter
                    done();
                });


            });
        });
        it("test l'ajout une verssion !", function (done) {

            let form={
                "nom": "version1",
                "code":"verssion_code1",
                "url": "http://url.com",
                "id_modele":id,
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
                "fiche_tech":"fich_teck"
            };
            var options = {
                url: "https://us-central1-sayaradz-75240.cloudfunctions.net/sayaraDzApi/api/v1/versions",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('idtoken'),
                    'cache-control': 'no-cache'
                },json:true,
                form:form

            };
            request.post(options,function (error, response, body) { // ajout d'une verssion

                id_ver=body.id

                var options_2 = {
                    url: base_url+"/versions?next=0&page=20",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('idtoken'),
                        'cache-control': 'no-cache'
                    }
                };
                request.get(options_2, function (error, response, body_set) { // chercher dans la list des verssion si il ya celle qu'on a ajouter
                    var set = JSON.parse(body_set);
                    expect(set.data).toContainEqual(body); // tester si la list contien l'element ajouter
                    done();
                });


            });
        });

        it("test la modification d une verssion !", function (done) {
            let form={
                id:id_ver,
                nom:"nom_modif",
                code:"code_modif",
                url:"https://urlmodif.com",

                options: [
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
                couleurs: [
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
                fiche_tech:"fich_teck",
                id_modele:id,
                "id_marque": "HE54VwUdghgPRb6ZO6I8",
            };

            var options = {
                url: "https://us-central1-sayaradz-75240.cloudfunctions.net/sayaraDzApi/api/v1/versions/"+id_ver,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('idtoken'),
                    'cache-control': 'no-cache'
                },json:true,
                form:form

            };
            request.put(options,function (error, response, body) {
                var options_2 = {
                    url: base_url+"/versions?next=0&page=20",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('idtoken'),
                        'cache-control': 'no-cache'
                    }
                };
                request.get(options_2, function (error, response, body_set) { // chercher dans la list des verssion si il ya celle qu'on a modifier par id
                    var set = JSON.parse(body_set);
                    expect(set.data).toContainEqual(form);
                    done();
                });

            });

        });
        it("test la supression de une verssion", function (done) {
            var options = {
                url: base_url+"/versions/"+id_ver,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('idtoken'),
                    'cache-control': 'no-cache'
                },
            };
            let verssion={
                id:id_ver,
                nom:"nom_modif",
                code:"code_modif",
                url:"https://urlmodif.com",

                options: [
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
                couleurs: [
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
                fiche_tech:"fich_teck",
                id_modele:id
            };
            request.delete(options, function (error, response, body) {
                var options_2 = {
                    url: base_url+"/versions?next=0&page=20",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('idtoken'),
                        'cache-control': 'no-cache'
                    }
                };
                request.get(options_2, function (error, response, body_set) { // chercher dans la list des verssion si il ya celle qu'on a modifier par id
                    var set = JSON.parse(body_set);
                    expect(set.data).not.toContainEqual(verssion);
                    done();
                });

            });
        });
        it("test la modification d'un model !", function (done) {
            let form={
                id:id,
                nom:"nomtestput",
                "id_marque": "HE54VwUdghgPRb6ZO6I8",
                "options": [{"code": "VOL_PASSAT_OPT_1", "nom": "Volant cuir"}, {"code": "VOL_PASSAT_OPT_2", "nom": "Commandes aux volant"}, {"code": "VOL_PASSAT_OPT_3", "nom": "Vitres teintés"}, {"code": "VOL_PASSAT_OPT_4", "nom": "Verouillage centralisé"}, {"code": "VOL_PASSAT_OPT_5", "nom": "Anti démarrage"}, {"code": "VOL_PASSAT_OPT_6", "nom": "Boite a gants refrigerante"}],
                "url": "https://www.autobip.com/storage/photos/car_models/3235.png"


            };
            var options = {
                url: "https://us-central1-sayaradz-75240.cloudfunctions.net/sayaraDzApi/api/v1/modeles/"+id,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('idtoken'),
                    'cache-control': 'no-cache'
                },json:true,
                form:form

            };
            request.put(options,function (error, response, body) {
                var options_2 = {
                    url: base_url+"/modeles?next=0&page=20",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('idtoken'),
                        'cache-control': 'no-cache'
                    }
                };
                request.get(options_2, function (error, response, body_set) { // chercher dans la list des modeles si il ya celle qu'on a modifier par id
                    var set = JSON.parse(body_set);
                    expect(set.data).toContainEqual(form);
                    done();
                });

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
            let modele={
                id:id,
                nom:"nomtestput",
                url:"https://www.autobip.com/storage/photos/car_models/3235.png"
            };
            request.delete(options, function (error, response, body) {
                var options_2 = {
                    url: base_url+"/modeles?next=0&page=20",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('idtoken'),
                        'cache-control': 'no-cache'
                    }
                };
                request.get(options_2, function (error, response, body_set) { // chercher dans la list des verssion si il ya celle qu'on a modifier par id
                    var set = JSON.parse(body_set);
                    expect(set.data).not.toContainEqual(modele);
                    done();
                });
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});