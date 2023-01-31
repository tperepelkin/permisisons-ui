import { createLayerComponent } from '@react-leaflet/core';
import { BaseMarker } from './BaseMarker';

const createMarker = ({ position, ...options }, ctx) => {
  const instance = new BaseMarker(position, { ...options });
  
  return { 
    instance, 
    context: { ...ctx, overlayContainer: instance, } 
  };
}

const updateMarker = (marker, props, prevProps) => {
  const { position, keepAtCenter, icon, zIndexOffset, opacity, draggable, rotationOrigin, rotationAngle } = props;

  if (prevProps.position !== position) {
    marker.setLatLng(position);
  }

  if (icon && icon !== prevProps.icon) {
    marker.setIcon(icon);
  }

  if (zIndexOffset && zIndexOffset !== prevProps.zIndexOffset) {
    marker.setZIndexOffset(zIndexOffset);
  }

  if (opacity && opacity !== prevProps.opacity) {
    marker.setOpacity(opacity);
  }

  if (marker.dragging && draggable !== prevProps.draggable) {
    if (draggable === true) {
      marker.dragging.enable();
    } else {
      marker.dragging.disable();
    }
  }

  if (rotationAngle !== null && rotationAngle !== void 0) {
    marker.setRotationAngle(rotationAngle);
  }
  
  if (rotationOrigin !== prevProps.rotationOrigin) {
    marker.setRotationOrigin(rotationOrigin);
  }
}

export const RotatedMarker = createLayerComponent(createMarker, updateMarker);