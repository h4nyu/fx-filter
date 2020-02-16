import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import {toNumber } from 'lodash';

interface IProps{
  apiKey: string;
  url: string;
  projectId: string;
  duration: number;
  issues: any[];
  onKeyInput: (value:string) => void;
  onUrlInput: (value:string) => void;
  onProjectIdInput: (value:string) => void;
  onDurationInput: (value:number) => void;
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
    apiKey,
    url,
    projectId,
    duration,
    issues,
    onKeyInput, 
    onUrlInput,
    onDurationInput,
    onProjectIdInput,
    onSubmit,

  } = props;
  return (
    <div>
      <input className="input is-primary" type="text" placeholder="Backlog Url" onChange={(e) => onUrlInput(e.target.value)} value={url}/>
      <input className="input is-primary" type="text" placeholder="Api Key" onChange={(e) => onKeyInput(e.target.value)} value={apiKey}/>
      <input className="input is-primary" type="text" placeholder="Project Id" onChange={(e) => onProjectIdInput(e.target.value)} value={projectId}/>
      <input className="input is-primary" type="text" placeholder="Duration" onChange={(e) => onDurationInput(toNumber(e.target.value))} value={duration}/>
      <div className="button" onClick={() => onSubmit()}> 検索 </div>
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
