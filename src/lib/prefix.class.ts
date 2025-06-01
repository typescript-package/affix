// Class.
import { Affix } from "./affix.class";
/**
 * @description A class to manage prefixes that can be applied to strings.
 * @export
 * @class Prefix
 * @template {string} [Value=string] The type of prefix constrained by the `string`.
 * @template {RegExp | string | undefined} [Pattern=RegExp | string | undefined] The type of pattern constrained by the `RegExp` or `string`.
 * @extends {Affix<Value, 'prefix', Pattern>}
 */
export class Prefix<
  Value extends string = string,
  Pattern extends RegExp | string | undefined = RegExp | string | undefined,
> extends Affix<Value, 'prefix', Pattern> {
  /**
   * @description Sanitizes the prefix with a `pattern`.
   * @public
   * @param {string} value
   * @param {RegExp | string} [pattern=Prefix.pattern]
   * @returns {string}
   */
  public static override sanitize<Value extends string = string>(
    value: Value,
    pattern: RegExp | string = Prefix.pattern
  ): Value {
    return value.replace(pattern, '') as Value;
  }

  /**
   * @inheritdoc
   * @public
   * @static
   * @type {RegExp}
   */
  public static override pattern: RegExp | string = super.pattern;

  /**
   * @description Returns the `string` tag representation of the `Prefix` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag]() {
    return Prefix.name;
  }

  /**
   * Creates an instance of `Prefix`.
   * @constructor
   * @param {Value} [value='' as Value] The value of the prefix, constrained by the `string` type. Defaults to an empty string.
   * @param {Pattern} [pattern=Prefix.pattern] The pattern to sanitize the prefix. Defaults to the static `Prefix.pattern`.
   */
  constructor(
    value: Value = '' as Value,
    pattern: Pattern = Prefix.pattern as Pattern
  ) {
    super(value, { kind: 'prefix', pattern });
  }
}
