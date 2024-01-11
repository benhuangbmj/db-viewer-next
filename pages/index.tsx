declare global {
  namespace JSX {
    interface IntrinsicElements {
      "db-viewer": {
        ref: {
          current: DbViewer;
        };
      };
    }
  }
}

import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import schema from "../schema/school";
import React, { useRef, useEffect, useState } from "react";
import type DbViewer from 'db-viewer-component';

const Home: NextPage = () => {
  const myViewer = useRef<DbViewer>()
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if(myViewer.current) {
      myViewer.current.schema = schema;
    }
  }, [mounted, myViewer.current]);

  useEffect(() => {    
      import('db-viewer-component').then(() => setMounted(true));// dynamic import
  }, []);

  return (
    <main>
      <h3>Schema Visualizer</h3>
      <p>with <a href='https://github.com/ayeressian/db-viewer-component' target='_blank'><i>ayeressian/db-viewer-component</i></a></p>      
      { mounted && <db-viewer ref={myViewer}/> }      
    </main>
  )
}

export default Home
