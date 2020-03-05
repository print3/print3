import { Octokit } from '@octokit/rest'

class Github {
  constructor() {
    this.token = window.localStorage.getItem('token');

    let apiOptions = {};
    if(this.token) {
      apiOptions = { auth: this.token }
    }

    this.api = new Octokit(apiOptions);
  }
}

export let github = new Github().api;
