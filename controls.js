class Controls {
    constructor(type) {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;
        this.leftSignal = false;  
        this.rightSignal = false; 

        switch (type) {
            case "KEYS":
                this.#addKeyboardListeners();
                break;
            case "DUMMY":
                this.forward = true;
                break;
        }
    }

    #addKeyboardListeners() {
        document.onkeydown = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
                case "z": 
                    this.leftSignal = true;
                    break;
                case "x": 
                    this.rightSignal = true;
                    break;
            }
        };

        document.onkeyup = (event) => {
            switch (event.key) {
                case "z":
                    this.leftSignal = false;
                    break;
                case "x":
                    this.rightSignal = false;
                    break;
            }
        };
    }
}
