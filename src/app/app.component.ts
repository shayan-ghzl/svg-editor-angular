import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { select } from 'd3';
import { FileInputDirective, SvgEditor, openDialog } from './shared/svg-editor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FileInputDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  svgEditor!: SvgEditor;

  ngAfterViewInit(): void {
    const svg = select<SVGSVGElement, unknown>('.svg-container')
      .append('svg')
      .style('background', '#b7b7b7')
      .attr('width', '600')
      .attr('height', '400');

    this.svgEditor = new SvgEditor(svg);
  }

  openDialog() {
    openDialog();
  }
}
