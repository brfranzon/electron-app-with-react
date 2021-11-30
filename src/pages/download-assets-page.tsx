import { useState } from "react";
const { ipcRenderer } = window.require("electron");

const DownloadAssetsPage = () => {
  const [downloadStatus, setDownloadStatus] = useState("");

  const downloadButton = () => {
    ipcRenderer.invoke("downloadAssets");
    setDownloadStatus("Starting....");
  };

  ipcRenderer.on("downloadEnd", (e: Event, value: string) => {
    setDownloadStatus(value);
  });

  return (
    <div>
      <button onClick={() => downloadButton()}> Download </button>
      {downloadStatus && <div> {downloadStatus} </div>}
    </div>
  );
};

export default DownloadAssetsPage;
