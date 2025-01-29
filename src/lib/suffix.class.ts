// Class.
import { Affix } from "./affix.abstract";
/**
 * @description A class to manage suffixes that can be applied to strings.
 * @export
 * @class Suffix
 * @template {string} [Value=string] The type of suffix constrained by the `string`.
 * @extends {Affix<Value>}
 */
export class Suffix<Value extends string = string> extends Affix<Value> {
  /**
   * @description Sanitizes the suffix with a `filter`.
   * @public
   * @param {string} value 
   * @param {RegExp} [filter=Suffix.filter] 
   * @returns {string} 
   */
  public static override sanitize<Value extends string = string>(
    value: Value,
    filter: RegExp = Suffix.filter
  ): Value {
    return value.replace(filter, '') as Value;
  }

  /**
   * @inheritdoc
   * @public
   * @static
   * @type {RegExp}
   */
  public static override filter: RegExp = super.filter;
}
