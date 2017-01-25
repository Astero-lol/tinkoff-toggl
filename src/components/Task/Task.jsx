import React from 'react';

import Button from '../Button/Button.jsx';

class Task extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            isEdit: false
		};
	}

	handleDelete() {
        this.props.onDelete(this.props.id);
    }

    handleEdit(e) {
		e.preventDefault();

        this.setState({
            isEdit: !this.state.isEdit
        });

        if (this.state.isEdit) {
            let title = this.refs.title.value,
                rate = this.refs.rate.value;

            this.props.onEdit(this.props.id, title, rate);
		}

	}

	render() {
        const {id, title, time, rate, sum, timeStart, timeEnd } = this.props;

        return (
			<li className="task__item" key={id} onClick={!this.state.isEdit ? this.handleEdit.bind(this) : null}>
				<form className="task__form" onSubmit={this.handleEdit.bind(this)}>
					<div className="task__cell task__cell_one">
						{ this.state.isEdit ?
							<input type="text" className="task__input" defaultValue={title} ref="title" placeholder="Задача" />
							:
							<p className={'task__title'}>{title}</p>
						}
					</div>
					<div className="task__cell task__cell_two">
						{ this.state.isEdit ?
							<input type="number" className="task__input" defaultValue={rate} ref="rate" placeholder="руб/час" />
							:
							<p className="task__rate">{rate} руб/час</p>
						}
					</div>
					<div className="task__cell task__cell_three">
						<p className="task__time">{time}</p>
						<div className="task__sum">Итого: {sum.toFixed(2)} руб.</div>
						<div className="task__range">
							<div className="task__range-item task__range-item_start">{timeStart}</div>
							<div className="task__range-item task__range-item_end">{timeEnd}</div>
						</div>
					</div>
					<div className="task__cell task__cell_four">
						<div className="task__actions">
							<button className="task__action task__action_edit">{this.state.isEdit ? 'Сохранить' : 'Редактировать'}</button>
							<br />
							<div className="task__action task__action_remove" onClick={this.handleDelete.bind(this)}>Удалить</div>
						</div>
					</div>
				</form>
			</li>
		);
	}
}

export default Task