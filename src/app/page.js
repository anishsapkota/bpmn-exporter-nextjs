"use client"

import React, { useRef,useEffect, useState } from 'react';
import { Button, Upload } from 'antd';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();
  const [fileContent, setFileData] = useState(null);
  const pushRef = useRef();

  const handleFileUpload = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      setFileData(content); 
    };

    reader.readAsText(file);
  };

  const navigateToCreateDiagram = () => {
    router.push('/create-new-diagram');
  };

  useEffect(() => {
    if (fileContent !== null) {
      pushRef.current.click();
    }
  }, [fileContent]);

  return (
    <main className={styles.main}>
      <h1 style={{ textDecoration: 'underline' }}>BPMN.IO</h1>
      <div>
        <Upload customRequest={({ file }) => handleFileUpload(file)} showUploadList={false}>
          <Button>Open existing diagram</Button>
        </Upload>
        <Link ref={pushRef} href={{
          pathname:"/open-diagram",
          query: {
            data: fileContent
          }
        }}></Link>
        <Button onClick={navigateToCreateDiagram} type="primary">
          Create new diagram
        </Button>
      </div>
    </main>
  );
}
