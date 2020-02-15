import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

interface IProps{
  issues: any[],
  onKeyInput: (key:string) => void;
  onUrlInput: (key:string) => void;
  onSubmit: () => void;
}
const Th = styled.th`
  text-align: left;
  border: 1px solid #dddddd;
  padding: 0.5em;
`;

const Component = (
  props: IProps,
) => {
  const {
    onKeyInput, 
    onUrlInput,
    onSubmit,
    issues,
  } = props;
  return (
    <div>
      <TextField 
        label="Backlog" 
        onChange={(e) => onUrlInput(e.target.value)}
      />
      <TextField 
        label="API Key" 
        onChange={(e) => onKeyInput(e.target.value)}
      />
      <Button
        onClick={() => onSubmit()}
      > Submit </Button>
    <div> 件数{issues.length} </div>

    <table className="table">
      <tr>
        <th>キー</th>
        <th>件名</th>
        <th>状態</th>
        <th>担当者</th>
        <th>期限日</th>
      </tr>
      {issues.map( (x:any) => (
        <tr key={x.id}>
          <Th> {x.issueKey} </Th>
          <Th> {x.summary} </Th>
          <Th> {x.assignee.name} </Th>
          <Th> {x.status.name} </Th>
          <Th> {x.dueDate.format("YYYY-MM-DD")} </Th>
        </tr>
    ))}
    </table>
    </div>
  )
}

export default Component;
