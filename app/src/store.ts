import {
  observable,
  action,
} from 'mobx';
import {sortBy, filter} from 'lodash';
import {BacklogApi} from '~/api';
import  'moment-business-days'
import moment, {Moment} from "moment";

export class AppStore {
  key: string ="JEUDQ1GFjDW2Ozj7Z5lcwC6dKmNFSLIjtmpSK2hfG7rhA7HNNpuaxJREn8pZ5qXQ";
  url: string = "https://a-nfc.backlog.com/api/v2" ;
  api: BacklogApi;
  @observable issues: any[] = [];
  constructor() {
    this.api = new BacklogApi(this.key, this.url);
  }
  @action setApiKey = (value: string) => {
    this.key = value;
    // this.setApi();
  }

  @action setUrl = (value: string) => { this.url = value;
    // this.setApi();
  }

  @action submit = async () => { 
    let end = moment().businessAdd(5)
    const projectId = 52074;
    let statuses = await this.api.getStatus(projectId);
    statuses = filter(statuses, (x:any) => x.name !== "完了");
    const statusIds = statuses.map((x:any) => x.id);
    let issues = await this.api.getIssues(
      projectId,
      statusIds,
      end
    );
    issues = sortBy(issues, (x:any) => x.dueDate);
    issues = sortBy(issues, (x:any) => x.assignee.name);
    this.issues = issues;
  }

  // setApi = () => {
  //   if(this.key !== undefined  && this.url !== undefined) {
  //     this.api = new BacklogApi(
  //       this.key,
  //       this.url
  //     )
  //   }
  // }

}

const store = new AppStore();
export default store;
