"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qrcode_1 = require("qrcode");
qrcode_1.default.toDataURL('I am a pony!')
    .then(url => {
    console.log(url);
})
    .catch(err => {
    console.error(err);
});
//# sourceMappingURL=test.js.map