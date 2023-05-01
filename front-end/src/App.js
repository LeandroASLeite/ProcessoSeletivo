import React, { Component, useState, useEffect } from 'react';
// import { useAsync } from "react-async"
import TaskForm from './components/form';
import './App.css';
import { FcCalendar, FcEmptyTrash, FcPlus, FcHighPriority } from "react-icons/fc";
import Routes from './routes/routes';
import ReactCalendar from './components/calendar';
import Calendar from 'react-calendar';

var selectedDate = undefined

class Calendario extends Component {

  datas = [];
  diaSelecionado = 0;
  calendar = new ReactCalendar(this.changeDate);
  routes = new Routes();

  constructor(props) {
    super(props);
    const data = new Date();

    this.state = {
      mes: data.getMonth(),
      ano: data.getFullYear(),
      dia: data.getDate(),
      currentDate: new Date(),
      dialog: false,
      eventList: []

    }
    this.getStorageData();

    ;
    const hoje = new Date();
    this.variavel = undefined
    this.periodo = {
      mes: hoje.getMonth(),
      ano: hoje.getFullYear(),
      dia: hoje.getDate(),
    };
    this.meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  }


  CreateCalendar() {
    return (
      <div className="app">
        <div className="calendar-container">
          <Calendar onChange={(event) => {
            let newDate = this.changeDateCalendar(event);
            this.state.currentDate.setFullYear(newDate[0], newDate[1], newDate[2]);
            this.changeDate(this.state.currentDate);
            window.location.reload()

          }} value={this.state.currentDate} />
        </div>

      </div>
    )

  }
  changeDateCalendar(state) {

    return [state.getFullYear(), state.getMonth(), state.getDate()]

  }

  changeDate(date) {
    this.setStorageDate({
      ano: date.getFullYear(),
      mes: date.getMonth(),
      dia: date.getDate(),
      currentDate: date

    })
    selectedDate = this.state
  }

  voltaHoje = () => {
    this.setStorageDate({
      mes: this.periodo.mes,
      ano: this.periodo.ano,
      dia: this.periodo.dia,
      currentDate: new Date(),
    })
    selectedDate = this.state

    window.location.reload()

  }

  TabelaEventos() {

    const horasDoDia = [...Array(24).keys()]
    return (
      <div className='tabela'>


        <div className='selectedDate'> {this.state.currentDate.getDate()}
        </div>
        <div className='events'>
          <div className='horas'>
            {horasDoDia.map((horario) => (
              <div className='linhas'> {horario}:00</div>
            ))}
          </div>

          <div className='eventos'>
            <Eventos />
          </div>
        </div>

      </div>

    )
  }

  handleOpen = () => {
    this.setState({ dialog: true });
    selectedDate = this.state;

  }
  handleClose = () => {
    this.setState({ dialog: false });
    selectedDate = this.state;
  }
  getStorageData() {
    const data = new Date();

    const selectedDate = JSON.parse(localStorage.getItem("data"));
  
    if (selectedDate) {
      selectedDate.currentDate = new Date(selectedDate.currentDate);


      this.state.mes = selectedDate.mes;
      this.state.ano = selectedDate.ano;
      this.state.dia = selectedDate.dia;
      this.state.currentDate = selectedDate.currentDate;




    }

    else {
  
      this.setState({
        mes: data.getMonth(),
        ano: data.getFullYear(),
        dia: data.getDate(),
        currentDate: new Date(),
        dialog: false,
        eventList: []

      })
    }




  }
  setStorageDate(newState) {
    this.state.dia = newState.dia
    this.state.mes = newState.mes
    this.state.ano = newState.ano
    this.state.currentDate = newState.currentDate

    localStorage.setItem("data", JSON.stringify(this.state));
  }

  render() {

    selectedDate = this.state
    const { dialog } = this.state;
    // this.routes.getBackendData()
    return (
      <div>

        <div className='Topbar'>
          <div className='agenda'>
            < FcCalendar />
            <label className='dataTopbar' htmlFor="Agenda">Agenda</label>
          </div>
          <div className='conteudo-topbar'>
            <div className='data-atual'>
              <label className='dataTopbar' htmlFor="Agenda">{this.state.currentDate.getDate()} de {this.meses[this.state.currentDate.getMonth()]} de {this.state.currentDate.getFullYear()}</label>

              <button type='default' onClick={this.voltaHoje}>Hoje</button>
            </div>

          </div>
        </div>



        <div className='Corpo'>

          <div className='Sidebar'>
            <div className='botao-criar'>
              <button type='default' onClick={() => { this.handleOpen() }}>
                <FcPlus style={{ alignContent: "center" }} />

                Criar evento
              </button>
            </div>

            {this.CreateCalendar()}

          </div>

          {this.TabelaEventos()}

          <div className="dialog-overlay">
            {dialog && (
              <div className="dialog">
                <div className='tableAction'>
                  <FcHighPriority title='cancelar' onClick={this.handleClose} /></div>
                <div className="dialog-content">

                  <TaskForm />

                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    );

  }
}

function deleteItem(event) {
  const routes = new Routes();
  routes.deleteData(event?._id);
  window.location.reload();

}
function Eventos() {
  const horasDoDia = [...Array(24).keys()]
  const [eventItems, setEvents] = useState([])
  const routes = new Routes()
  useEffect(() => {
    routes.getEvent(selectedDate)
      .then((res) => {
        setEvents(res)
      })
      .catch((e) => {
        console.log(e.message)
      })
  }, [])
  return horasDoDia.map((horario) => {
    let event = undefined
    eventItems.forEach((item) => {

      if (parseInt(item.startDate.substring(11, 13)) === horario) {
        event = item
      }
    })
    return (
      <div className='linhas'>
        <div>{ }</div><div>{event?.title}</div><div>{event?.description}</div><div>{event?.locate}</div><div><FcEmptyTrash onClick={() => { deleteItem(event) }} title='excluir' /></div></div>
    )
  })

}

export default Calendario;