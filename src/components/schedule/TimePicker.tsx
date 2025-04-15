'use client';
import React, { useState } from 'react';
import styled from '@emotion/styled';

interface CustomTimePickerProps {
  label: string;
  hour: string;
  minute: string;
  setHour: (val: string) => void;
  setMinute: (val: string) => void;
}

export default function CustomTimePicker({
  label,
  hour,
  minute,
  setHour,
  setMinute,
}: CustomTimePickerProps) {
  const [showModal, setShowModal] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Button onClick={() => setShowModal(true)}>
        <DisplayText>{`${hour || '--'}시 ${minute || '--'}분`}</DisplayText>
      </Button>

      {showModal && (
        <ModalBackground>
          <RowBox>
            <Select value={hour} onChange={(e) => setHour(e.target.value)}>
              {hours.map((h) => (
                <option key={h} value={h}>
                  {`${h}시`}
                </option>
              ))}
            </Select>

            <Select value={minute} onChange={(e) => setMinute(e.target.value)}>
              {minutes.map((m) => (
                <option key={m} value={m}>
                  {`${m}분`}
                </option>
              ))}
            </Select>

            <Button onClick={() => setShowModal(false)} style={{ marginLeft: 12 }}>
              <TextButton>확인</TextButton>
            </Button>
          </RowBox>
        </ModalBackground>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.span`
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
`;

const DisplayText = styled.span`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  color: #303030;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: transparent;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fcfcfcd1;
  color: #22272b;
  border-radius: 12px;
  padding: 16px;
  align-items: center;
`;

const Select = styled.select`
  width: 120px;
  height: 50px;
  background-color: transparent;
  text-align: center;
  font-size: 16px;
  color: #22272b;
  border: 1px solid #c8c8c8;
  border-radius: 4px;
  margin-right: 8px;
`;

const TextButton = styled.span`
  font-weight: 500;
  background-color: #22272b;
  padding: 4px 10px;
  border-radius: 4px;
  color: white;
  text-align: center;
`;
