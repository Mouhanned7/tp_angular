import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { HighlightDirective } from './highlight.directive';

@Component({
  standalone: true,
  imports: [HighlightDirective],
  template: `<div appHighlight [appHighlight]="'#e0e7ff'">Test</div>`,
})
class TestHostComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should change background color on mouseenter and restore on mouseleave', () => {
    const div = fixture.nativeElement.querySelector('div') as HTMLElement;

    div.dispatchEvent(new MouseEvent('mouseenter'));
    expect(div.style.backgroundColor).toBe('rgb(224, 231, 255)');

    div.dispatchEvent(new MouseEvent('mouseleave'));
    expect(div.style.backgroundColor).toBe('');
  });
});

