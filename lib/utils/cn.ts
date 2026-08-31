import classnames, { type ArgumentArray } from "classnames";

export function cn(...args: ArgumentArray): string {
  return classnames(...args);
}
