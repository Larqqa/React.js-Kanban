import React, { Component } from 'react';

class AddProject extends Component {
  //Set initial container for new project
  constructor(){
    super();
    this.state = {
      newProject:{},
      categories:['Web Design', 'Web Development', 'Mobile Development']
    }
  }

  //Handler for form submitting
  handleSubmit(e){
    //Prevent default form actions
    e.preventDefault();

    //If empty, alert
    if (this.refs.title.value === '')
    {
      alert('Title is required!');
    } else {
      console.log(this.refs.category.value);
      //Else set new project to input values,
      this.setState({newProject:{
        title: this.refs.title.value,
        category: this.refs.category.value,
        content: this.refs.content.value,
      }}, function()
      {
        //Callback, send to App
        this.props.addProject(this.state.newProject);
      });
      alert('Project added!');
    }
  }

  //Handler for adding categories
  handleNewCategory(e){
    //Prevent default form actions
    e.preventDefault();

    //If empty, alert
    if (this.refs.addCategory.value === '')
    {
      alert('Category is required!');
    } else {
      //Else get categories
      let cats = this.state.categories;
      //Add new category
      if (cats.includes(this.refs.addCategory.value))
      {
        alert('Category already exists!');
      } else {
        cats.push(this.refs.addCategory.value);
        //Reset categories with updated values
        this.setState({
          categories: cats,
        });
        alert('Category added!');
      }
    }
  }

  render() {
    //Map categories and make options out of each category
    let categoryOptions = this.state.categories.map(category => {
      return <option key={category} value={category}>{category}</option>
    });
    return (
      <div className="AddProjects">
        <ul className="nav nav-tabs" id="formMenu">
          <li className="nav-item">
            <a className="nav-link" id="addProj" data-toggle="tab" href="#">Add Project<span className="close" id="indicator"><span className="indicators" id="indMid1" /><span className="indicators" id="indMid2" /><span className="indicators" id="indTop" /><span className="indicators" id="indBottom" /></span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="addCat" data-toggle="tab" href="#">Add Category<span className="close" id="indicator"><span className="indicators" id="indMid1" /><span className="indicators" id="indMid2" /><span className="indicators" id="indTop" /><span className="indicators" id="indBottom" /></span></a>
          </li>
        </ul>
        <div className="formWrap">
          <div className="hidden" id="addProject">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div>
                <label>Title</label><br />
                <input type="text" ref="title" />
              </div>
              <div>
                <label>Category</label><br />
                <select ref="category">
                  {categoryOptions}
                </select>
              </div>
              <div>
                <label>Content</label><br />
                <textarea rows="4" cols="50" ref="content" />
              </div>
              <div>
                <input type="submit" value="Add project" />
              </div>
            </form>
          </div>
          <div className="hidden" id="addCategory">
            <br />
            <form onSubmit={this.handleNewCategory.bind(this)}>
              <div>
                <label>Add New Category</label><br />
                <input type="text" ref="addCategory" />
              </div>
              <div>
                <input type="submit" value="Add category" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddProject;
