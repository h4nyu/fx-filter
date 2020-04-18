import {
  observable,
  action,
} from 'mobx';
import {sortBy, filter, toNumber, toString} from 'lodash';
import {BacklogApi} from '~/api';
import  'moment-business-days'
import moment, {Moment} from "moment";

export class AppStore {
  @observable apiKey: string = "";
  @observable url: string = "https://a-nfc.backlog.com/api/v2";
  @observable projectId: string = "";
  @observable duration: number = 5;
  @observable issues: any[] = [];
  constructor() {
    const apiKey = localStorage.getItem('apiKey');
    if(apiKey !== null) {this.apiKey = apiKey; }
    const url = localStorage.getItem('url');
    if(url !== null) {this.url = url; }
    const projectId = localStorage.getItem('projectId');
    if(projectId !== null) {this.projectId = projectId; }
    const duration = localStorage.getItem('duration');
    if(duration !== null) {this.duration = toNumber(duration); }
  }
  @action setApiKey = (value: string) => {
    this.apiKey = value;
    localStorage.setItem('apiKey', value);
  }

  @action setUrl = (value: string) => { 
    this.url = value
    localStorage.setItem('url', value);
  }

  @action setProjectId = (value: string) => { 
    this.projectId = value
    localStorage.setItem('projectId', value);
  }

  @action setDuration = (value: number) => { 
    this.duration = value
    localStorage.setItem('duration', toString(value));
  }

  @action submit = async () => { 
    const api = new BacklogApi(
      this.apiKey,
      this.url
    )
    let end = moment().businessAdd(this.duration)
    let statuses = await api.getStatus(this.projectId);
    statuses = filter(statuses, (x:any) => x.name !== "完了");
    const statusIds = statuses.map((x:any) => x.id);
    let issues = await api.getIssues(
      this.projectId,
      statusIds,
      end
    );
    issues = sortBy(issues, (x:any) => x.dueDate);
    issues = sortBy(issues, (x:any) => x.assignee.name);
    this.issues = issues;
  }
}

const store = new AppStore();
export default store;
