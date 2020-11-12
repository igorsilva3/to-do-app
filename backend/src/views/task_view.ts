import Task from "../models/Task";

export default {
  render(task: Task) {
    return {
      id: task.id,
      name: task.name,
      status: task.status
    }
  },

  renderMany(tasks: Task[]){
    return tasks.map(task => this.render(task));
  }
}