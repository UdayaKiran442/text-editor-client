import React, { useEffect, useState } from "react";
import { getDocsApi } from "../api/document";
import { Link } from "react-router-dom";

const Document = () => {
  const [docs, setDocs] = useState([]);
  const getDocs = async () => {
    try {
      const docs = (await getDocsApi()).data;
      if (docs.success) {
        setDocs(docs.docs);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getDocs();
  }, []);
  return (
    <div>
      {docs.map((d, index) => (
        <div key={index}>
          <Link to={`/edit/docs/${d._id}`}>
            <h1>{d.title}</h1>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Document;
