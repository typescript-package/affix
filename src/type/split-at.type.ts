export type SplitAt<
  S extends string,
  Position extends number,
  Counted extends any[] = [],
  First extends string = '',
  Second extends string = S
> = Counted['length'] extends Position // Check if the counted length matches the position.
  ? [First, Second] // If it matches, return the split parts.
  : Second extends `${infer Head}${infer Tail}` // Split the second part into head and tail.
    ? SplitAt<S, Position, [any, ...Counted], `${First}${Head}`, Tail> // Recur with the head added to the first part and the tail as the new second part.
    : [First, Second]; // If the second part is empty, return the accumulated first part and the empty second part.
