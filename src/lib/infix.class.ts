// Class.
import { Affix } from "./affix.class";
// Type.
import { InfixTemplate } from "@typedly/affix";
import { SplitAt } from "../type";
/**
 * @description A class to manage infixes that can be applied to strings.
 * @export
 * @class Infix
 * @template {string} [Value=string] The type of infix constrained by the `string`.
 * @template {RegExp | string | undefined} [Pattern=RegExp | string | undefined] The type of pattern constrained by the `RegExp` or `string`.
 * @extends {Affix<Value, 'infix', Pattern>}
 */
export class Infix<
  Value extends string = string,
  Pattern extends RegExp | string | undefined = RegExp | string | undefined,
> extends Affix<Value, 'infix', Pattern> {
  /**
   * @description Inserts the infix into a given stem at a specified position with an optional delimiter.
   * @public
   * @static
   * @template {string} Infix Type of the infix constrained by the `string`.
   * @template {string} [Stem=string] The type of the stem string.
   * @template {number} [Position=number] The type of the position number, defaults to `Math.floor(stem.length / 2)`.
   * @template {string} [Delimiter=''] The type of delimiter string, defaults to an empty string.
   * @param {Infix} infix The infix to insert into the stem at specified position.
   * @param {Stem} stem The stem to insert the infix into its specified position.
   * @param {Position} [position=Math.floor(stem.length / 2) as Position] The position of stem to insert the infix.
   * @param {Delimiter} [delimiter='' as Delimiter] The delimiter to use between the two halves of stem and infix.
   * @returns {InfixTemplate<SplitAt<Stem, Position>[0], Infix, SplitAt<Stem, Position>[1], Delimiter>} 
   */
  public static insert<
    Stem extends string = string,
    Infix extends string = string,
    Position extends number = number,
    Delimiter extends string = ''
  >(
    stem: Stem,
    infix: Infix,
    position: Position = Math.floor(stem.length / 2) as Position,
    delimiter: Delimiter = '' as Delimiter
  ): InfixTemplate<SplitAt<Stem, Position>[0], Infix, SplitAt<Stem, Position>[1], Delimiter> {
    return `${stem.slice(0, position)}${delimiter}${infix}${delimiter}${stem.slice(position)}` as any;
  }

  /**
   * @description Tag name for the `toStringTag`.
   * @public
   * @static
   * @type {string}
   */
  public static override tagName: string = 'Infix';

  /**
   * @description The default infix to use.
   * @public
   * @static
   * @type {string}
   */
  public static default: string = '';

  /**
   * @description Returns the `string` tag representation of the `Infix` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag]() {
    return Infix.tagName;
  }

  /**
   * @description The infix value, which is a generic type variable `Value` constrained by the `string` type.
   * @public
   * @readonly
   * @type {Value}
   */
  public get infix(): Value {
    return this.value;
  }

  /**
   * Creates an instance of `Infix`.
   * @constructor
   * @param {Value} [value='' as Value] The value of the infix, constrained by the `string` type. Defaults to an empty string.
   * @param {Pattern} [pattern=Infix.pattern] The pattern to sanitize the infix. Defaults to the static `Infix.pattern`.
   */
  constructor(
    value: Value = '' as Value,
    pattern: Pattern = Infix.pattern as Pattern
  ) {
    super(value, { kind: 'infix', pattern });
  }

  /**
   * @description Inserts the infix into a given stem at a specified position with an optional delimiter.
   * @public
   * @template {string} [Stem=string] The type of the stem string.
   * @template {number} [Position=number] The type of the position number, defaults to `Math.floor(stem.length / 2)`.
   * @template {string} [Delimiter=''] The type of delimiter string, defaults to an empty string.
   * @param {Stem} stem The stem to insert the infix into specified position of stem.
   * @param {Position} [position=Math.floor(stem.length / 2) as Position] The position of stem to insert the infix.
   * @param {Delimiter} [delimiter='' as Delimiter] The delimiter to use between the two halves of stem and infix.
   * @returns {InfixTemplate<SplitAt<Stem, Position>[0], Value, SplitAt<Stem, Position>[1], Delimiter>}
   */
  public insertTo<
    Stem extends string = string,
    Position extends number = number,
    Delimiter extends string = '',
  >(
    stem: Stem,
    position: Position = Math.floor(stem.length / 2) as Position,
    delimiter: Delimiter = '' as Delimiter
  ): InfixTemplate<SplitAt<Stem, Position>[0], Value, SplitAt<Stem, Position>[1], Delimiter> {
    return Infix.insert(stem, this.value, position, delimiter);
  }
}
