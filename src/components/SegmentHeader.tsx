import React from 'react';
import styled from 'styled-components';
import {Segment } from '~/entities';
import CandleList from './CandleList';

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: auto;
  `;

const HeaderLayout = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;


export interface IProps {
  onClear: () => void;
}
export default (props: IProps) => {
  const { onClear } = props;
  const Header = () => {
    return (
      <HeaderLayout>
        <div>通貨ペア</div>
        <div>方向</div>
        <div>確率</div>
        <div>ローソク足</div>
        <div>収集期間</div>
        <div className="button" onClick={() => onClear()}>全削除</div>
      </HeaderLayout>
    )
  }
  return (
    <Layout className="card">
      <Header/>
    </Layout>
  );
};
