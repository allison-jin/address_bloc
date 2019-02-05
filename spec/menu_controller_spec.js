const MenuController = require("../controllers/MenuController");
// #1
describe("MenuController", () => {

    beforeEach(() => {
        this.menu = new MenuController();
      });


    describe("#getContactCount()", () => {

        it("should return 0 when no contacts are in the book", () => { 
            /* spec implementation */ 
            expect(this.menu.getContactCount()).toBe(0)
        });

        it("should return 1 when there is exactly one contact in the book", () => {
            //const menu = new MenuController();
            //menu.contacts.push("Bob");
            //expect(menu.getContactCount()).toBe(1)
            this.menu.contacts.push("Bob");
            expect(this.menu.getContactCount()).toBe(1)
        });

    });

    describe("#remindMe()", () => {

        it("should return Learning is a life-long persuit", () => { 
            /* spec implementation */ 
            expect(this.menu.remindMe()).toBe("Learning is a life-long pursuit")
        });

    });

});