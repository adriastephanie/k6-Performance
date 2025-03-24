import { check, sleep } from 'k6';
import http from 'k6/http';
import { SharedArray } from 'k6/data';

// 1 usuario por 3 segundos
export const options = {
    stages: [
        {duration: '10s', target: 10}, //1 carga com usuario de 10 por 10 segundos
        {duration: '10s', target: 10}, //2 carga com usuario de 10 por 10 segundos
        {duration: '10s', target: 0}, //desaceleração diminir 
    ],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(90) < 200']
    },
    ext:{
        loadimpact:{
            projectID: '3756672',
            name: 'POC CURSO K6'
        }
    }
}

const data = new SharedArray('Leitura do json', function(){
    return JSON.parse(open('./dados.json')).crocodilos
})

export default function() {

    const crocodilo = data[Math.floor(Math.random() * data.length)].id

    console.log(crocodilo);

    const BASE_URL = `https://test-api.k6.io/public/crocodiles/${crocodilo}`;

    const response = http.get(BASE_URL);

    check(response, {
        'status code 200 for id': (r) => r.status === 200
    });
}
