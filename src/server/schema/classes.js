
// Elements needed by Relay
// TODO: Investigate how to get rid of these
// ------------------------------

export class Blog extends Object {}
export class Post extends Object {}

var blog = new Blog();
blog.id = 1;

export function getBlog() {
  return blog;
}
