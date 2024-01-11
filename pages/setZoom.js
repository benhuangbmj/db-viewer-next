private async setZoom(
    zoom: number,
    targetX = this.svgContainer.clientWidth / 2,
    targetY = this.svgContainer.clientHeight / 2
  ): Promise<void> {
    let minZoomValue: number;
    if (this.svgContainer.offsetWidth > this.svgContainer.offsetHeight) {
      minZoomValue = this.svgContainer.clientWidth / this.viewWidth;
    } else {
      minZoomValue = this.svgContainer.clientHeight / this.viewHeight;
    }
    if (minZoomValue > zoom) {
      zoom = minZoomValue;
    }

    if (zoom > constant.MAXZOOM_VALUE) {
      zoom = constant.MAXZOOM_VALUE;
    }

    if (targetX == null) targetX = this.svgContainer.clientWidth / 2;
    if (targetY == null) targetY = this.svgContainer.clientHeight / 2;

    this.svgElem.style.height = `${this.viewHeight * zoom}px`;
    this.svgElem.style.width = `${this.viewWidth * zoom}px`;

    const newWidth = this.svgContainer.clientWidth / zoom;
    const newHeight = this.svgContainer.clientHeight / zoom;

    const resizeWidth = newWidth - this.viewBoxVals.width;
    const resizeHeight = newHeight - this.viewBoxVals.height;

    const dividerX = this.svgContainer.clientWidth / targetX;
    const dividerY = this.svgContainer.clientHeight / targetY;

    this.viewBoxVals.width = newWidth;
    this.viewBoxVals.height = newHeight;

    this.viewBoxVals.x -= resizeWidth / dividerX;
    this.viewBoxVals.y -= resizeHeight / dividerY;

    this.viewportAddjustment();

    const newScrollLeft = this.viewBoxVals.x * zoom;
    const newScrollTop = this.viewBoxVals.y * zoom;
    if (
      this.svgContainer.scrollLeft !== newScrollLeft ||
      this.svgContainer.scrollTop !== newScrollTop
    ) {
      this.disbleScrollEvent = true;
      this.svgContainer.scrollLeft = newScrollLeft;
      this.svgContainer.scrollTop = newScrollTop;
    } else {
      this.disbleScrollEvent = false;
    }

    this.minimap.setMinimapViewPoint(this.viewBoxVals);

    if (this.zoom < zoom) {
      this.callbacks?.zoomIn(zoom);
    } else if (this.zoom > zoom) {
      this.callbacks?.zoomOut(zoom);
    }
    this.zoom = zoom;

    if (this.disbleScrollEvent) {
      return new Promise((resolve) =>
        this.viewerEvents.setZoomResolver(resolve)
      );
    } else {
      return Promise.resolve();
    }
  }
}