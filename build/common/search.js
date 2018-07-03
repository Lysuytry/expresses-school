'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

class nameParttern {

  constructor(name, gender) {
    this.gender = gender;
    const [first = '', last = ''] = name ? name.split(/\s*/) : [];
    this.fullname = first ? last ? first + last : first : first;
    this.fullnameReverse = first ? last ? last + first : first : first;
  }

  getFullnameRegExp() {
    return this.fullname ? new RegExp(`^${this.fullname}`, 'ig') : this.fullname;
  }

  getReverseRegExp() {
    return this.fullnameReverse ? new RegExp(`${this.fullnameReverse}`, 'ig') : this.fullnameReverse;
  }

  getGenderRegExp() {
    return this.gender ? new RegExp(`^${this.gender}$`, 'ig') : this.gender;
  }
}

exports.default = nameParttern;
//# sourceMappingURL=search.js.map