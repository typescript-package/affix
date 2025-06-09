// Class.
import { Affix } from "./affix.class";
// Type.
import { CircumfixTemplate } from "@typedly/affix";
/**
 * @description A class to manage circumfixes that can be applied to strings.
 * @export
 * @class Circumfix
 * @template {string} [Start=string] The type of circumfix constrained by the `string`. Defaults to `string`.
 * @template {string} [End=Start] The type of circumfix end constrained by the `string`, defaults to the same type as `Start`.
 * @template {RegExp | string | undefined} [Pattern=RegExp | string | undefined] The type of pattern constrained by the `RegExp` or `string`.
 * @extends {Affix<[Start, End], 'circumfix', Pattern>}
 */
export class Circumfix<
  Start extends string = string,
  End extends string = Start,
  Pattern extends RegExp | string | undefined = RegExp | string | undefined,
> extends Affix<[Start, End], 'circumfix', Pattern> {
  /**
   * @description
   * @public
   * @static
   * @template {string} [Start=string] 
   * @template {string} [Stem=string] 
   * @template {string} [End=Start] 
   * @template {string} [Delimiter=''] 
   * @param {Stem} stem 
   * @param {(Start | [Start, End])} [circumfix=Circumfix.default as Start] 
   * @param {Delimiter} [delimiter='' as Delimiter] 
   * @returns {CircumfixTemplate<Start, Stem, End, Delimiter>} 
   */
  public static insert<
    Start extends string = string,
    Stem extends string = string,
    End extends string = Start,
    Delimiter extends string = '',
  >(
    stem: Stem,
    circumfix: Start | [Start, End] = Circumfix.default as Start,
    delimiter: Delimiter = '' as Delimiter
  ): CircumfixTemplate<Start, Stem, End, Delimiter> {
    return `${typeof circumfix === 'string' ? circumfix : circumfix[0] }${delimiter}${stem}${delimiter}${typeof circumfix === 'string' ? circumfix as unknown as End : circumfix[1] as End}`;
  }

  /**
   * @inheritdoc
   * @public
   * @static
   * @type {string}
   */
  public static override tagName: string = 'Circumfix';

  /**
   * @description
   * @public
   * @static
   * @type {string}
   */
  public static default: string = '';

  /**
   * @description Returns the `string` tag representation of the `Circumfix` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag]() {
    return Circumfix.tagName;
  }

  /**
   * @description The circumfix value, which is a tuple containing the start and end of the circumfix.
   * @public
   * @readonly
   * @type {[Start, End]}
   */
  public get circumfix(): [Start, End] {
    return this.value;
  }

  /**
   * @description The end of the circumfix, which is the second element of the tuple.
   * @public
   * @readonly
   * @type {End}
   */
  public get end(): End {   
    return this.value[1];
  }

  /**
   * @description The start of the circumfix, which is the first element of the tuple.
   * @public
   * @readonly
   * @type {Start}
   */
  public get start(): Start {
    return this.value[0];
  }

  /**
   * Creates an instance of `Circumfix`.
   * @constructor
   * @param {Start} [start='' as Value] The value of the prefix, constrained by the `string` type. Defaults to an empty string.
   * @param {End} [end=start as End] The value of the suffix, constrained by the `string` type, defaults to the same type as `start`.
   * @param {Pattern} [pattern=Circumfix.pattern] The pattern to sanitize the prefix. Defaults to the static `Circumfix.pattern`.
   */
  constructor(
    start: Start = '' as Start,
    end: End = start as unknown as End,
    pattern: Pattern = Circumfix.pattern as Pattern
  ) {
    super([start, end], { kind: 'circumfix', pattern });
  }

  /**
   * @description Inserts the circumfix to a given stem with an optional delimiter.
   * @param {string} stem The stem to which the circumfix will be inserted.
   * @returns {string} The resulting string with the circumfix inserted.
   */
  public insertTo<
    Stem extends string = string,
    Delimiter extends string = '',
  >(stem: Stem, delimiter: Delimiter): CircumfixTemplate<Start, Stem, End, Delimiter> {
    return Circumfix.insert<Start, Stem, End, Delimiter>(
      stem,
      [this.start, this.end],
      delimiter
    ) as CircumfixTemplate<Start, Stem, End, Delimiter>;
  }
} 
