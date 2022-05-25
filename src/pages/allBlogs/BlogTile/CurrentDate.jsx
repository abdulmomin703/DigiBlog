import React from 'react';


export default class CurrentDate extends React.Component {
    constructor() {
        super();

        var today = new Date(),
            date =  today.getDate()+ '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

        this.state = {
            date: date
        };
    }

    render() {
        return (
            <div className='date mt-3'>
                {this.state.date}
            </div>
        );
    }
}