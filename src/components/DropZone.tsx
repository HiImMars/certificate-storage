import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DropZoneProps {
  onDrop: (files: File[]) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onDrop }) => {
  const onDropHandler = useCallback(
    (acceptedFiles: File[]) => {
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropHandler,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag and drop certificate files here, or click to select files</p>
      )}
    </div>
  );
};

export default DropZone;
