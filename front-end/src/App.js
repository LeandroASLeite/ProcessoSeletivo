import React, { Component } from 'react';
import TaskForm from './components/form';
import './App.css';
import { FcCalendar, FcUndo, FcEmptyTrash, FcPlus, FcHighPriority } from "react-icons/fc";
import Routes from './routes/routes';
import ReactCalendar from './components/calendar';
import Calendar from 'react-calendar';



class Calendario extends Component {
  horasDoDia = [...Array(24).keys()];
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
      useState: false

    };
    const hoje = new Date();
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

          }} value={this.state.currentDate} />
        </div>

      </div>
    )

  }
  changeDateCalendar(state) {

    return [state.getFullYear(), state.getMonth(), state.getDate()]

  }

  changeDate(date) {
    this.setState({
      ano: date.getFullYear(),
      mes: date.getMonth(),
      dia: date.getDate()
    })

  }



  voltaHoje = () => {
    this.setState({
      mes: this.periodo.mes,
      ano: this.periodo.ano,
      dia: this.periodo.dia,
      currentDate: new Date(),
      



    })
    
    window.location.reload()
    
  }

  TabelaEventos(parametro) {
    return (



      <div className='tabela'>

        <div className='selectedDate'> {this.state.currentDate.getDate()}
        </div>
        <div className='events'>
          <div className='horas'>
            {this.horasDoDia.map((horario) => (
              <div className='linhas'> {horario}:00</div>
            ))}
          </div>

          <div className='eventos'>
            {this.horasDoDia.map((horario) => (
              <div className='linhas'>
                <div>{parametro}rozetaaaaa</div><div><FcUndo title="editar" /><FcEmptyTrash title='excluir' /></div></div>
            ))}
          </div>
        </div>

      </div>

    )
  }

  handleOpen = () => {
    this.setState({ dialog: true });
    
  }
  handleClose = () => {
    this.setState({ dialog: false });
  }

  render() {


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

export default Calendario;