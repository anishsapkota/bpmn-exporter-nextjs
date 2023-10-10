"use client"

import React, { useRef, useEffect, useState } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import styles from "./page.module.css"
import { Button,Layout} from 'antd';
import createPdf from "./assets/createPDF.js"

const { Header, Content, Footer} = Layout;

function createNewDiagram() {

  const containerRef = useRef();
  const svgCodeRef = useRef();

  const [modeler, setModeler] = useState(null);        

  useEffect(() => {
    const container = containerRef.current;
    const bpmnMod = new BpmnModeler({
      container,
      keyboard: {
        bindTo: document
      }
    });
  
    setModeler(bpmnMod);
  }, []);
  
  useEffect(() => {
    if (modeler) {
      modeler.createDiagram();
    }
  }, [modeler]);

  var exportArtifacts = async () => {
  
  try {
      const { svg } = await modeler.saveSVG();
      svgCodeRef.current.innerHTML = svg;
  } catch (err) {

      console.error('Error happened saving svg: ', err);
  }
  }
  
  if(modeler) modeler.on('commandStack.changed', exportArtifacts);

  return (

    <div>
      <Layout>
      <Header style={{background:'green', color:"white"}}>Create New BPMN Diagram</Header>
      <Layout>
        <Content>
        <div className={styles.canvas} ref={containerRef}></div>
        <div id="svg-code" hidden ref={svgCodeRef}></div>
        <Button type='primary' onClick={createPdf} >Save as PDF</Button>
        </Content>
      </Layout>
      <Footer>
      </Footer>
    </Layout>
     
    </div>
    
  )
}

export default createNewDiagram;
