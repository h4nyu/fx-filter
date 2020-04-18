import React from 'react';
import styled from 'styled-components';
import { Instruments } from '~/entities';

const ToggleOn = (): React.ReactElement => (<i className="far fa-check-square"></i>);
const ToggleOff = (): React.ReactElement => (<i className="far fa-square"></i>);
const Layout = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
`;
export interface IProps {
  rows: Instruments;
}
export default (props: IProps) => {
  const { rows } = props;
  return (
    <div className="list">
      <span className="title-3">通貨ペア</span>
      {
        rows.map(x => (
          <div className="list-item">
            {x.displayName}
          </div>
        ))
      }
    </div>
  );
};

