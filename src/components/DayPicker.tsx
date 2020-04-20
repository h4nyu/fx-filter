import React, {useState} from 'react';
import styled from 'styled-components';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import moment, {Moment} from "moment";

type IProps = {
  value: Moment|null,
  onChange: (d:Moment) => void;
  placeholder?:string;
}
const Layout = styled.div`
  width: 100%;
  position: relative;
`;
const Overlay = styled.div`
  position: absolute;
  background-color: white;
  z-index:30;

`

export default (
  props: IProps,
) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <Layout
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {
        props.value !== null?<input className="input" value={props.value.format('YYYY-MM-DD')} onChange={() => {}} onClick={()=> setIsActive(!isActive)}/>:
          <input className="input" placeholder={props.placeholder} onClick={()=> setIsActive(!isActive)}/>
      }
      {
        isActive?
          <Overlay>
            <DayPicker 
              onDayClick={(d:string) => {
                setIsActive(!isActive);
                props.onChange(moment(d));
              }}
            />
          </Overlay>
        :null
      }
    </Layout>
  );
}
