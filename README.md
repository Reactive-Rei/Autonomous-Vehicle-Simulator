# Autonomous-Vehicle-Simulator

## Overview

This project presents a **self-driving car simulation** that integrates **rule-based reasoning** and **neural networks** to autonomously navigate through a virtual environment while adhering to traffic rules. The simulation features a **neural network** that processes sensor data for real-time decision-making, and a **rule-based system** that ensures the car's behavior aligns with traffic regulations such as maintaining safe distances, lane changes, and responding to traffic signals.

This simulator is a tool for understanding the complex dynamics of **autonomous vehicles** and their interaction with real-world traffic conditions. It highlights the collaboration between **machine learning** and **rule-based systems** in managing vehicle control and decision-making processes.

## Features

- **Neural Networks**: Simulates decision-making processes based on sensory inputs such as obstacles and traffic signals.
- **Rule-based Reasoning**: Ensures the vehicle adheres to traffic laws and safety measures.
- **Sensory Simulation**: Provides data input mimicking a car's vision and proximity detection.
- **Dynamic Traffic Interaction**: Manages interactions with other vehicles, road signals, and obstacles.
- **Training via Mutation**: Simulates learning and improvement in vehicle decision-making over time.

## System Components

### 1. Vehicle Controller

The **vehicle controller** manages the car’s movements by processing data from the neural network and the rule-based system. It ensures the vehicle performs actions such as acceleration, deceleration, and turning, following predefined traffic rules and real-time sensory data.

### 2. Environmental Sensor Module

This module simulates the car's sensory system, which identifies nearby objects such as other vehicles and road boundaries. The sensor data informs the neural network and rule-based system to make adjustments based on the car's proximity to obstacles.

### 3. Neural Network

The neural network is trained to handle decision-making by processing sensory data and outputting control signals for the vehicle. The system uses a **genetic algorithm** to adapt and learn from its environment, making decisions on lane changes, accelerations, and avoiding obstacles.

### 4. Rule-based System

Working in parallel with the neural network, the rule-based system ensures that the vehicle follows traffic rules and emphasizes safety in its decision-making.

### 5. Simulated Driving Environment

The driving environment includes a multi-lane street with traffic signals, obstacles, and other vehicles. The car must navigate this environment while adhering to the traffic rules enforced by the rule-based system.

### 6. Rendering and User Interaction

The simulation is rendered using **HTML5 Canvas**, where vehicle positions, sensory inputs, and traffic conditions are displayed in real-time. Users can interact with the simulation via buttons that allow saving and discarding neural network states.

## Installation

To run this project locally, follow the steps below:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/vehicle-simulator.git
   cd vehicle-simulator
   ```
2. Install dependencies:

   ```bash
   npm install

   ```

3. Run the simulation:
   ```bash
   npm start
   ```

## How It Works

### Initialization

The vehicle and environment are initialized with default settings. The neural network is set to its initial state, and the rule-based system is prepared to enforce traffic rules.

### Simulation Cycle

During each simulation step:

- Sensor inputs detect the surrounding environment.
- The neural network processes the sensor data and outputs control signals for steering, acceleration, and braking.
- The rule-based system ensures compliance with traffic laws, such as stopping at traffic signals and maintaining safe distances from other vehicles.

### Learning Process

The neural network improves over time through simulated learning (mutation). The mutation introduces small changes to the neural network's parameters, allowing it to improve decision-making over successive simulation cycles.

## Results

- The simulator successfully demonstrates the car’s ability to navigate a dynamic environment, avoiding collisions and following traffic laws.
- Rule-based reasoning ensures that vehicles maintain safe distances from others and respond appropriately to traffic signals.
- Over time, the neural network learns to optimize driving behavior, balancing safety with efficiency.

## Future Work

- **Advanced Traffic Situations**: Further development could involve more complex traffic scenarios, including pedestrian interactions and multi-vehicle coordination.
- **Refinement of Neural Networks**: Implementing more sophisticated machine learning techniques could improve the vehicle’s decision-making capabilities.
- **Real-world Testing**: Future testing in controlled real-world environments could provide valuable insights into the system’s performance and areas for improvement.

## Conclusion

This project demonstrates a fusion of **rule-based reasoning** and **neural networks** in managing the complexities of autonomous driving. By simulating a driving environment, it showcases the potential of combining **AI** and **traditional rule-based systems** to enhance the safety and performance of self-driving vehicles.

---

## Contact

If you have any questions, feel free to reach out to me at:

- **Email**: vidung@iu.edu
