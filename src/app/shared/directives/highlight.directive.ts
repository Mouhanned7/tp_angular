import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  @Input('appHighlight') highlightColor = '#f8fafc';

  private originalColor: string | null = null;

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.originalColor === null) {
      this.originalColor = this.el.nativeElement.style.backgroundColor || '';
    }
    this.renderer.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      this.highlightColor || '#f8fafc'
    );
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.originalColor !== null) {
      if (this.originalColor) {
        this.renderer.setStyle(
          this.el.nativeElement,
          'backgroundColor',
          this.originalColor
        );
      } else {
        this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
      }
    }
  }
}

