import React, { useCallback, useState } from 'react';

import { useSetRecoilState } from 'recoil';

import { FormControl, FormControlLabel, Modal, Radio, RadioGroup, TextField } from '@mui/material';
import axios from 'axios';
import _ from 'lodash';

import { ReactComponent as AnyIconBox } from '@assets/svg/AnyFood.svg';
import { ReactComponent as ChineseIconBox } from '@assets/svg/ChineseFood.svg';
import { ReactComponent as ClockIcon } from '@assets/svg/Clock.svg';
import { ReactComponent as JapaneseIconBox } from '@assets/svg/JapaneseFood.svg';
import { ReactComponent as KoreanIconBox } from '@assets/svg/KoreanFood.svg';
import { ReactComponent as WesternIconBox } from '@assets/svg/WesternFood.svg';
import { CheckedIcon, LogoImage } from '@components';
import { Deadline, MatchRegister, Menu, RegisteredComponents, baseUrl } from '@interfaces';
import { registeredEntitiesAtom } from '@states';

import {
  FormControlLabelCusto,
  IconButton,
  IconWrapper,
  ImagesBox,
  ModalWrapper,
  SubTitleTypo,
  SubmitButton,
  TitleTypo,
} from './styled';

interface RegiModalProps {
  open: boolean;
  handleClose: () => void;
}

const IconBox = (props: {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  style?: React.CSSProperties;
}) => (
  <IconWrapper>
    <IconButton sx={{ ...props.style }}>
      <props.Icon style={{ width: '100%', height: '100%' }} />
    </IconButton>
  </IconWrapper>
);

