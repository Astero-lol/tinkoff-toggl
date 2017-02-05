import React from 'react';
import './App.scss';

import Header from  './components/Header/Header.jsx';
import Task from './components/Task/Task.jsx';
import CreateTask from './components/CreateTask/CreateTask.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: this.props.tasks
		};
	}

    updateStorage(data) {
        localStorage.setItem('tasks-storage', JSON.stringify(data));
        this.setState({
            tasks: data
        });
	}

	handleAdd(id, title, rate, sum, second, minute, hours,time, timeStart, timeEnd) {
		let task = {
			id, //идентификатор
			title, // Название задачи
			rate, // Ставка в час
            sum, // Сумма за все время
			second, // Количество секунд на задачу
			minute, // Количество минут на задачу
            hours, // Количество часов на задачу
			time, // Потрачено времени на задачу
            timeStart, // Время начала задачи
        	timeEnd, // Время окончания задачи
		};

		let tasks = [task, ...this.state.tasks];

        this.updateStorage(tasks);
    }

	handleDelete(id) {
		let tasks = this.state.tasks.filter((task) => {
			return task.id !== id;
        });

        this.updateStorage(tasks);
	}

	handleEdit(id, title, rate) {
		let tasks = this.state.tasks.map((task) => {

            if (id === task.id) {
            	task.title = title;
            	task.rate = rate;
            	task.sum = task.hours === 0 ? task.minute * (rate / 60) : task.hours * rate + task.minute * (rate / 60);

            	if (task.minute === 0) {
            		task.sum = task.second * ((rate / 60) / 60)
				} else if (task.hours === 0 && task.minute > 0) {
            		task.sum = task.minute * (rate / 60)
				} else {
            		task.sum = task.hours * rate + task.minute * (rate / 60)
				}
			}

			return task
        });

        this.updateStorage(tasks);
	}

	render() {
		return (
			<div className="App">
				<Header>
					<CreateTask onAdd={this.handleAdd.bind(this)} />
				</Header>
				<ul className="task">
                    {
                        this.state.tasks.map((item) => {
                            return (
								<Task
									key={item.id}
									id={item.id}
									title={item.title}
									time={item.time}
									rate={item.rate}
									sum={item.sum}
									timeStart={item.timeStart}
									timeEnd={item.timeEnd}
									onDelete={this.handleDelete.bind(this)}
									onEdit={this.handleEdit.bind(this)}
								/>
                            )
                        })
                    }
				</ul>
			</div>
		);
	}
}

export default App;
