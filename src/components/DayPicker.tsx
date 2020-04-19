import React, {useState} from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import moment, {Moment} from "moment";

type IProps = {
  value: Moment|null,
  onChange: (d:Moment) => void;
  placeholder?:string;
}

export default (
  props: IProps,
) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div>
      {
        props.value !== null?<input className="input" value={props.value.format('YYYY-MM-DD')} onClick={()=> setIsActive(!isActive)}/>:
          <input className="input" placeholder={props.placeholder} onClick={()=> setIsActive(!isActive)}/>
      }
      
      {
        isActive?
        <DayPicker 
          onDayClick={(d:string) => {
            setIsActive(!isActive);
            props.onChange(moment(d));
          }}
        />:null
      }
    </div>
  );
}
