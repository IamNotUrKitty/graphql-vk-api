var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var API = require("../api/vk");
var chaiThings = require('chai-things');
chai.should();
chai.use(chaiThings);
chai.use(chaiAsPromised);


describe("vk.com api methods", ()=>{
    describe("Get.users ", ()=>{
        it("Should return user object from api", ()=>{
            return API.getUser("1").should.eventually.have.property("first_name");
        });
        it("Should return user object with extra fields", ()=>{
           return API.getUser("1",["photo_id"]).should.eventually.have.property("photo_id")
        });
    });
    describe("Get.friends ", ()=>{
        it("Should return user's friends Array", ()=>{
            return API.getFriends("1").should.eventually.be.a('array')
        });
        it("Should return user's friends with count parameter", ()=>{
            return API.getFriends("1", 1).should.eventually.have.length(1);
        });
        it("Should return user's friends with extra fields", ()=>{
            return API.getFriends("1", 5, ['domain']).should.eventually.contain.a.thing.with.property('domain')
        });
    });
    describe("Get.albums ",()=>{
        it("Should return user's albums", ()=>{
            return API.getAlbums("1").should.eventually.be.a('array');
        });
        it("Should return user's albums with count parameter", ()=>{
            return API.getAlbums("1", [], 1).should.eventually.have.length(1);
        });
    });
    describe("Photos.get ", ()=>{
        it("Should return user's photos", ()=>{
            return API.getPhotos("66748",[167722675]).should.eventually.be.a('array');
        });
        it("Should return user's photos with count parameter",()=>{
            return API.getPhotos("66748",[167722675],3).should.eventually.have.length(3)
        })
    })
});