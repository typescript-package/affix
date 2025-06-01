// Class.
import { Affix } from "./affix.abstract";
/**
 * @description A class to manage suffixes that can be applied to strings.
 * @export
 * @class Suffix
 * @template {string} [Value=''] The type of suffix constrained by the `string`.
 * @template {RegExp | string | undefined} [Pattern=RegExp | string | undefined] 
 * @extends {Affix<Value, 'suffix', Pattern>}
 */
export class Suffix<
  Value extends string = '',
  Pattern extends RegExp | string | undefined = RegExp | string | undefined,
> extends Affix<Value, 'suffix', Pattern> {
  /**
   * @inheritdoc
   * @public
   * @static
   * @type {RegExp}
   */
  public static override pattern: RegExp | string = super.pattern;

  /**
   * @inheritdoc 
   * @public
   * @static
   * @template {string} [Value=''] 
   * @param {Value} value 
   * @param {(RegExp | string)} [pattern=Suffix.pattern] 
   * @returns {Value} 
   */
  public static override sanitize<Value extends string = ''>(
    value: Value,
    pattern: RegExp | string = Suffix.pattern
  ): Value {
    return value.replace(pattern, '') as Value;
  }

  /**
   * @description Returns the `string` tag representation of the `Suffix` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag]() {
    return Suffix.name;
  }

  /**
   * Creates an instance of `Suffix`.
   * @constructor
   * @param {Value} [value='' as Value] The value of the suffix, constrained by the `string` type. Defaults to an empty string.
   * @param {(Pattern)} [pattern=Suffix.pattern] The pattern to sanitize the suffix. Defaults to the static `Suffix.pattern`.
   */
  constructor(
    value: Value = '' as Value,
    pattern: Pattern = Suffix.pattern as Pattern
  ) {
    super(value, { kind: 'suffix', pattern });
  }
}
