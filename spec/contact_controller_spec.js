const ContactController = require("../controllers/ContactController");
const sequelize = require("../db/models/index").sequelize;

describe("ContactController", () => {

    beforeEach((done) => {
        this.book = new ContactController();

        // #1
        sequelize.sync({ force: true }).then((res) => {
            done();
        })
            .catch((err) => {
                done();
            });
    });

    // #2
    describe("#addContact()", () => {
        // #1
        //it("should add a single contact into the book", () => {
        it("should add a single contact into the book", (done) => {
             expect(this.book.contacts.length).toBe(0);
            // this.book.addContact("Alice", "001-101-1010");
            // expect(this.book.contacts.length).toBe(1);
        
        // #2
        this.book.addContact("Alice", "001-101-1010","alice@email.com")
        .then((contact) => {

        // #3
          expect(contact.name).toBe("Alice");
          expect(contact.phone).toBe("001-101-1010");
          expect(contact.email).toBe("alice@email.com");
          done();
        })
        .catch((err) => {
          done();
        });
        });
    });

    // it("should be defined", () => {
    //     expect(ContactController).toBeDefined();
    // });
})