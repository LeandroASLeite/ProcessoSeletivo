import React, { Component } from 'react';
import TaskForm from './components/form';
import './App.css';
import { TfiAgenda } from "react-icons/tfi";
import { TfiAngleLeft } from "react-icons/tfi";
import { TfiAngleRight } from "react-icons/tfi";
class Calendario extends Component {
  horasDoDia = [...Array(24).keys()];
  datas = [];
  diaSelecionado = 0;

  constructor(props) {
    super(props);
    const data = new Date();
    this.state = {
      mes: data.getMonth(),
      ano: data.getFullYear(),
      dia: data.getDate(),
      dialog: false

    };
    const hoje = new Date();
    this.periodo = {
      mes: hoje.getMonth(),
      ano: hoje.getFullYear(),
      dia: hoje.getDate(),
      dialog: false

    };
    this.meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  }

  selecionarDia(event) {

    setTimeout(() => {
      this.diaSelecionado = parseInt(event.target.textContent);
      console.log(this.diaSelecionado)
    }, 2000)
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
      dia: this.periodo.dia

    })

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
              <label>{this.state.dia} de {this.meses[this.state.mes]} de {this.state.ano} </label>
            </div>
            <div className='alterar-dia'>
              <ul className='dias'>
                <li id='Dia Anterior' title='Dia anterior' onClick={() => this.AtualizaData("dia", "subtrai")}><TfiAngleLeft /></li>
                <li id='Proximo dia' title='Próximo dia' onClick={() => this.AtualizaData("dia", "soma")}><TfiAngleRight /></li>
                <li><button className='botao-hoje' type='default' onClick={this.voltaHoje}>Hoje</button></li>
              </ul>
            </div>
          </div>
        </div>



        <div className='Corpo'>

          <div className='Sidebar'>
            <label>Calendário</label>
            <div className='botao-criar'>
              <button type='default' onClick={() => { this.handleOpen() }}>Criar</button>
            </div>
            <div className='alterar-data'>
              <label>{this.meses[this.state.mes]}</label>
              <ul className='mes' >
                <li id='mes anterior' title='Mês anterior' onClick={() => this.AtualizaData("mes", "subtrai")}><TfiAngleLeft /></li>
                <li id='proximo mes' title='Próximo mês' onClick={() => this.AtualizaData("mes", "soma")}><TfiAngleRight /></li>
              </ul>
            </div>
            <div className='alterar-data'>
              <label>{this.state.ano}</label>

              <ul className='ano'>
                <li id='ano anterior' title='Ano anterior' onClick={() => this.AtualizaData("ano", "subtrai")}><TfiAngleLeft /></li>
                <li id='proximo ano' title='Próximo ano' onClick={() => this.AtualizaData("ano", "soma")}><TfiAngleRight /></li>
              </ul>
            </div>



            {this.renderMes()}
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