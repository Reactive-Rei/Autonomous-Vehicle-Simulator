1. To run the code optimally from VS Code we can right click on index.html and open it with Live Server.

2. To add/remove the number of AI vehicles we can change line 12 from main.js.

3. After running the code and visualizing it on the local browser we can try clicking on the SAVE button on the top left side of the interface. (Discard/Delete button discards the saved best brain).

4. What it does is it saves the best brain ! i.e. the vehicle that travelled north the most and uses it in further training.

5. This makes the vehicles behave similarly to the best brain from the last sim due to the utilization of the best brain as a base for the current one.

6. In line 21 of the main.js file which calls the mutate function from the NeuralNetwork class we can change the value (0.1 by defalt) to any value between 0 and 1. What it does is that it mutates all the AI vehicles in the field to either behave more similarly or have a varied behavorial pattern depending on the value used.

7. Moving forward, we can also try altering the values in the RuleBasedSystem class located in the rulebasedsystem.js file and see how it affects the whole AI simulation.

8. Some code of this project was implemented and improved from the below reference (also referenced in the paper):

Leupold, M.D. (2024, March 18). Simulating an autono-mous car with a simple neural network. Medium. Retrieved from https://medium.com/@marklpd/simulating-an-autonomous-car-with-a-simple-neural-network-a307f0dec837