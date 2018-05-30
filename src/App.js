import React, { Component } from 'react';
import AddProject from './Components/AddProject';
import GetProjects from './Components/GetProjects';
import './App.css';

class App extends Component {
  //Set initial projects container to App state
  constructor()
  {
    super();
    this.state = {
      projects: {}
    }
  }

  //Get projects from MySQL
  ajaxCall(id){
    let $ = require('jquery');
    let res;
    $.ajax({
      url: 'http://localhost:8080/reactApp/kanban/src/php/getProjects.php',
      method: 'POST',
      data: {'id': id}
    }).then(data => {
      console.log(data);
      res = JSON.parse(data);
      this.setState({
        projects: res
      });
      return res;
    });
  }

  componentWillMount(){
    this.ajaxCall();
  }
  //Add initial dummy data
  /*componentWillMount() {
    //Basic states for projects: To do, In progress, and Finished
    //stage sets in which state the project should be
    //Id is always n + 1 where n is the index of the latest project
    this.setState({projects:{
      toDo:[
        {
          title: 'Business Website',
          category: 'Web Design',
          stage: 'toDo',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut veniam repudiandae veritatis quos sequi error ducimus harum voluptate, distinctio ut placeat, quisquam magnam culpa laudantium blanditiis incidunt ea. Modi harum distinctio, illo fugit. Soluta, cupiditate, et. Adipisci delectus ut, pariatur enim, accusantium saepe natus magni est, distinctio ipsum itaque dolorum.',
          id: 0
        },
        {
          title: 'Social App',
          category: 'Mobile Development',
          stage: 'toDo',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut veniam repudiandae veritatis quos sequi error ducimus harum voluptate, distinctio ut placeat, quisquam magnam culpa laudantium blanditiis incidunt ea. Modi harum distinctio, illo fugit. Soluta, cupiditate, et. Adipisci delectus ut, pariatur enim, accusantium saepe natus magni est, distinctio ipsum itaque dolorum.',
          id: 1
        },
        {
          title: 'Ecommerce cart',
          category: 'Web development',
          stage: 'toDo',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut veniam repudiandae veritatis quos sequi error ducimus harum voluptate, distinctio ut placeat, quisquam magnam culpa laudantium blanditiis incidunt ea. Modi harum distinctio, illo fugit. Soluta, cupiditate, et. Adipisci delectus ut, pariatur enim, accusantium saepe natus magni est, distinctio ipsum itaque dolorum.',
          id: 2
        }
      ],
      inProgress:[
        {
          title: 'Blog Website',
          category: 'Web Design',
          stage: 'inProgress',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut veniam repudiandae veritatis quos sequi error ducimus harum voluptate, distinctio ut placeat, quisquam magnam culpa laudantium blanditiis incidunt ea. Modi harum distinctio, illo fugit. Soluta, cupiditate, et. Adipisci delectus ut, pariatur enim, accusantium saepe natus magni est, distinctio ipsum itaque dolorum.',
          id: 3
        },
        {
          title: 'Food App',
          category: 'Mobile Development',
          stage: 'inProgress',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut veniam repudiandae veritatis quos sequi error ducimus harum voluptate, distinctio ut placeat, quisquam magnam culpa laudantium blanditiis incidunt ea. Modi harum distinctio, illo fugit. Soluta, cupiditate, et. Adipisci delectus ut, pariatur enim, accusantium saepe natus magni est, distinctio ipsum itaque dolorum.',
          id: 4
        },
        {
          title: 'Shopping cart',
          category: 'Web development',
          stage: 'inProgress',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut veniam repudiandae veritatis quos sequi error ducimus harum voluptate, distinctio ut placeat, quisquam magnam culpa laudantium blanditiis incidunt ea. Modi harum distinctio, illo fugit. Soluta, cupiditate, et. Adipisci delectus ut, pariatur enim, accusantium saepe natus magni est, distinctio ipsum itaque dolorum.',
          id: 5
        }
      ],
      finished:[
        {
          title: 'some dudes Website',
          category: 'Web Design',
          stage: 'finished',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut veniam repudiandae veritatis quos sequi error ducimus harum voluptate, distinctio ut placeat, quisquam magnam culpa laudantium blanditiis incidunt ea. Modi harum distinctio, illo fugit. Soluta, cupiditate, et. Adipisci delectus ut, pariatur enim, accusantium saepe natus magni est, distinctio ipsum itaque dolorum.',
          id: 6
        },
        {
          title: 'some App',
          category: 'Mobile Development',
          stage: 'finished',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut veniam repudiandae veritatis quos sequi error ducimus harum voluptate, distinctio ut placeat, quisquam magnam culpa laudantium blanditiis incidunt ea. Modi harum distinctio, illo fugit. Soluta, cupiditate, et. Adipisci delectus ut, pariatur enim, accusantium saepe natus magni est, distinctio ipsum itaque dolorum.',
          id: 7
        },
        {
          title: 'some cart',
          category: 'Web development',
          stage: 'finished',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut veniam repudiandae veritatis quos sequi error ducimus harum voluptate, distinctio ut placeat, quisquam magnam culpa laudantium blanditiis incidunt ea. Modi harum distinctio, illo fugit. Soluta, cupiditate, et. Adipisci delectus ut, pariatur enim, accusantium saepe natus magni est, distinctio ipsum itaque dolorum.',
          id: 8
        }
      ],
    }});
  }
*/
  //Handler for adding new projects
  handleAddProject(project) {
    //Get projects
    let projects = this.state.projects;

    //Sort by highest number
    function sortId(id){
      let highestId = 0;
      id.map(x => {
        //If current is higher than earlier highest, replace highest
          if (x > highestId)
          {
            highestId = x;
          }
          return highestId;
      });
      //Return arrays highest id
      return highestId;
    }

    //Find largest id of stage
    function findId(stage) {
      //Map stage ids
      let id = stage.map(x => x.id);
      //Sort stage ids
      id = sortId(id);

      //Return only the largest
      return id;
    }

    let id = [];
    //Find largest id of all stages and push to array
    id.push(findId(projects.toDo));
    id.push(findId(projects.inProgress));
    id.push(findId(projects.finished));

    //find largest id of all sorted stages
    id = sortId(id);

    //Give new project the highest id + 1
    //The new projects id will always n + 1 where n is currently highest
    project.id = id + 1;

    //Set project stage to To do
    project.stage = 'toDo';

    //Push project to To do column, as all projects start from To do
    projects.toDo.push(project);

    //Set state to new state with new project
    this.setState({projects:projects});
  }

