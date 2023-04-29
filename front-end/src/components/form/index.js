import React, { useState } from 'react';
import Routes from '../../routes/routes';

function TaskForm() {
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('');
  const [participants, setParticipants] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
   };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleParticipantsChange = (event) => {
    setParticipants(event.target.value);
  };

  return (        
    <form onSubmit={handleSubmit}>
      
      <div>
        
        <label htmlFor="title">Título *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
          required
          
          
        />
        
      </div>

      <div>
        <label htmlFor="description">Descrição *</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
      </div>

      <div>
        <label htmlFor="date">Data *</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={handleDateChange}
          required
        />
      </div>

      <div>
        <label htmlFor="time">Hora *</label>
        <input
          type="time"
          id="time"
          name="time"
          value={time}
          onChange={handleTimeChange}
          required
        />
      </div>

      <div>
        <label htmlFor="duration">Duração *</label>
        <input
          type="time"
          id="duration"
          name="duration"
          value={duration}
          onChange={handleDurationChange}
          required
        />
        {/* todo separar as horas  */}
      </div>

      <div>
        <label htmlFor="location">Localização</label>
        <input
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={handleLocationChange}
        />
      </div>

      <div>
        <label htmlFor="participants">Convidar participantes</label>
        <input
          type="text"
          id="participants"
          name="participants"
          value={participants}
          onChange={handleParticipantsChange}
        />
      </div>

      <button type="default" onClick={() => {Submit(title,description,date,time,duration,location,participants)}}>Criar tarefa</button>
    </form>
    
  );

}
function Submit(title,description,date,startDate,finishDate,locate,invite){
  let formatedStartDate = date + "T" + startDate + ":00.000Z"
  let formatedFinishDate = date + "T" + finishDate + ":00.000Z"
  const route = new Routes();
 
  
  route.createData(
    {
      
      "title": title,
      "description": description,
      "date": date,
      "startDate": formatedStartDate,
      "finishDate": formatedFinishDate,
      "locate": locate,
      "invite": invite
      
    }
  )
  
}

export default TaskForm;

