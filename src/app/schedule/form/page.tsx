'use client';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiCheck } from 'react-icons/fi';
import { Schedule, ScheduleColor } from 'utils/type';
import EditableHeaderLayout from '@components/layout/ComponentHeader';
import CustomToggle from '@components/common/CustomToggle';
import CustomTimePicker from '@components/schedule/TimePicker';
import { useSchedule } from '@hooks/useSchedule';

const COLORS: ScheduleColor[] = [
  ScheduleColor.RED,
  ScheduleColor.BLUE,
  ScheduleColor.GREEN,
  ScheduleColor.ORANGE,
  ScheduleColor.PURPLE,
  ScheduleColor.PINK,
  ScheduleColor.CYAN,
];

export default function ScheduleFormScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = (searchParams.get('mode') as 'edit' | 'create') ?? 'create';
  const scheduleId = searchParams.get('scheduleId') ?? undefined;

  const { userId, selectedDate, updateSchedule, getScheduleById } = useSchedule();

  const existingSchedule = scheduleId ? getScheduleById(scheduleId) : undefined;

  const [content, setContent] = useState('');
  const [isAllDay, setIsAllDay] = useState(true);
  const [color, setColor] = useState<ScheduleColor>(ScheduleColor.BLUE);
  const [startHour, setStartHour] = useState('09');
  const [startMinute, setStartMinute] = useState('00');
  const [endHour, setEndHour] = useState('10');
  const [endMinute, setEndMinute] = useState('00');
  useEffect(() => {
    if (mode === 'edit' && existingSchedule) {
      setContent(existingSchedule.content);
      setIsAllDay(existingSchedule.isAllDay);
      setColor(existingSchedule.color);
      if (!existingSchedule.isAllDay) {
        setStartHour(existingSchedule.startTime?.slice(0, 2) ?? '09');
        setStartMinute(existingSchedule.startTime?.slice(3, 5) ?? '00');
        setEndHour(existingSchedule.endTime?.slice(0, 2) ?? '10');
        setEndMinute(existingSchedule.endTime?.slice(3, 5) ?? '00');
      }
    }
  }, [mode, existingSchedule]);

  const handleSave = async () => {
    if (!userId || !selectedDate || !content.trim()) return;

    if (!isAllDay) {
      const start = parseInt(startHour + startMinute, 10);
      const end = parseInt(endHour + endMinute, 10);
      if (start >= end) {
        alert('시작 시간은 종료 시간보다 빨라야 합니다.');
        return;
      }
    }

    const newSchedule: Schedule = {
      id: scheduleId ?? uuidv4(),
      content,
      startDate: selectedDate,
      endDate: selectedDate,
      isAllDay,
      color,
    };

    if (!isAllDay) {
      newSchedule.startTime = `${startHour}:${startMinute}`;
      newSchedule.endTime = `${endHour}:${endMinute}`;
    }

    await updateSchedule(userId, selectedDate, newSchedule);
    router.push(`/schedule?scheduleId=${newSchedule.id}`);
  };

  return (
    <EditableHeaderLayout title="일정 등록" mode="edit" onSave={handleSave}>
      <FormWrapper>
        <LabelRow>
          <HighlightBar />
          <Label>일정 내용</Label>
        </LabelRow>

        <StyledInput
          placeholder="일정 내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Row>
          <LabelRow>
            <HighlightBar />
            <Label>종일</Label>
          </LabelRow>
          <CustomToggle isOn={isAllDay} onToggle={() => setIsAllDay((prev) => !prev)} />
        </Row>

        {!isAllDay && (
          <PickerWrapper>
            <CustomTimePicker
              label="시작 시간"
              hour={startHour}
              minute={startMinute}
              setHour={setStartHour}
              setMinute={setStartMinute}
            />
            <CustomTimePicker
              label="종료 시간"
              hour={endHour}
              minute={endMinute}
              setHour={setEndHour}
              setMinute={setEndMinute}
            />
          </PickerWrapper>
        )}

        <Spacing />

        <LabelRow>
          <HighlightBar />
          <Label>색상 선택</Label>
        </LabelRow>

        <ColorRow>
          {COLORS.map((c) => (
            <ColorDot key={c} selected={color === c} color={c} onClick={() => setColor(c)}>
              {color === c && <FiCheck size={14} color="#fff" />}
            </ColorDot>
          ))}
        </ColorRow>
      </FormWrapper>
    </EditableHeaderLayout>
  );
}

const FormWrapper = styled.div`
  padding: 16px;
  margin-top: 10px;
`;

const LabelRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const HighlightBar = styled.div`
  width: 3px;
  height: 16px;
  background-color: #c7c7c7;
  margin-right: 4px;
`;

const Label = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-left: 4px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 8px;
  margin-bottom: 40px;
  color: #333;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const PickerWrapper = styled.div`
  margin-left: 10px;
  margin-bottom: 20px;
`;

const Spacing = styled.div`
  height: 20px;
`;

const ColorRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ColorDot = styled.button<{ selected: boolean; color: string }>`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border: ${({ selected }) => (selected ? '2px solid #333' : 'none')};
  background-color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
