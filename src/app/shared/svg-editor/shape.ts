import { D3DragEvent, Selection, drag, pointer } from 'd3';
import layerManager from './layer-manager';

let SHAPE_ID = 0;

export default class Shape {
    shape: Selection<SVGElement, unknown, HTMLElement, any>;
    firstPositionStatus: boolean;
    isSelected: boolean;
    name: string;
    id: number;
    static fill = '#000';
    static stroke = '#000';

    constructor(shape: Selection<SVGElement, unknown, HTMLElement, any>, name: string) {
        this.shape = shape;
        this.firstPositionStatus = false;
        this.isSelected = false;
        this.name = name;
        this.id = SHAPE_ID++;

        this.shape.on('click', () => {
            this.isSelected = true;
            layerManager.currentLayer = this;
        });

        this.shape.call(drag<SVGElement, unknown>()
            .on('start', this.dragStarted.bind(this))
            .on('drag', this.dragged.bind(this)));

        this.shape.style('fill', Shape.fill).style('stroke', Shape.stroke);

        layerManager.addLayer(this);
    }

    unSelect(): void {
        this.isSelected = false;
        this.shape.style('cursor', 'pointer').attr('class', '');
    }

    move(): void {
        this.isSelected = true;
        this.shape.style('cursor', 'move');
    }

    dragged(event: D3DragEvent<SVGElement, MouseEvent, any>): void {
        if (this.isSelected) {
            const dx = event.dx;
            const dy = event.dy;

            if (this.name === 'path') {
                this.shape.attr('transform', `translate(${event.x}, ${event.y})`);
            } else {
                this.shape.attr('x', Number(this.shape.attr('x')) + dx)
                    .attr('y', Number(this.shape.attr('y')) + dy);
            }
        }
    }

    dragStarted(event: D3DragEvent<SVGElement, MouseEvent, any>): void {
        if (this.isSelected) {
            layerManager.currentLayer = this;
            event.sourceEvent?.stopPropagation();
        }
    }

    changeColor(color: string): void {
        if (this.isSelected) {
            this.shape.style('fill', color);
        }
    }

    borderColorChanged(color: string): void {
        if (this.isSelected) {
            this.shape.style('stroke', color);
        }
    }

    svgClickHandler(event: MouseEvent): void {
        if (!this.firstPositionStatus) {
            const [x, y] = pointer(event);

            this.shape.attr('x', x)
                .attr('y', y);

            this.firstPositionStatus = true;
            this.isSelected = true;
        }
    }
}