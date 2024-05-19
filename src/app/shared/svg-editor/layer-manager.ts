import Shape from "./shape";
import Text from "./text";

export default {
    layers: [] as (Shape | Text)[],
    _currentLayer: null as Text | Shape | null,

    get currentLayer(): Text | Shape | null {
        return this._currentLayer;
    },

    set currentLayer(layer: Text | Shape | null) {
        this._currentLayer = layer;
        this.layers.forEach(lyr => {
            if (lyr !== layer && lyr) {
                lyr.unSelect();
            }
        });
        if (this._currentLayer && this._currentLayer.shape) {
            this._currentLayer.shape.attr('class', 'selected');
        }
    },

    readyForMove(): void {
        this.layers.forEach(layer => { 
            layer.shape.attr('class', '');
            layer.move();
         });
    },

    addLayer(layer: Shape | Text): void {
        this.layers.push(layer);
        this.currentLayer = layer;
    },
};