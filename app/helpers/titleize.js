import { helper } from '@ember/component/helper';

export function capitalize(string) {
  return `${(string)[0].toUpperCase()}${string.substr(1)}`;
}

export function titleize(params/* , hash */) {
  const [title] = params;

  if (!title) return title;

  return capitalize(title);
}

export default helper(titleize);
