"use client"


import React, { useRef, useEffect, useState } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import { Button,Layout} from 'antd';
import createPdf from "../create-new-diagram/assets/createPDF.js"
import {useSearchParams } from 'next/navigation'
import styles from "./page.module.css"


const { Header, Content, Footer} = Layout;

function OpenDiagram() {

  const containerRef = useRef();
  const svgCodeRef = useRef();

  const [modeler, setModeler] = useState(null);        

  const searchParams = useSearchParams()
  const fileData = searchParams.get('data')

  useEffect(() => {
  
    if (fileData && fileData.length > 0) {
      const container = containerRef.current;
      const bpmnMod = new BpmnModeler({
        container,
        keyboard: {
          bindTo: document,
        },
      });

      bpmnMod
        .importXML(fileData)
        .then(({ warnings }) => {
          if (warnings.length) {
            console.log("Warnings", warnings);
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
        setModeler(bpmnMod)
      }
  }, []);

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
      <Header style={{background:'green', color:"white"}}>Open Existing Diagram</Header>
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

export default OpenDiagram;
