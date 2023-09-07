export class User {
    constructor(u) {
        this._id = '';
        this.displayname = '';
        this.tel = '';
        this._id = u._id;
        this.tel = u.tel || '';
        this.displayname = u.displayname || '';
        this.settings = u.settings || { bgindex: 2 };
        this.perks = u.perks || {};
    }
}
