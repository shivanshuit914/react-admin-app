import React, {Component} from 'react';
import TasksList from './task/taskslist';

export default class Dashboard extends  Component {
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <TasksList/>
            </div>
        );
    }
}