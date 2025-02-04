import { typeOf } from "@typescript-package/core";
import { Affix } from "../lib";

export class TestAffix extends Affix {}

const testAffix = new TestAffix();

console.log(testAffix);
console.log(`typeOf(), `, typeOf(testAffix));
console.log(`[object Affix], `, Object.prototype.toString.call(testAffix).match(/\[object (\w+)]/)?.[1]);
