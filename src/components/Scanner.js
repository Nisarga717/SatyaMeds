// Scanner.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';
import jsQR from 'jsqr';
import MedicineRegistryABI from './MedicineRegistryABI.json';
import Result from './Result';

const CONTRACT_ADDRESS = "0x477d93fF35C32d8C09eF640bb327c88e2db4e5E3";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: rgba(255, 255, 255, 0.85);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  color: #3f51b5;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
`;

const FileInput = styled.input`
  margin: 20px 0;
  padding: 10px;
  border: 2px solid #3f51b5;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;

  &:hover {
    border-color: #283593;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Scanner = () => {
  const [error, setError] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [medicineDetails, setMedicineDetails] = useState(null);

  const verifyMedicine = async (medicineId) => {
    if (!window.ethereum) {
      setVerificationStatus({ isValid: false, message: 'MetaMask not found' });
      return;
    }

    try {
      const provider = new Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, MedicineRegistryABI, signer);

      const [isPresent, name, metadata, manufacturer] = await contract.checkMedicine(medicineId);

      if (isPresent) {
        setVerificationStatus({ isValid: true, message: 'Real Medicine' });
        setMedicineDetails({ name, metadata, manufacturer });
      } else {
        setVerificationStatus({ isValid: false, message: 'Fake Medicine' });
      }
    } catch (err) {
      console.error("Error verifying medicine:", err);
      setVerificationStatus({ isValid: false, message: 'Error while verifying medicine' });
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const imageDataUrl = reader.result;

        const img = new Image();
        img.src = imageDataUrl;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const context = canvas.getContext('2d');
          context.drawImage(img, 0, 0);
          const imageData = context.getImageData(0, 0, img.width, img.height);
          const code = jsQR(imageData.data, img.width, img.height);

          if (code) {
            const medicineId = parseInt(code.data, 10);

            setScannedData(code.data);
            if (!isNaN(medicineId)) {
              verifyMedicine(medicineId);
            } else {
              setVerificationStatus({ isValid: false, message: 'Invalid QR code format' });
            }
          } else {
            setVerificationStatus({ isValid: false, message: 'Invalid QR code data' });
          }
        };

        img.onerror = (err) => {
          console.error("Error loading image:", err);
          setError("Failed to load the image. Please try a different file.");
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <Heading>Upload Medicine QR Code</Heading>
      <FileInput type="file" accept="image/*" onChange={handleFileChange} />
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {scannedData && verificationStatus && (
        <Result 
          data={scannedData} 
          verificationStatus={verificationStatus} 
          medicineDetails={medicineDetails} 
        />
      )}
    </Container>
  );
};

export default Scanner;
