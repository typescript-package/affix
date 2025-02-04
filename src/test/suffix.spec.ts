import { typeOf } from "@typescript-package/core";
import { Suffix } from "../lib";

const suffix = new Suffix();

console.log(suffix);
console.log(`typeOf(), `, typeOf(suffix));
console.log(`[object Suffix], `, Object.prototype.toString.call(suffix));
