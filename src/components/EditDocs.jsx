import React, { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { getDocsByIdApi } from "../api/document";

const socket = io("http://localhost:3001");

const EditDocs = () => {
  const [content, setContent] = useState("");
  const params = useParams();
  const { id } = params;

  const getDoc = useCallback(async () => {
    try {
      const { success, document } = await (await getDocsByIdApi(id)).data;
      if (success) {
        setContent(document?.content);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [id]);

  const handleTextChange = (value) => {
    setContent(value);
    console.log(value);
    socket.emit("textChange", { value, id });
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
  }, []);

  useEffect(() => {
    socket.emit("joinRoom", id);
  }, [id]);

  useEffect(() => {
    socket.on("updatedContent", (val) => {
      setContent(val);
    });
  }, []);

  useEffect(() => {
    getDoc();
  }, [getDoc]);
  return (
    <div>
      <ReactQuill theme="snow" value={content} onChange={handleTextChange} />
    </div>
  );
};

export default EditDocs;