  //Handler for deleting projects
  handleDeleteProject(id, stage) {
    //Set some values
    let projects;
    let projectStage;
    let projectsAll = this.state.projects;

    //Find which stage the removed project belongs to
    //Get correct state of projects and set stage
    switch (stage) {
      case 'toDo':
         projects = this.state.projects.toDo;
         projectStage = 'toDo';
        break;
      case 'inProgress':
        projects = this.state.projects.inProgress;
        projectStage = 'inProgress';
        break;
      case 'finished':
        projects = this.state.projects.finished;
        projectStage = 'finished';
        break;
      default:
        break;
    }

    //Find which project to delete
    let index = projects.findIndex(x => x.id === id);

    if(prompt('You are about to delete the project:\n' + projects[index].title + '\nWrite the name of this project if you want to delete this project:') === projects[index].title)
    {
      //Remove project from projects if user inputs correct string
      projects.splice(index, 1);
      alert('Project was deleted!');
    }

    //Set projects in correct stage to updated projects in that stage
    projectsAll.projectStage = projects;

    //Set projects to updated projects
    this.setState({projects: projectsAll});
  }

  //Handler for progressing projects
  handleMoveProject(id, stage, dir) {
    let projects;
    let projectsAll = this.state.projects;
    let projectStage;

    //Find which stage the moved project belongs to
    //Get correct state of projects and set stage
    switch (stage) {
      case 'toDo':
        projects = this.state.projects.toDo;
        projectStage = 'toDo';
        break;
      case 'inProgress':
        projects = this.state.projects.inProgress;
        projectStage = 'inProgress';
        break;
      case 'finished':
        projects = this.state.projects.finished;
        projectStage = 'finished';
        break;
      default:
        break;
    }

    //Find which project to delete
    let index = projects.findIndex(x => x.id === id);

    let project;
    switch (projectStage) {
      case 'toDo':
        if(dir === 'forward')
        {
          //If todo, move forward
          project = projects[index];
          project.stage = 'inProgress';
          projectsAll.inProgress.push(project);

          //Remove from initial list
          projects.splice(index, 1);
        }
        break;
      case 'inProgress':
        //If inprogress, move forwards or backwards
        if (dir === 'backward')
        {
          project = projects[index];
          project.stage = 'toDo';
          projectsAll.toDo.push(project);

          //Remove from initial list
          projects.splice(index, 1);
        } else {
          if(prompt(projects[index].title + ':\nIs this project finished?\nWrite Yes if is finished') === 'Yes')
          {
            project = projects[index];
            project.stage = 'finished';
            projectsAll.finished.push(project);

            //Remove from initial list
            projects.splice(index, 1);
            alert('Project was finished!');
          }
        }
        break;
        case 'finished':
        if(dir === 'backward' && prompt(projects[index].title + ':\nMove back to In progress?\nWrite Yes if is finished') === 'Yes')
        {
          //If finished, move forward
          project = projects[index];
          project.stage = 'inProgress';
          projectsAll.inProgress.push(project);

          //Remove from initial list
          projects.splice(index, 1);
          alert('Project was moved back!');
        }
        break;
      default:
        break;
    }

    //Set projects in correct stage to updated projects in that stage
    projectsAll.projectStage = projects;

    //Set projects to updated projects
    this.setState({projects: projectsAll});
  }

  render() {
    return (
      <div className="App">
        <header className="main-header">
          <h1>Kanban App</h1>
        </header>
        <div className="add-content">
          <AddProject addProject={this.handleAddProject.bind(this)} />
        </div>
        <div className="main-content">
          <GetProjects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)}  onMove={this.handleMoveProject.bind(this)} />
        </div>
      </div>
    );
  }
}

export default App;
