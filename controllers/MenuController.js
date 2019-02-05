const inquirer = require('inquirer');

module.exports = class MenuController {
    constructor() {
        this.mainMenuQuestions = [
            {
                type: "list",
                name: "mainMenuChoice",
                message: "Please choose from an option below: ",
                choices: [
                    "Add new contact",
                    "Remind me",
                    "Get date",
                    "Exit"
                ]
            }
        ];
        this.contacts = [];
    }

    main() {
        console.log(`Welcome to AddressBloc!`);
        inquirer.prompt(this.mainMenuQuestions).then((response) => {
            switch (response.mainMenuChoice) {
                case "Add new contact":
                    this.addContact();
                    break;
                case "Remind me":
                    this.remindMe();
                    break;    
                case "Get date":
                    this.getDate();
                    break;
                case "Exit":
                    this.exit();
                default:
                    console.log("Invalid input");
                    this.main();
            }
        })
            .catch((err) => {
                console.log(err);
            });
    }

    // getDate() {
    //     this.clear();
    //     var date = new Date();
    //     var dd = date.getDate();
    //     var mm = date.getMonth() + 1; // Jan is 0
    //     var year = date.getFullYear();
    //     if (dd < 10) {
    //         dd = "0" + dd
    //     }
    //     if (mm < 10) {
    //         mm = "0" + mm
    //     }
    //     date = mm + "/" + dd + "/" + year;
    //     console.log(date);
    //     this.main();
    // }

    date() { /* method definition */ }
    getDate() {
        this.clear();
        var dd = new Date().toDateString()
        console.log("Today\s Date: " + dd);
        this.main();
    }

    getContactCount() {
        //method definition
        return this.contacts.length;
    }

    remind() { /* method definition */ }
    remindMe() {
        this.clear();
        var reminder = "Learning is a life-long pursuit"
        console.log(reminder);
        this.main();
        return reminder;
    }

    clear() {/* method definition */
        //console.log("\x1Bc");
    }

    addContact() {
        this.clear();
        console.log('addContact called');
        this.main();
    }

    exit() {
        console.log("Thanks for using AddressBloc!");
        process.exit();
    }


}