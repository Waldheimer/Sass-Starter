// import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
// import * as axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/1.4.0/axios.min.js'
import data from '../data/env.json' assert { type: 'json'}
import timetable from '../data/data.json' assert { type: 'json' }

//  Request the logbook-Data from HomeAssistant-API
async function requestData(){
    axios.defaults.baseURL = data.uri 
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    axios.defaults.headers.get['Content-Type'] = 'application/json'

    return axios.get()
}


//  Load Example-Timetable from File
export function loadEvents(){
    return timetable._events
}
export function loadEntities(){
    // return ["user", "motion1", "motion2", "power1", "power2", "light1", "light2", "switch1", "switch2"]
    return timetable._entities
}
export function loadAutomations(){
    // return ["light_on", "light_off", "power_on", "power_off"]
    return timetable._automations
}
export function loadServices(){
    return timetable._services;
}
export function loadSources(){
    const sources = []
    let value;
    timetable._events.forEach(e => {
        const val = (value = e.source.split('.')[1]) != null ? value: 'home'
        if(val != null && sources.indexOf(val) < 0)
            sources.push(val)
    })
    return sources
}


// await requestData
