import React from 'react'
import Indicadores from './Indicadores';
import fetch from 'isomorphic-fetch';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

it("Test api indicadores status", async function(){
    const response = new Indicadores();
    let data = await response.testStatusApi();
    console.log(data);
    expect(data).toEqual(200);
});

it("Test api tracker status", async function(){
    const response = new Indicadores();
    let data = await response.tracker('Titulo prueba','Descripción prueba');
    console.log(data);
    expect(data).toEqual(200);
});