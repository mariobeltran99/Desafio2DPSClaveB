import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 1) return value;
    const resultPosts = [];
    for (const post of value) {
      if (
        post.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        post.cost.toString().indexOf(arg) > -1 ||
        post.pay.toString().indexOf(arg) > -1
      ) {
        resultPosts.push(post);
      }
    }
    return resultPosts;
  }
}
