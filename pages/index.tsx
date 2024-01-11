import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import schema from "./school";
import React, { useRef, useEffect, useState } from "react";

const Home: NextPage = () => {
  const myViewer = useRef()
  const [mounted, setMounted] = useState(false);

  useEffect(() => { 
    if(mounted && myViewer.current) {
      myViewer.current.schema = schema;
    }
  }, [mounted, myViewer.current]);

  useEffect(() => {    
      import('/home/ben/Documents/workingProjects/db-viewer-component').then(() => setMounted(true));// dynamic import
  }, []);

  return (
    <main>
      <h3>Schema Visualizer</h3>{/* 
      <button type='button' onClick={() => {
      myViewer.current.viewer.zoomOut(); 
      console.log(myViewer.current.getZoom());
      const svgElem = myViewer.current.viewer.svgElem;
      console.log(svgElem);
      //svgElem.setAttribute('style', 'height: 2000px; width: 2000px');
      console.log(svgElem);
    }}>Zoom Out</button>
      <button type='button' onClick={() =>{ 
      myViewer.current.viewer.zoomIn();
      console.log(myViewer.current.getZoom());
      const mySvg = myViewer.current.viewer.svgContainer
      //mySvg.style.height='1000px';
      //mySvg.style.width='1000px';
    }}>Zoom In</button>*/}
      <button type='button' onClick={() => {
      //let minZoomValue;
      const currViewer = myViewer.current.viewer; 
      const mySvg = myViewer.current.viewer.svgContainer;/*
      mySvg.style.height='100%';
      mySvg.style.width='100%';
      mySvg.style.border='10px solid blue'*/
      //console.log('height', 'width', "offset",  mySvg.offsetHeight, mySvg.offsetWidth, "client", mySvg.clientHeight, mySvg.clientWidth, "this", currViewer.viewHeight, currViewer.viewWidth);
      /*
      if (mySvg.offsetWidth > mySvg.offsetHeight) {
        minZoomValue = mySvg.clientWidth / currViewer.viewWidth;
      } else {
        minZoomValue = mySvg.clientHeight / currViewer.viewHeight;
      }
      console.log('minZoom', minZoomValue, "this zoom", currViewer.getZoom());
      const svgElem = myViewer.current.viewer.svgElem;*/
      console.log('This zoom', currViewer.getZoom());
    }}>Log Info</button>
      { mounted && <db-viewer ref={myViewer}/> }
    </main>
  )
}
///home/ben/Documents/workingProjects/db-viewer-component/dist

export default Home
