import L from 'leaflet';

const oldIE = L.DomUtil.TRANSFORM === 'msTransform';

L.BaseMarker = L.Marker.extend({
  options: {
    rotationAngle: 0,
    rotationOrigin: '',
    bubblingMouseEvents: false,
    autoPanOnFocus: false,
    autoPan: false,
  },

  initialize: function (latlng, options) {
    L.Marker.prototype.initialize.call(this);

    L.Util.setOptions(this, options);
    this._latlng = L.latLng(latlng);

    let iconAnchor = this.options.icon?.options?.iconAnchor;
    if (iconAnchor) {
      iconAnchor = `${iconAnchor[0]}px ${iconAnchor[1]}px`;
    }

    this.options.rotationOrigin = this.options.rotationOrigin || iconAnchor || 'center';
    this.options.rotationAngle = this.options.rotationAngle || 0;

    // Ensure marker keeps rotated during dragging
    this.on('drag', function (e) {
      e.target._applyRotation();
    })

    this.on('click', function(e) {
      if (this.options.onClick) {
        this.options.onClick();
      }
    })
  },

  onRemove: function (map) {
    L.Marker.prototype.onRemove.call(this, map);
  },

  _setPos: function (pos) {
    L.Marker.prototype._setPos.call(this, pos);
    this._applyRotation();
  },

  _applyRotation: function () {
    if (this.options.rotationAngle) {
      this._icon.style[L.DomUtil.TRANSFORM + 'Origin'] = this.options.rotationOrigin;

      if (oldIE) {
        // IE 9, it uses 2D rotation
        this._icon.style[L.DomUtil.TRANSFORM] = `rotate(${this.options.rotationAngle}deg)`;
      } else {
        // Modern browsers,supports 3D accelerated version
        this._icon.style[L.DomUtil.TRANSFORM] += `rotateZ(${this.options.rotationAngle}deg)`;
      }
    }
  },

  setRotationAngle: function (angle) {
    this.options.rotationAngle = angle;
    this.update();
    return this;
  },

  setRotationOrigin: function (origin) {
    this.options.rotationOrigin = origin;
    this.update();
    return this;
  }
});

L.baseMarker = function (latlng, options) {
  return new L.BaseMarker(latlng, options);
}

export const BaseMarker = L.BaseMarker;