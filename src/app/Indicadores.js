import React, { Component } from 'react';
import Select from 'react-select';

class Indicadores extends Component {
    state={
        indicadores:[],
        keyIndicador:[],
        showAllIndicadores:false,
        showHistoIndi:false,
        histoIndicador:[],
        nameIndicador:''
    };

    componentDidMount(){
        //cargar las opciones para el Select
        this.buscarKeyApi();
    }
    // trae los ultimos registros de los indicadores
    buscarUltimosIndicadores(){
        fetch('/last')
            .then(res=> res.json())
            .then(data => {
                //console.log(data);
            let arra=[];
            for(let i in data){
                //formatea el timestamp a date
                data[i].date= new Date((data[i].date)*1000).toLocaleDateString("es-CL");
                arra.push(data[i]);
            }
            this.setState({indicadores: arra});
            this.setState({showHistoIndi: false});
            this.setState({showAllIndicadores:true});
            console.log(this.state);
            })
            .catch(err => console.log(err));
    }
    //agrega tarea al track
    tracker(titulo, descri){
        return fetch('http://localhost:3000/api/addTrack',{
            method: 'POST',
            body: `{"title":"${titulo}","description":"${descri}"}`,
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res=> {
            return res.status;
         })
    }
    // verifica el status de la api externa de indicadores
    testStatusApi(){
       return fetch('http://localhost:3000/base')
       .then(res=> {
           return res.status;
        })
    }
    // obtiene los las key de los indicadores disponibles en la api
    buscarKeyApi(){
        fetch('/base')
            .then(res=> res.json())
            .then(data => {
            let arra=data.apis[1].structure.params.key.split('|');
            this.setState({keyIndicador: arra});
            console.log(this.state);
            })
            .catch(err => console.log(err));
    }
    // obtiene desde la api los registros por la key del indicador
    buscarByKey=(selectedOption)=>{
        fetch(`/indicador/${(selectedOption).value}`)
            .then(res=> res.json())
            .then(data => {
            let arra=[];
            for(let i in data.values){
                let fecha = new Date(i*1000).toLocaleDateString("es-CL");
                let jso={time:fecha
                    , valor:data.values[i], unit:data.unit};
                arra.push(jso);
            }
            console.log(data);
            this.setState({nameIndicador:data.name});
            this.setState({histoIndicador:arra});
            this.setState({showAllIndicadores:false});
            this.setState({showHistoIndi: true});
            console.log(this.state);
            })
            .catch(err => console.log(err));
    }
    handleChange = e => {
        // agrega nueva tarea al track
        this.tracker('Click selector',e.value);
    }
    render() {
        return (
            <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                        <div className="row">
                                            <h5>Seleccione un indicador</h5>
                                            <div className="input-field col s12">
                                            <Select onChange={(e)=>{this.buscarByKey(e),this.handleChange(e)}}
                                             options={this.state.keyIndicador.map(ke=> {
                                                       return ({value: ke, label:ke})
                                                    })
                                            }/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="btn_buscar" className="col s12 btn light-blue darken-4" onClick={() => {this.buscarUltimosIndicadores(), this.tracker("Click boton","Boton ver todos")}} type="button" value="Ver todos"/>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            {this.state.showAllIndicadores ?
                            <div>
                                <h5>Ultimos valores indicadores</h5>
                            <table className="highlight">
                                <thead>
                                    <tr>
                                        <th>Indicador</th>
                                        <th>Valor</th>
                                        <th>Unidad</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.indicadores.map(indi=> {
                                            return (
                                                <tr key={indi.key}>
                                                    <td>{indi.key}</td>
                                                    <td>{indi.value}</td>
                                                    <td>{indi.unit}</td>
                                                    <td>{indi.date}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            </div>
                            :null   }
                            {this.state.showHistoIndi ?
                            <div>
                                <h5>{this.state.nameIndicador}</h5>
                                <table className="highlight">
                                    <thead>
                                        <tr>
                                            <th>Valor</th>
                                            <th>Unidad</th>
                                            <th>Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.histoIndicador.slice(-10).map(histo=> {
                                                return (
                                                    <tr key={histo.time}>
                                                        <td>{histo.valor}</td>
                                                        <td>{histo.unit}</td>
                                                        <td>{histo.time}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            :null }
                        </div>
                    </div>
                </div>
        );
    }
}

export default Indicadores;