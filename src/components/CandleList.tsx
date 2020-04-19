import React from 'react';
import styled from 'styled-components';
import { Candles, Candle } from '~/entities';
const Column = styled.div`
    display: flex;
    flex-grow: 1;
    flex-basis: 0;
  `;

const RowLayout = styled.div`
    cursor: pointer;
    display: flex;
    align-items: space-between;
    justify-content: space-between;
    flex-basis: auto;
  `;
const Label = styled.span`
  font-weight: bold;
`

const Header = () => {
  return <RowLayout className="card">
    <Column><Label> time  </Label></Column>
    <Column><Label> open  </Label></Column>
    <Column><Label> close </Label></Column>
    <Column><Label> high  </Label></Column>
    <Column><Label> low   </Label></Column>
    <Column><Label> volume   </Label></Column>
  </RowLayout>
}

const Item = (props:{row:Candle}) => {
  const {row} = props;
  return <RowLayout className="card">
    <Column>{row.time.format("YYYY-MM-DD HH:mm")} </Column>
    <Column>{row.mid.o} </Column>
    <Column>{row.mid.c} </Column>
    <Column>{row.mid.h} </Column>
    <Column>{row.mid.l} </Column>
    <Column>{row.volume} </Column>
  </RowLayout>
}

const Rows = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y:scroll;
  `;
export interface IProps {
  rows: Candles;
}
const Check = (props: IProps) => {
  const {rows} = props;
  const Layout = styled.div`
    display: flex;
    flex-direction: column;
  `;
  return (
    <>
      <Header/>
      <Rows>
        {
          rows.map((row, i) => <Item key={i} row={row} />)
        }
      </Rows>
    </>
  );
};

export default Check;
