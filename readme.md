# Projeto Performance K6

## Documentação

Documentação na URL:  https://test-api.k6.io/

execuç˜ão deve ser feita :

``` k6 run exemplo1.js ``` 

``` k6 run exemplo2.js ``` 

``` k6 run exemplo3.js ``` 

``` k6 run exemplo4.js ``` 

``` k6 run exemplo5.js -e URL=https://test-api.k6.io/public ``` 

## Cenários 

### Public API: Cenário 1

arquivo exemplo1
Public API: 
- Buscar todos os crocodilos

#### Critérios
- Smoke test
1 usuario por 30 segundos 

### Public API: Cenário 2

arquivo exemplo2
Public API: 
- Buscar crocodilos por id

#### Critérios
- Performance test
Ramp up 10 usuarios em 10s
Carga de 10 usuarios por 10s
Ramp down 0 usuarios em 10s

- Limites:
Req com sucesso > 95%
Tempo de requisição 90% menor que 200ms


### Public API: Cenário 3

arquivo exemplo3
Public API: 
- Realizar registro de um novo usuario

#### Critérios
- Performance test
Carga de 10 usuarios por 10s

- Limites:
Req com falha menor a 1%
Duração de requisição 95% menor que 500ms
Requisição com sucesso superior a 95%

### Public API: Cenário 4

arquivo exemplo4
Public API: 
- Realizar o login de um novo usuario

#### Critérios
- Stress test
Ramp up 5 usuarios em 5s 
Carga de 5 usuarios por 5s - > continuar a carga
Ramp up 50 usuarios em 2s - > sobe a carga
Carga de 50 usuarios por 2s - > continuar a carga
Ramp down 0 usuarios em 5s ->  /desaceleração diminir 

- Limites:
Req com falha menor a 1%


### Public API: Cenário 5

arquivo exemplo5
Public API: Multiplos processamento de teste
Realizar consulta a API de listagem de crocodilos e buscar por id de crocodilo

#### Critérios

- É esperado RPS de 200 REQ/S para api de listagem durante 30s
- Para buscar id, o sistema deve atender 50 usuarios onde cada usuario realiza até 20 requisições em até 1 min.
- Usuario par devem realizar buscar ao crocodilo de id 2
- Usuario impar devem realizar buscar ao crocodilo de id 1
- Ambos os testes devem ser simultaneamente


## Relatorios

### K6 report HTML

Repo de como usar relatorio: 
 https://github.com/benc-uk/k6-reporter


### Grafana Cloud K6 


site: https://grafana.com/products/cloud/k6/

pegar o id do projeto e token para configurar

k6 login cloud --token <token>

executar via cloud:

``` k6 cloud exemplo2.js ```

executar local para cloud:

``` k6 run --out cloud exemplo2.js ```

dash: https://adriastephanie.grafana.net/a/k6-app/runs/4205422?tab=thresholds
 