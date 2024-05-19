import { Selection } from 'd3';
import Shape from './shape';
import SvgEditor from './svg-editor';

export default class Text extends Shape {
    static fontSize = '16px';

    constructor(text: Selection<SVGTextElement, unknown, HTMLElement, any>) {
        super(text as unknown as Selection<SVGElement, unknown, HTMLElement, any>, 'text');

        text.on('dblclick', this.editText.bind(this));
    }

    editText(event: MouseEvent): void {
        const textElement = event.target as SVGTextElement;

        const currentText = textElement.textContent || '';

        const bbox = textElement.getBBox();

        if (!textElement.parentNode) return;

        textElement.parentNode.removeChild(textElement);

        const inputField = SvgEditor.svg.append('foreignObject')
            .attr('x', bbox.x)
            .attr('y', bbox.y)
            .attr('width', bbox.width)
            .attr('height', bbox.height)
            .html(`<input type="text" value="${currentText}" style="width:${bbox.width}px; height:${bbox.height}px; font-size:${Text.fontSize};"/>`)
            .select('input')
            .node() as HTMLInputElement;

        inputField.focus();

        inputField.addEventListener('blur', () => {
            textElement.textContent = inputField.value;
            (inputField.parentNode as SVGForeignObjectElement).remove();
            SvgEditor.svg.node()!.appendChild(textElement);
        });

        inputField.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                textElement.textContent = inputField.value;
                (inputField.parentNode as SVGForeignObjectElement).remove();
                SvgEditor.svg.node()!.appendChild(textElement);
            }
        });
    }

    fontSizeChanged(size: string): void {
        this.shape.attr('font-size', size);
        Text.fontSize = size + 'px';
    }

    static createText(): Text {       
        const text = SvgEditor.svg.append('text')
            .attr('x', '-30')
            .attr('y', '-30')
            .attr('font-size', Text.fontSize)
            .text('New Text')
            .style('fill', Shape.fill)
            .style('stroke', Shape.stroke)
            .style('cursor', 'pointer')
            .style('user-select', 'none');

        const newText = new Text(text);
        return newText;
    }
}