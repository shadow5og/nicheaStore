import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
})
export class SafeUrlPipe implements PipeTransform {
  url: SafeResourceUrl;

  constructor(private domSanitizer: DomSanitizer) {}

  transform(value: string, ...args: unknown[]): SafeResourceUrl {
    this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(value);
    
    return this.url;
  }
}