export const RegisterModal: React.FC<RegiModalProps> = ({ open, handleClose }) => {
  const [food, setFood] = useState('kor');
  const [deadline, setDeadline] = useState('5');
  const [isAgeShow, setIsAgeShow] = useState(0);
  const [comment, setComment] = useState('');
  const setRegisteredEntities = useSetRecoilState(registeredEntitiesAtom);

  const handleFoodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFood((event.target as HTMLInputElement).value);
  };

  const handleDeadlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline((event.target as HTMLInputElement).value);
  };

  const handleIsAgeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setIsAgeShow(_.toNumber((event.target as HTMLInputElement).value));

  const submitHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      // 1. 페이지 리로드 방지
      e.preventDefault();

      // 2. 데이터 가공
      const submitData: MatchRegister = {
        menu: food as Menu,
        deadline: _.toNumber(deadline) as Deadline,
        isAge: isAgeShow === 1 ? true : false,
        comment: comment,
        userId: 0,
      };

      // // 3. api 보내기 :: 성공시 모달 닫기
      // axios.post(baseUrl, submitData).then((res) => {
      //   const updatedRegis = res.data as RegisteredComponents;
      //   setRegisteredEntities(updatedRegis);
      //   handleClose();
      // });
      console.log('menus!!', submitData);
      handleClose();

      // 4. 모달 내용 초기화 (성공 여부와 관계없이)
      setFood('kor');
      setDeadline('5');
      setIsAgeShow(0);
      setComment('');
    },
    [comment, deadline, food, handleClose, isAgeShow, setRegisteredEntities],
  );
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <form onSubmit={submitHandler}>
          <ModalWrapper>
            <TitleTypo>
              등록하기
              <LogoImage width="12%" style={{ marginLeft: '20px' }} />
            </TitleTypo>
            <FormControl>
              <SubTitleTypo>
                선호하는 메뉴를 골라주세요
                <RadioGroup row name="food-button-group" value={food} onChange={handleFoodChange}>
                  <ImagesBox>
                    <FormControlLabel
                      value="kor"
                      control={
                        <Radio
                          icon={<IconBox Icon={KoreanIconBox} />}
                          checkedIcon={<IconBox Icon={KoreanIconBox} style={{ backgroundColor: '#e8f8bf' }} />}
                        />
                      }
                      label="한식"
                      labelPlacement="bottom"
                      sx={{ span: { fontSize: '1.6rem' } }}
                    />
                    <FormControlLabel
                      value="west"
                      control={
                        <Radio
                          icon={<IconBox Icon={WesternIconBox} />}
                          checkedIcon={<IconBox Icon={WesternIconBox} style={{ backgroundColor: '#e8f8bf' }} />}
                        />
                      }
                      label="양식"
                      labelPlacement="bottom"
                      sx={{ span: { fontSize: '1.6rem' } }}
                    />
                    <FormControlLabel
                      value="jpn"
                      control={
                        <Radio
                          icon={<IconBox Icon={JapaneseIconBox} />}
                          checkedIcon={<IconBox Icon={JapaneseIconBox} style={{ backgroundColor: '#e8f8bf' }} />}
                        />
                      }
                      label="일식"
                      labelPlacement="bottom"
                      sx={{ span: { fontSize: '1.6rem' } }}
                    />
                    <FormControlLabel
                      value="chn"
                      control={
                        <Radio
                          icon={<IconBox Icon={ChineseIconBox} />}
                          checkedIcon={<IconBox Icon={ChineseIconBox} style={{ backgroundColor: '#e8f8bf' }} />}
                        />
                      }
                      label="중식"
                      labelPlacement="bottom"
                      sx={{ span: { fontSize: '1.6rem' } }}
                    />
                    <FormControlLabel
                      value="others"
                      control={
                        <Radio
                          icon={<IconBox Icon={AnyIconBox} />}
                          checkedIcon={<IconBox Icon={AnyIconBox} style={{ backgroundColor: '#e8f8bf' }} />}
                        />
                      }
                      label="아무거나"
                      labelPlacement="bottom"
                      sx={{ span: { fontSize: '1.6rem' } }}
                    />
                  </ImagesBox>
                </RadioGroup>
              </SubTitleTypo>
            </FormControl>
            <FormControl>
              <SubTitleTypo>
                몇 분동안 등록상태를 유지할까요?
                <RadioGroup row name="time-button-group" value={deadline} onChange={handleDeadlineChange}>
                  <ImagesBox>
                    <FormControlLabel
                      value="5"
                      control={
                        <Radio
                          icon={<IconBox Icon={ClockIcon} />}
                          checkedIcon={<IconBox Icon={ClockIcon} style={{ backgroundColor: '#e8f8bf' }} />}
                        />
                      }
                      label="5분"
                      labelPlacement="bottom"
                      sx={{ span: { fontSize: '1.6rem' } }}
                    />
                    <FormControlLabel
                      value="10"
                      control={
                        <Radio
                          icon={<IconBox Icon={ClockIcon} />}
                          checkedIcon={<IconBox Icon={ClockIcon} style={{ backgroundColor: '#e8f8bf' }} />}
                        />
                      }
                      label="10분"
                      labelPlacement="bottom"
                      sx={{ span: { fontSize: '1.6rem' } }}
                    />
                    <FormControlLabel
                      value="15"
                      control={
                        <Radio
                          icon={<IconBox Icon={ClockIcon} />}
                          checkedIcon={<IconBox Icon={ClockIcon} style={{ backgroundColor: '#e8f8bf' }} />}
                        />
                      }
                      label="15분"
                      labelPlacement="bottom"
                      sx={{ span: { fontSize: '1.6rem' } }}
                    />
                    <FormControlLabel
                      value="20"
                      control={
                        <Radio
                          icon={<IconBox Icon={ClockIcon} />}
                          checkedIcon={<IconBox Icon={ClockIcon} style={{ backgroundColor: '#e8f8bf' }} />}
                        />
                      }
                      label="20분"
                      labelPlacement="bottom"
                      sx={{ span: { fontSize: '1.6rem' } }}
                    />
                  </ImagesBox>
                </RadioGroup>
              </SubTitleTypo>
            </FormControl>
            <SubTitleTypo>
              나이 공개 여부를 체크해주세요.
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                row
                sx={{ paddingLeft: '3%' }}
                value={isAgeShow}
                onChange={handleIsAgeChange}
              >
                <FormControlLabelCusto
                  value="1"
                  control={<Radio sx={{ '&.Mui-checked': { color: 'green' } }} />}
                  label="공개"
                />
                <FormControlLabelCusto
                  value="0"
                  control={<Radio sx={{ '&.Mui-checked': { color: 'green' } }} />}
                  label="비공개"
                />
              </RadioGroup>
            </SubTitleTypo>
            <SubTitleTypo>
              한 줄 코멘트 (30자 제한)
              <TextField
                value={comment}
                sx={{
                  padding: 0,
                  width: '100%',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    padding: '1%',
                    fontWeight: 700,
                    fontSize: '1.8rem',
                    textAlign: 'justify',
                  },
                }}
                onChange={(e) => setComment(e.target.value)}
                inputProps={{ maxLength: 30 }}
              />
            </SubTitleTypo>

            <SubmitButton type="submit">제출하기</SubmitButton>
          </ModalWrapper>
        </form>
      </Modal>
    </>
  );
};
