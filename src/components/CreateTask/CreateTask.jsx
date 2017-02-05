import React from 'react';

import Button from '../Button/Button.jsx';

class CreateTask extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeStart: null,
			timeEnd: null,
			isActive: false,
            counterValue: '00:00:00'
		};
        this.second = 0;
        this.minute = 0;
        this.hours = 0;
    }

    createId() {
        return  `_${Math.random().toString(36).substr(2, 9)}`;
    }

    componentDidMount() {
        this.interval = setInterval(this.counter.bind(this), 1000);
	}

    format(hours, minutes, seconds) {
        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    }

	counter() {
		if (this.state.isActive) {
            this.second++;
            if (this.second === 60) {
                this.second = 0;
                this.minute++;
            }
            if (this.minute === 60) {
                this.minute = 0;
                this.hours++;
            }

            this.setState({
                counterValue: this.format(this.hours, this.minute, this.second)
            });
		}
    }

    currentTime() {
        var date = new Date(),
            hours = date.getHours(),
            minutes = date.getMinutes();

        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }

    resetTime() {
        this.second = 0;
        this.minute = 0;
        this.hours = 0;
	}

    stop(e) {
        e.preventDefault();

        this.setState({
            timeEnd: this.currentTime(),
            isActive: false,
            counterValue: '00:00:00'
        });

        let title = this.refs.title.value,
            rate = +this.refs.rate.value,
            sum,

            rateSecond = (rate / 60) / 60; // цена за секунду


        if (this.minute === 0) {
            sum = this.second * rateSecond;
        } else if (this.hours === 0 && this.minute > 0) {
            sum = this.minute * (rate / 60)
        } else {
            sum = this.hours * rate + this.minute * (rate / 60)
        }

        const { timeStart, counterValue } = this.state;

        this.props.onAdd( // Добавление задачи
        	this.createId(), // Генерирует идентификатор
			title, // Значение инпута "Задача"
			rate, // Значение инпута "Ставка"
			sum, // Общая сумма за задачу
            this.second, // Количество секунд за задачу
			this.minute, // Количество минут на задачу
			this.hours, // Количество часов на задачу
			counterValue, // Общее время задачи
			timeStart, // Время начала задачи
			this.currentTime()); // Время окончания задачи (текущее время)

        this.resetTime();
    }

	start(e) {
		e.preventDefault();

        this.setState({
			timeStart: this.currentTime(),
			isActive: true,
		});
    }

    pause(e) {
	    e.preventDefault();

	    this.setState({
            isActive: false
        })
    }

	render() {
	    let play = <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>;
	    let pause = <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z"/></svg>;
	    let stop = <svg  xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path d="M12,16h2V8h-2V16z M14,16h2V8h-2V16z M10,16h2V8h-2V16z M12,20c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S16.4,20,12,20z M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M8,16h2V8H8V16z"/></svg>;

		return(
			<form className="create-task" onSubmit={this.state.isActive ? this.stop.bind(this) : this.start.bind(this) }>
				<div className="create-task__cell create-task__cell_one">
					<input type="text" placeholder="Задача" ref="title" className="create-task__input create-task__input_title" />
					<input type="number" placeholder="Ставка" ref="rate" className="create-task__input create-task__input_rate" />
				</div>
				<div className="create-task__cell create-task__cell_two">
					<p className="create-task__time">{this.state.counterValue}</p>
					<Button className="create-task__button">
                        { this.state.isActive ? stop : play }
					</Button>
                    <div className="button create-task__button create-task__button_stop" onClick={this.pause.bind(this)}>
                        {pause}
                    </div>
				</div>
			</form>
		)
	}
}

export default CreateTask;