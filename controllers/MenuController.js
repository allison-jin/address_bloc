const inquirer = require('inquirer');
const ContactController = require("./ContactController");
module.exports = class MenuController {
    constructor() {
        this.mainMenuQuestions = [
            {
                type: "list",
                name: "mainMenuChoice",
                message: "Please choose from an option below: ",
                choices: [
                    "Add new contact",
                    "View all contacts",
                    "Search for a contact",
                    "Remind me",
                    "Get date",
                    "Exit"
                ]
            }
        ];
        this.book = new ContactController();
    }

    main() {
        console.log(`Welcome to AddressBloc!`);
        inquirer.prompt(this.mainMenuQuestions).then((response) => {
            switch (response.mainMenuChoice) {
                case "Add new contact":
                    this.addContact();
                    break;
                case "View all contacts":
                    this.getContacts();
                    break;
                case "Search for a contact":
                    this.search();
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

    addContact() {
        this.clear();
        //console.log('addContact called');
        inquirer.prompt(this.book.addContactQuestions).then((answers) => {
            this.book.addContact(answers.name, answers.phone, answers.email).then((contact) => {
                console.log("Contact added successfully!");
                this.main();
            }).catch((err) => {
                console.log(err);
                this.main();
            });
        });
        // this.main();
    }
    getContacts() {
        this.clear();

        this.book.getContacts().then((contacts) => {
            for (let contact of contacts) {
                console.log(`
            name: ${contact.name}
            phone number: ${contact.phone}
            email: ${contact.email}
            ---------------`
                );
            }
            this.main();
        }).catch((err) => {
            console.log(err);
            this.main();
        });
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

    search() {
        inquirer.prompt(this.book.searchQuestions)
            .then((target) => {
                this.book.search(target.name)
                    .then((contact) => {
                        if (contact === null) {
                            this.clear();
                            console.log("contact not found");
                            this.search();
                        } else {
                            this.showContact(contact);
                        }

                    });
            })
            .catch((err) => {
                console.log(err);
                this.main();
            });
    }

    showContact(contact) {
        this._printContact(contact);
        inquirer.prompt(this.book.showContactQuestions)
            .then((answer) => {
                switch (answer.selected) {
                    case "Delete contact":
                        this.delete(contact);
                        break;
                    case "Main menu":
                        this.main();
                        break;
                    default:
                        console.log("Something went wrong.");
                        this.showContact(contact);
                }
            })
            .catch((err) => {
                console.log(err);
                this.showContact(contact);
            });

    }

    _printContact(contact) {
        console.log(`
          name: ${contact.name}
          phone number: ${contact.phone}
          email: ${contact.email}
          ---------------`
        );
    }

    delete(contact) {
        inquirer.prompt(this.book.deleteConfirmQuestions)
            .then((answer) => {
                if (answer.confirmation) {
                    this.book.delete(contact.id);
                    console.log("contact deleted!");
                    this.main();
                } else {
                    console.log("contact not deleted");
                    this.showContact(contact);
                }
            })
            .catch((err) => {
                console.log(err);
                this.main();
            });
    }

    exit() {
        console.log("Thanks for using AddressBloc!");
        process.exit();
    }


}