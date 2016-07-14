import {Component} from "@angular/core";
import {Platform, ionicBootstrap} from "ionic-angular";
import {StatusBar} from "ionic-native";
import {HomePage} from "./pages/home/home";
declare function require(name: string);
let Parse = require("parse/node");


@Component({
    template: "<ion-nav [root]='rootPage'></ion-nav>"
})
export class MyApp {
    rootPage: any = HomePage;

    constructor(platform: Platform) {
        Parse.initialize("ion-video-app", "unused", "change-this-key");
        Parse.serverURL = "http://parse-server-4282.herokuapp.com/parse";
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });

        // let testObjClass = new Parse.Object.extend("TestObject");
        //
        // // Create instance of testObjClass
        // let testObj = new testObjClass();
        //
        // // Add data you want to save as a hush
        // testObj.set("key1", "val1");
        // testObj.set("key2", "val2");
        // testObj.set("key3", "val3");
        //
        // // Save object to DB
        // testObj.save().then((obj) => {
        //     console.log("New object created with objectId: " + testObj.id);
        // }, (err) => {
        //     console.log("Failed to create new object, with error code: " + err.message);
        // });
    }
}

ionicBootstrap(MyApp);
