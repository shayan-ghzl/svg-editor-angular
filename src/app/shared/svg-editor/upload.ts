import { Selection, select } from 'd3';
import Shape from './shape';

import { Directive, HostListener } from '@angular/core';
import SvgEditor from './svg-editor';

@Directive({
    selector: '[fileInput]',
    standalone: true
})
export class FileInputDirective {

    @HostListener('change', ['$event.target'])
    onChange(event: HTMLInputElement) {
        const file = event.files?.[0];
        if (file && file.type === 'image/svg+xml') {
            const reader = new FileReader();
            reader.onload = function (e) {
                const svgContent = e.target?.result as string;
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml').documentElement;

                SvgEditor.svg.node()!.appendChild(svgDoc);

                select(svgDoc)
                    .attr("viewBox", "0 0 600 400")
                    .attr("width", "100%")
                    .attr("height", "100%")
                    .selectAll('path').each(function () {
                        const path = select(this);

                        const newShape = new Shape(path as unknown as Selection<SVGElement, unknown, HTMLElement, any>, 'path');
                        newShape.firstPositionStatus = true;
                        newShape.isSelected = true;
                    });
            };
            reader.readAsText(file);
        }

    }
}