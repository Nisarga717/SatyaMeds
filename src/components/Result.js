// Result.js
import React from 'react';
import styled from 'styled-components';

const ResultContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #3f51b5;
  border-radius: 15px;
  padding: 25px;
  width: 90%;
  max-width: 600px;
  margin: 20px auto;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
`;

const Heading = styled.h2`
  color: #283593;
  font-size: 2rem;
  margin-bottom: 15px;
  text-align: center;
`;

const DataBox = styled.div`
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  margin: 10px 0;
  border: 1px solid #3f51b5;
`;

const DataText = styled.p`
  font-size: 1.1rem;
  color: #333;
  margin: 0;
`;

const StatusText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: ${({ isValid }) => (isValid ? '#4caf50' : 'red')};
  margin-top: 15px;
`;

const Result = ({ data, verificationStatus, medicineDetails }) => {
  return (
    <ResultContainer>
      <Heading>Medicine Verification Result</Heading>
      <DataBox>
        <DataText><strong>Scanned Data:</strong> {data}</DataText>
      </DataBox>
      <StatusText isValid={verificationStatus.isValid}>
        Status: {verificationStatus.message}
      </StatusText>
      {verificationStatus.isValid && medicineDetails && (
        <>
          <DataBox>
            <DataText><strong>Medicine Name:</strong> {medicineDetails.name}</DataText>
          </DataBox>
          <DataBox>
            <DataText><strong>Metadata:</strong> {medicineDetails.metadata}</DataText>
          </DataBox>
          <DataBox>
            <DataText><strong>Manufacturer:</strong> {medicineDetails.manufacturer}</DataText>
          </DataBox>
        </>
      )}
    </ResultContainer>
  );
};

export default Result;
