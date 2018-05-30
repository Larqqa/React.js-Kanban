import React, { Component } from 'react';
import SingleProject from './SingleProject';

class Projects extends Component {
  constructor(){
    super();
    this.state = {
      openedProject:{}
    };
  }

  closeProject(){
    this.setState({
      openedProject: {},
    });
  }

  //Handle delete event, send data to App.js to delete correct project
  deleteProject(id, stage) {
    let projects = this.props.projects;
    //Get projects total length before and after deletion
    let length = projects.toDo.length + projects.inProgress.length + projects.finished.length;
    this.props.onDelete(id, stage);
    let afterLength = projects.toDo.length + projects.inProgress.length + projects.finished.length;

    //If length changed, clear opened project
    //If user clicks "delete" button without deleting project, the project doesnt clear
    if (length !== afterLength)
    {
      this.setState({
        openedProject: {},
      });
    }
  }

  moveProject(id, stage, dir) {
    this.props.onMove(id, stage, dir);
  }

  //When project is opened, save it as a state, pass to SingleProject.js
  openProject(project) {
    this.setState({
      openedProject: project,
    });
  }

  //Handle making new list items from projects
  makeListItems(stage){
    let list;
    //Map list from sent stages projects
    list = stage.map(project => {
      //Return list items, easy to modify with one template
      return (
        <li className="Project" id={project.id} key={project.id}>
          <strong>{project.title}</strong> - {project.category}
          <button onClick={this.openProject.bind(this, project)}>Open</button>
        </li>
      )
    });
    //Return made list to element
    return list;
  }

  render() {
    let toDo;
    let inProgress;
    let finished;

    //Make lists of stages of projects.
    if (this.props.projects.toDo)
    {
      toDo = this.makeListItems(this.props.projects.toDo);
    } else {
      toDo = <p>No projects!</p>
    }

    if (this.props.projects.inProgress)
    {
      inProgress = this.makeListItems(this.props.projects.inProgress);
    }

    if (this.props.projects.finished)
    {
      finished = this.makeListItems(this.props.projects.finished);
    }
    return (
      <div className="Projects container-fluid">
        <div className="allProjects row">
          <div className="to-do col">
            <h3>To do</h3>
            <ul>
              {toDo}
            </ul>
          </div>
          <div className="in-progress col">
            <h3>In progress</h3>
            <ul>
              {inProgress}
            </ul>
          </div>
          <div className="finished col">
            <h3>Finished</h3>
            <ul>
              {finished}
            </ul>
          </div>
        </div>
        <div className="project">
          <SingleProject project={this.state.openedProject} closeProject={this.closeProject.bind(this)} deleteProject={this.deleteProject.bind(this)} moveThisProject={this.moveProject.bind(this)} />
        </div>
      </div>
    );
  }
}

export default Projects;
