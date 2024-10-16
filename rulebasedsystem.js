class RuleBasedSystem {
    static checkRules(car, outputs, road, traffic, trafficSignals) {
        outputs = this.applySpeedLimits(car, outputs);
        outputs = this.ensureSafetyDistance(car, outputs);
        outputs = this.attemptLaneChange(car, outputs, road, traffic);
        outputs = this.checkTrafficSignal(car, outputs, trafficSignals);
        return outputs;
    }

    static applySpeedLimits(car, outputs) {
        if (car.speed > car.maxSpeed) {
            
            outputs[0] = 0;  // To stop accelerating
        }
        return outputs;
    }

    static ensureSafetyDistance(car, outputs) {
        const minSafetyDistance = 0.45;  // 45% of the ray length
        if (car.sensor.readings.some(reading => reading && reading.offset < minSafetyDistance)) {
            
            outputs[0] = 0;  // To stop accelerating
        }
        return outputs;
    }

    static attemptLaneChange(car, outputs, road, traffic) {
        const laneWidth = road.width / road.laneCount;
        const currentLaneIndex = Math.floor((car.x - road.left) / laneWidth);
        const leftLaneIndex = currentLaneIndex - 1;
        const rightLaneIndex = currentLaneIndex + 1;
        const currentSpeed = car.speed;
        const minSpeedForOvertake = car.maxSpeed * 0.8;  

        if (currentSpeed < minSpeedForOvertake) {
            const leftLaneClear = leftLaneIndex >= 0 && this.isLaneClear(car, leftLaneIndex, road, traffic);
            const rightLaneClear = rightLaneIndex < road.laneCount && this.isLaneClear(car, rightLaneIndex, road, traffic);

            if (leftLaneClear || rightLaneClear) {
                if (leftLaneClear && car.controls.leftSignal) {  // Here checking if left turn signal is on
                    
                    outputs[1] = true;  // move left signal
                } else if (rightLaneClear && car.controls.rightSignal) {  // Here checking if right turn signal is on
                    
                    outputs[2] = true;  // move right signal
                }
            }
        }
        return outputs;
    }

    static isLaneClear(car, laneIndex, road, traffic) {
        const laneWidth = road.width / road.laneCount;
        const laneCenter = road.getLaneCenter(laneIndex);
        const safetyDistance = car.height * 2;  // check if the empty lane is truly empty

        // Checking if a vehicle in the targeted lane is close
        return !traffic.some(vehicle => {
            return vehicle.x > laneCenter - laneWidth / 2 &&
                   vehicle.x < laneCenter + laneWidth / 2 &&
                   Math.abs(vehicle.y - car.y) < safetyDistance;
        });
    }

    static checkTrafficSignal(car, outputs, trafficSignals) {
        trafficSignals.forEach(signal => {
            if (Math.abs(signal.y - car.y) < 100) { // Checking if signal is within 100 px
                if ((signal.type === 'light' && signal.state === 'red') ||
                    (signal.type === 'sign' && signal.state === 'stop')) {
                    
                    outputs[0] = 0;
                    car.speed = 0;
                }
            }
        });
        return outputs;
    }
}
