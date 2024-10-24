const carCanvas=document.getElementById("carCanvas");
carCanvas.width= 200;

const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width= 300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2,carCanvas.width*0.9);

const N = 1000;
const cars = generateCars(N);
let bestCar=cars[0];

if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain = JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.1); // For mutating the best brain and getting varied results
        }
    }
    
}

// Dummy cars
const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-600,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-650,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-900,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-900,30,50,"DUMMY",2),
];

animate();

function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars = [];
    for(let i=1;i<=N;i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return cars;
}

function animate(time) {

    bestCar = cars.find(c => c.y == Math.min(...cars.map(c => c.y)));

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    // Updates each traffic signal
    road.trafficSignals.forEach(signal => signal.update());

    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

    road.draw(carCtx);

    for(let i = 0; i < traffic.length; i++){
        traffic[i].update(road.borders, [], road, road.trafficSignals);
        traffic[i].draw(carCtx, "red");
    }

    carCtx.globalAlpha = 0.2;
    for(let i = 0; i < cars.length; i++){
        cars[i].update(road.borders, traffic, road, road.trafficSignals);
        cars[i].draw(carCtx, "#00FFFF");
    }

    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, "#00FFFF", true);
    
    carCtx.restore();

    networkCtx.lineDashOffset = -time / 50;
    
    requestAnimationFrame(animate);
}