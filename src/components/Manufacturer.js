// src/components/ManufacturerForm.js
import React, { useState } from "react";
import { BrowserProvider, Contract } from 'ethers';
import { QRCodeCanvas } from "qrcode.react";
import './Manufacturer.css';
import MedicineRegistryABI from "./MedicineRegistryABI.json";

const CONTRACT_ADDRESS = "0x477d93fF35C32d8C09eF640bb327c88e2db4e5E3";

const ManufacturerForm = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [metadata, setMetadata] = useState("");
    const [qrCodeGenerated, setQrCodeGenerated] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!window.ethereum) {
            alert("Please install MetaMask to interact with the blockchain");
            return;
        }

        try {
            const provider = new BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contract = new Contract(CONTRACT_ADDRESS, MedicineRegistryABI, signer);

            const transaction = await contract.addMedicine(parseInt(id, 10), name, metadata);
            await transaction.wait(); // Wait for the transaction to be mined

            alert("Medicine added to the blockchain!");
            setQrCodeGenerated(true);
        } catch (error) {
            console.error("Error adding medicine:", error);
            alert("An error occurred while adding medicine. Please check the console.");
        }
    };

    const handleDownloadQR = () => {
        const qrCodeCanvas = document.getElementById("qrCode");
        const pngUrl = qrCodeCanvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");

        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${id}_QRCode.png`; // Corrected string interpolation
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div className="manufacturer-form-container">
            <h2 className="form-title">Register Medicine</h2>
            <form onSubmit={handleSubmit} className="form">
                <label className="form-label" htmlFor="id">Medicine ID</label>
                <input
                    type="text"
                    id="id"
                    placeholder="Enter Medicine ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="form-input"
                    required
                />

                <label className="form-label" htmlFor="name">Medicine Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter Medicine Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    required
                />

                <label className="form-label" htmlFor="metadata">Metadata</label>
                <textarea
                    id="metadata"
                    placeholder="Enter Metadata"
                    value={metadata}
                    onChange={(e) => setMetadata(e.target.value)}
                    className="form-textarea"
                    required
                ></textarea>

                <button type="submit" className="form-button">Submit & Generate QR Code</button>
            </form>

            {qrCodeGenerated && (
                <div className="qr-container">
                    <QRCodeCanvas id="qrCode" value={id.toString()} size={128} />
                    <button onClick={handleDownloadQR} className="download-button">Download QR Code</button>
                </div>
            )}
        </div>
    );
};

export default ManufacturerForm;
