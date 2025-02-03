// Class.
import { Affix } from "./affix.abstract";
/**
 * @description A class to manage prefixes that can be applied to strings.
 * @export
 * @class Prefix
 * @template {string} [Value=string] The type of prefix constrained by the `string`.
 * @extends {Affix<Value>}
 */
export class Prefix<Value extends string = string> extends Affix<Value> {
  /**
   * @description Sanitizes the prefix with a `pattern`.
   * @public
   * @param {string} value 
   * @param {RegExp} [pattern=Prefix.pattern] 
   * @returns {string} 
   */
  public static override sanitize<Value extends string = string>(
    value: Value,
    pattern: RegExp = Prefix.pattern
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
