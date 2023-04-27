// import { useState } from 'react';
import Calendar from 'react-calendar';
import './style.css';


class ReactCalendar {
    // [date, setDate] = useState(new Date())
    setExternalDate = null;

    constructor(func) {

        const data = new Date();
        this.setExternalDate = func;
        this.state = {
            mes: data.getMonth(),
            ano: data.getFullYear(),
            dia: data.getDate(),
            currentDate: new Date()
            
        };

    }
    changeDate(state) {

        return [state.getFullYear(), state.getMonth(), state.getDate()]

    }

    CreateCalendar() {
        return (
            <div className="app">
                <h1 className="header">React Calendar</h1>
                <div className="calendar-container">
                    <Calendar onChange={(event) => {
                        let newDate = this.changeDate(event);
                        this.state.currentDate.setFullYear(newDate[0], newDate[1], newDate[2]);
                        this.setExternalDate(this.state.currentDate);

                    }} value={this.state.currentDate} />
                </div>
                <div className="text-center">
                    Selected date: {this.state.currentDate.toDateString()}
                </div>
            </div>
        )

    }
    getDate(){
        return (this.state.currentDate)
    }

}





export default ReactCalendar;