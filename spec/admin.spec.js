let axios = require("axios");

describe("Add Fabricant", ()=> {
    let nom = 'TEST';
    let url = 'www.test.com';

    beforeAll(()=> {
        return axios.post('https://us-central1-sayaradz-75240.cloudfunctions.net/sayaraDzApi/api/v1/marques', {
            nom: nom,
            url: url
        }).then
        (
            (response)=>{
            console.log(response);
            }
        )
        });

        it("test", () =>{
            axios.get('https://us-central1-sayaradz-75240.cloudfunctions.net/sayaraDzApi/api/v1/marques?', {
                nom: this.nom,
                url: this.url
            }).then( (response)=>{
                console.log(response);
            } )
        });


    afterAll( ()=> {
        this.nom = 'YYYYY';
        this.url = 'XXXXX';
    });
});