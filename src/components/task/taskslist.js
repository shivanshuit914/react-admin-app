import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTasks} from '../../actions/task';
import _ from 'lodash';

class TasksList extends Component {
    componentDidMount() {
        this.props.fetchTasks();
    }

    renderPosts() {
        return _.map(this.props.tasks, task => {
            return (
                <li className="list-group-item" key={task._id}>
                    {task.text}
                    {task.completed ? 'Completed' : 'Not Completed'}
                </li>
            )
        });
    }


    render() {
        return (
            <div>
                <h3>Tasks List</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {tasks: state.task};
}

export default connect(mapStateToProps, {fetchTasks})(TasksList);