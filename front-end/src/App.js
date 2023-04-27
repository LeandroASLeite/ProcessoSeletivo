import React, { Component } from 'react';
import TaskForm from './components/form';
import './App.css';
import { TfiAgenda } from "react-icons/tfi";
import ReactCalendar from './components/calendar';
import Calendar from 'react-calendar';
class Calendario extends Component {
  horasDoDia = [...Array(24).keys()];
  datas = [];
  diaSelecionado = 0;
  calendar = new ReactCalendar(this.changeDate);
  constructor(props) {
    super(props);
    const data = new Date();
    this.state = {
      mes: data.getMonth(),
      ano: data.getFullYear(),
      dia: data.getDate(),
      currentDate: new Date(),
      dialog: false

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
            <div className="text-center">
                Selected date: {this.state.currentDate.toDateString()}
            </div>
        </div>
    )

}
changeDateCalendar(state) {

  return [state.getFullYear(), state.getMonth(), state.getDate()]

}

  // selecionarDia(event) {

  //   setTimeout(() => {
  //     this.diaSelecionado = parseInt(event.target.textContent);
  //     console.log(this.diaSelecionado)
  //   }, 2000)
  // }
  changeDate(date) {
    this.setState({
      ano : date.getFullYear(),
      mes: date.getMonth(),
      dia: date.getDate()
    })

}

  renderMes() {
    const { mes, ano } = this.state;
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();
    const primeiroDia = new Date(ano, mes, 1).getDay();
    const dias = [];

    let dia = 1;
    for (let i = 0; i < 6; i++) {
      const linhaDias = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < primeiroDia) {
          linhaDias.push(<td key={`${i}-${j}`}></td>);
        } else if (dia > diasNoMes) {
          break;
        } else {
          linhaDias.push(<td key={`${i}-${j}`} onClick={() => { }}><button>{dia}</button></td>);

          dia++;

        }

      }
      dias.push(<tr key={i}>{linhaDias}</tr>);
    }
    return (
      <table>
        <thead>
          {this.renderDiasSemana()}
        </thead>
        <tbody>
          {dias}
        </tbody>
      </table>
    );
  }


  handleOpen = () => {
    this.setState({ dialog: true });
  }

  handleClose = () => {
    this.setState({ dialog: false });
  }

  renderDiasSemana() {
    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    return (
      <tr>
        {diasSemana.map((dia) => (
          <th key={dia}>{dia}</th>
        ))}
      </tr>
    );
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

  AtualizaData(tipo, operacao) {
    let diasNoMes = new Date(this.state.ano, this.state.mes + 1, 0).getDate();
    //soma
    if (operacao === "soma") {
      if (tipo === "mes") {
        if (this.state.mes < 11) {
          this.setState({
            mes: this.state.mes + 1,
            ano: this.state.ano,
          })
        }
        else {

          this.setState({
            mes: 0,
            ano: this.state.ano + 1,
          })
        }
      }
      else if (tipo === "ano") {
        this.setState({
          mes: this.state.mes,
          ano: this.state.ano + 1
        })
      }
      else {
        if (this.state.dia < diasNoMes) {
          this.setState({
            dia: this.state.dia + 1,

          })
        }
        else {

          if (this.state.mes < 11) {
            this.setState({
              dia: 1,
              mes: this.state.mes + 1
            })
          }
          else {
            this.setState({
              dia: 1,
              mes: 0,
            })
          }

        }

      }
    }
    //subtrai
    if (operacao === "subtrai") {
      if (tipo === "mes") {
        if (this.state.mes > 0) {
          this.setState({
            mes: this.state.mes - 1,
            ano: this.state.ano,
          })
        }
        else {
          this.setState({
            mes: 11,
            ano: this.state.ano - 1,
          })
        }
      }
      else if (tipo === "ano") {
        this.setState({
          mes: this.state.mes,
          ano: this.state.ano - 1
        })
      }
      else {
        if (this.state.dia > 1) {
          this.setState({
            dia: this.state.dia - 1,

          })
        }
        else {

          if (this.state.mes > 0) {
            this.setState({
              dia: 1,
              mes: this.state.mes - 1
            })
          }
          else {
            this.setState({
              dia: 1,
              mes: 11,
            })
            diasNoMes = new Date(this.state.ano, this.state.mes, 0).getDate();
            this.setState({
              dia: diasNoMes
            })
          }
        }
      }
    }
    console.log(this.state)
  }

  TabelaEventos(parametro) {
    return (



      <div className='tabela'>


        <div className='horas'>
          {this.horasDoDia.map((horario) => (
            <div className='linhas'> {horario}:00</div>
          ))}
        </div>

        <div className='eventos'>
          {this.horasDoDia.map((horario) => (
            <div className='linhas'>{parametro}</div>
          ))}
        </div>


      </div>

    )
  }

  render() {
    const { dialog } = this.state;
    return (
      <div>

        <div className='Topbar'>
          <div className='agenda'>
            <TfiAgenda />
            <label className='item-agenda' htmlFor="Agenda">Agenda</label>
          </div>
          <div className='conteudo-topbar'>
            <div className='data-atual'>
              <label>{this.periodo.dia} de {this.meses[this.periodo.mes]} de {this.periodo.ano} </label>
              <button className='botao-hoje' type='default' onClick={this.voltaHoje}>Hoje</button>
            </div>
            
          </div>
        </div>



        <div className='Corpo'>

          <div className='Sidebar'>
            <label>Calendário</label>
            <div className='botao-criar'>
              <button type='default' onClick={() => { this.handleOpen() }}>Criar</button>
            </div>
            
            {this.CreateCalendar()}
          
          </div>

          {this.TabelaEventos()}

          <div className="dialog-overlay">
            {dialog && (
              <div className="dialog">
                <div className="dialog-content">
                  <TaskForm />
                  <button onClick={this.handleClose}>Fechar Diálogo</button>
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