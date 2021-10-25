import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor() {
    super();
    // Each task is uniquely identified by its name.
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.state = {
      tasks: [
        { name: "1", stage: 0 },
        { name: "2", stage: 0 },
      ],
      input: "",
    };
    this.stagesNames = ["Backlog", "To Do", "Ongoing", "Done"];
  }

 handleTask = (e) => {
   this.setState({input: e.target.value}, () => console.log(this.state.input))
  //  console.log(this.state.input);
 }

 handleAdd = (e) => {
   if(this.state.input){

     this.setState(prevstate => ({
       tasks: [...prevstate.tasks,{name:this.state.input, stage:0 }]
     }))
   }
 }

 goForward = (name) => {
   this.setState(prevState => ({
     tasks: prevState.tasks.map( task => task.name === name ? {...task, stage: task.stage === 3 ? 3 : task.stage+=1} : task)
   }))
  }

  goBack = (name) => {
    this.setState(prevState => ({
      tasks: prevState.tasks.map( task => task.name === name ? {...task, stage: task.stage === 0 ? 0 : task.stage-=1} : task)
    }))
  }

  removeTask = (name) => {
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task.name !== name)
    }))
  }



  render() {
    const { tasks } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <input
            id="create-task-input"
            type="text"
            className="large"
            placeholder="New task name"
            data-testid="create-task-input"
            onChange={this.handleTask}
            value={this.state.input}
          />
          <button
            type="submit"
            className="ml-30"
            data-testid="create-task-button"
            onClick={this.handleAdd}
          >
            Create task
          </button>
        </section>

        <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
            return (
              <div className="card outlined ml-20 mt-0" key={`${i}`}>
                <div className="card-text">
                  <h4>{this.stagesNames[i]}</h4>
                  <ul className="styled mt-50" data-testid={`stage-${i}`}>
                    {tasks.map((task, index) => {
                      return (
                        <li className="slide-up-fade-in" key={`${i}${index}`}>
                          <div className="li-content layout-row justify-content-between align-items-center">
                            <span
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-name`}
                            >
                              {task.name}
                            </span>
                            <div className="icons">
                              <button
                                disabled={i === 0 ? true : false}
                                onClick={() => this.goBack(task.name)}
                                className="icon-only x-small mx-2"
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-back`}
                              >
                                <i className="material-icons">arrow_back</i>
                              </button>
                              <button
                                disabled={i === 3 ? true : false}
                                onClick={() => this.goForward(task.name)}
                                className="icon-only x-small mx-2"
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-forward`}
                              >
                                <i className="material-icons">arrow_forward</i>
                              </button>
                              <button
                                onClick={() => this.removeTask(task.name)}
                                className="icon-only danger x-small mx-2"
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-delete`}
                              >
                                <i className="material-icons">delete</i>
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
