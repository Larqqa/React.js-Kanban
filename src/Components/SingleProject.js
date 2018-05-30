import React, { Component } from 'react';

class SingleProject extends Component {
  constructor(){
    super();
    this.state = {
      openedProject:{},
      formShow: 'hidden'
    };
  }

  //Close project
  closeProject(){
    this.props.closeProject();
  }

  //Handle delete event, send data to App.js to delete correct project
  deleteThisProject(id, stage) {
    this.props.deleteProject(id, stage);
  }

  //Handle move event, send data to App.js to move correct project
  moveProject(id, stage, dir) {
    this.props.moveThisProject(id, stage, dir);
  }

  handleSubmit(e){
    //Prevent default form actions
    e.preventDefault();
    let project = this.props.project

    //Change projects content to the content from the form
    project.content = this.refs.content.value;

    //Reset project state
    this.setState({
      openedProject: project
    });

    //Hide edit form
    this.setState({
      formShow: 'hidden'
    });
  }

  showForm(){
    if (this.state.formShow === 'visible')
    {
      this.setState({
        formShow: 'hidden'
      });
    } else {
      this.setState({
        formShow: 'visible'
      });
    }
  }

  //Handle opening of single project
  openThisProject(){
    let project = this.props.project;
    let stage = this.props.project.stage;

    let backward;
    let forward;
    let deleteButton;
    let editButton;
    let projectContent;
    let closeButton;

    //If project has a title, add buttons
    if(project.title)
    {
      if (project.stage !== 'toDo') backward = <button onClick={this.moveProject.bind(this, project.id, project.stage, 'backward')}>Previous step</button>;
      if (project.stage !== 'finished') forward = <button onClick={this.moveProject.bind(this, project.id, project.stage, 'forward')}>Next step</button>;
      deleteButton = <button onClick={this.deleteThisProject.bind(this, project.id, project.stage)}>Delete this project</button>;
      editButton = <button onClick={this.showForm.bind(this)} id="editProject" className="editButton">Edit</button>;
      closeButton = <button className="closeProject" onClick={this.closeProject.bind(this)}>X</button>;
    }

    if(project.content) projectContent = project.content;

    return (
      <div className="OpenedProject" id={project.id} key={project.id}>
        {closeButton}
        <h4>{project.title}</h4>
        <p><strong>{project.category}</strong></p>
        <p>{project.content}</p>

        {backward}
        {forward}
        {deleteButton}
        {editButton}

        <form className={this.state.formShow} key="editForm" onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Edit this project</label><br />
            <textarea rows="5" cols="100" ref="content" defaultValue={projectContent} />
          </div>
          <div>
            <input type="submit" value="Save" />
          </div>
        </form>
      </div>
    )
  }

  render() {
    let openProject = this.openThisProject();

    return (
      <div className="OpenedProjects" id="OpenedProjects">
        {openProject}
      </div>
    );
  }
}

export default SingleProject;
