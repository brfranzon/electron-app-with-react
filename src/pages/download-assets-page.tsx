import { useState } from "react";

const DownloadAssetsPage = () => {
  const [downloadStart, setDownloadStart] = useState("");

  const { ipcRenderer } = window.require("electron");
  const { dialog } = window.require("electron");

  console.log(dialog);

  const downloadButton = async () => {
    await ipcRenderer.invoke("downloadAssets");
    setDownloadStart('Starting....');
  };

  ipcRenderer.on('downloadEnd', (e: any, value: any)=>{
    setDownloadStart(value);
  })

  return (
    <div>
      <button onClick={() => downloadButton()}> Download </button>
      {downloadStart && <div> {downloadStart} </div>}
    </div>
  );
};

export default DownloadAssetsPage;
