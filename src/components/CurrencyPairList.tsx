import React from 'react';
import styled from 'styled-components';
import { CurrencyPair } from '~/entities';

const ToggleOn = (): React.ReactElement => (<i className="far fa-check-square"></i>);
const ToggleOff = (): React.ReactElement => (<i className="far fa-square"></i>);
const Layout = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
`;
export interface IProps {
}
export default (props: IProps) => {
  const rows = Object.keys(CurrencyPair)
  return (
    <div className="list">
      <span className="title-3">通貨ペア</span>
      {
        rows.map(x => (
          <div className="list-item">
            {x.replace("_", "/")}
          </div>
        ))
      }
    </div>
  );
};

