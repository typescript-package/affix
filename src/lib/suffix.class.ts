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
   * @description Sanitizes the suffix with a `pattern`.
   * @public
   * @param {string} value 
   * @param {RegExp} [pattern=Suffix.pattern] 
   * @returns {string} 
   */
  public static override sanitize<Value extends string = string>(
    value: Value,
    pattern: RegExp = Suffix.pattern
  ): Value {
    return value.replace(pattern, '') as Value;
  }

  /**
   * @inheritdoc
   * @public
   * @static
   * @type {RegExp}
   */
  public static override pattern: RegExp = super.pattern;
}
