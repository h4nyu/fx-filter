import axios from 'axios';
import moment, {Moment} from "moment";
import {range, floor, reduce, toArray} from 'lodash';


const DATE_FORMAT = 'YYYY-MM-DD';

export class BacklogApi {
  apiKey: string;
  url: string; // https://xx.backlog.jp/api/v2
  constructor(apiKey: string, url: string) {
    this.apiKey = apiKey;
    this.url = url;
  }
  getStatus = async (projectId:number)  => {
    const res = await axios.get(`${this.url}/projects/${projectId}/statuses`, {
      params: {
        apiKey: this.apiKey,
      },
    });
    return res.data
  }

  getIssueCount = async (
    projectId: number,
    statusIds: number[],
    dueDateUntil: Moment,
  ):Promise<number> =>  {
    const res = await axios.get(`${this.url}/issues/count`, {
      params: {
        apiKey: this.apiKey,
        projectId: [projectId],
        statusId: statusIds,
        dueDateUntil: dueDateUntil.format(DATE_FORMAT),
      },
    })
    return res.data.count;
  }

  getIssuesOffset = async (
    projectId: number,
    statusIds: number[],
    dueDateUntil: Moment,
    offset: number,
  ) => {
    const res = await axios.get(`${this.url}/issues`, {
      params: {
        apiKey: this.apiKey,
        projectId: [projectId],
        dueDateUntil: dueDateUntil.format(DATE_FORMAT),
        statusId: statusIds,
        count:100,
        sort: "dueDate",
        order: "desc",
        offset: offset,
      },
    });
    return res.data.map((x:any) => {
      return {
        ...x,
        dueDate: moment(x.dueDate),
      }
    });
  }

  getIssues = async (
    projectId: number,
    statusIds: number[],
    dueDateUntil: Moment,
  ) => {
    const count =  await this.getIssueCount(
      projectId,
      statusIds,
      dueDateUntil,
    )
    const offset = 100;
    const offsets = range(0, count, offset);
    const futs = offsets.map(x => {
      return axios.get(`${this.url}/issues`, {
        params: {
          apiKey: this.apiKey,
          projectId: [projectId],
          dueDateUntil: dueDateUntil.format(DATE_FORMAT),
          statusId: statusIds,
          count:100,
          sort: "dueDate",
          order: "desc",
          offset: x
        },
      })
    });
    let results = await Promise.all(futs);
    console.log(results)
    results = results.map((res:any) => {
      return res.data.map((x:any) => ({ ...x, dueDate: moment(x.dueDate) }))
    });
    return toArray(reduce(results, (x:any, y:any) => x.concat(y)));
  }
}
