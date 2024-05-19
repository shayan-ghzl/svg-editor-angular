import { Selection } from 'd3';
import layerManager from './layer-manager';
import Shape from './shape';
import Text from './text';

// --------------------------------

export default class SvgEditor {

    static svg: Selection<SVGSVGElement, unknown, HTMLElement, any>;

    constructor(svg: Selection<SVGSVGElement, unknown, HTMLElement, any>) {
        svg.on("click", function (event: MouseEvent) {
            if (layerManager.layers.length) {
                const lastLayer = layerManager.layers[layerManager.layers.length - 1];
                if (lastLayer) {
                    lastLayer.svgClickHandler(event);
                }
            }
        });

        SvgEditor.svg = svg;
    }

    add(): void {
        this.buttonSelect();
        layerManager.layers.forEach(layer => { layer.unSelect(); });
        Text.createText();
    }

    move(event: MouseEvent): void {
        this.buttonSelect(event);
        layerManager.readyForMove();
    }

    colorChanged(event: Event): void {
        Shape.fill = (event.target as HTMLInputElement).value;

        if (layerManager.currentLayer) {
            layerManager.currentLayer.changeColor((event.target as HTMLInputElement).value);
        }
    }

    borderColorChanged(event: Event): void {
        Shape.stroke = (event.target as HTMLInputElement).value;

        if (layerManager.currentLayer) {
            layerManager.currentLayer.borderColorChanged((event.target as HTMLInputElement).value);
        }
    }

    fontSizeChanged(event: Event): void {
        Text.fontSize = (event.target as HTMLInputElement).value + 'px';

        if (layerManager.currentLayer && layerManager.currentLayer.name === 'text') {
            (layerManager.currentLayer as Text).fontSizeChanged((event.target as HTMLInputElement).value);
        }
    }

    buttonSelect(event: MouseEvent | null = null): void {
        document.querySelectorAll('.canvas button').forEach(button => { button.classList.remove('selected'); });
        if (event) {
            (event.target as HTMLElement).classList.add('selected');
        }
    }
}