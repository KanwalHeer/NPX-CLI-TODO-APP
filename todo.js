#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class TODO {
    tasks;
    constructor() {
        this.tasks = [];
    }
    async mainFunction() {
        let exit = false;
        do {
            const optionsAns = await inquirer.prompt([
                {
                    name: "options",
                    type: "list",
                    message: "select options",
                    choices: [
                        "Add Task",
                        "View Todo list",
                        "Update Todo list",
                        "Delete Task",
                        "Exit",
                    ],
                },
            ]);
            switch (optionsAns.options) {
                case "Add Task":
                    await this.addTask();
                    break;
                case "View Todo list":
                    await this.viewTask();
                    break;
                case "Update Todo list":
                    await this.updateTask();
                    break;
                case "Delete Task":
                    await this.deleteTask();
                    break;
                case "Exit":
                    exit = true;
                    console.log(chalk.yellow(`You Exited! Good bye have a nice day.`));
                    break;
                default:
                    break;
            }
        } while (!exit);
    }
    async addTask() {
        const addtask = await inquirer.prompt([
            {
                name: "index",
                type: "number",
                message: "Enter Index to update",
            },
            {
                name: "Task",
                type: "input",
                message: "Add your Task",
            },
        ]);
        let Task = addtask.Task;
        let index = addtask.index;
        this.tasks.push(`Index:${index} Task :${Task} `);
        console.log(chalk.green(`Task added successfully!`));
    }
    async viewTask() {
        if (this.tasks.length <= 0) {
            console.log(chalk.red(`Todo List is empty`));
        }
        this.tasks.forEach((element) => {
            console.log(chalk.magenta(element));
        });
    }
    async updateTask() {
        const update = await inquirer.prompt([
            {
                name: "index",
                type: "number",
                message: "Enter Index to update",
            },
        ]);
        const index = parseInt(update.index);
        const taskIndex = this.tasks.findIndex((task) => task.indexOf(`Index:${index}`) !== -1);
        if (taskIndex !== -1) {
            const newtask = await inquirer.prompt({
                name: "newTask",
                type: "input",
                message: "Add new Task",
            });
            this.tasks[taskIndex] = `Index:${index} Task :${newtask.newTask} `;
            console.log(chalk.green("Task updated successfully"));
        }
        else {
            console.log(chalk.red("Index is incorrect or task not found"));
        }
    }
    async deleteTask() {
        const deletetask = await inquirer.prompt({
            name: "delete",
            message: "Enter Index to delete Task",
        });
        const deleteTask = parseInt(deletetask.delete);
        const taskIndex = this.tasks.findIndex((task) => task.indexOf(`Index:${deleteTask}`) !== -1);
        if (taskIndex != -1) {
            this.tasks.splice(taskIndex, 1);
            console.log(chalk.green("Task deleted successfully"));
        }
        else {
            console.log(chalk.red("Index is incorrect or task not found"));
        }
    }
}
const myTodoApp = new TODO();
myTodoApp.mainFunction();
