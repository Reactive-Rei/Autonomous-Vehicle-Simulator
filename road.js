class TrafficSignal {
    constructor(x, y, type, state, duration = 3000) {
        this.x = x;
        this.y = y;
        this.type = type; // light
        this.state = state; // state means red or green
        this.duration = duration; // duration the light is supposed to stay red/green
        this.lastChangeTime = Date.now();
    }

    update() {
        if (this.type === 'light' && Date.now() - this.lastChangeTime > this.duration) {
            // Toggle between red and green
            this.state = this.state === 'red' ? 'green' : 'red';
            this.lastChangeTime = Date.now();
        }
    }

    draw(ctx) {
        if (this.type === 'light') {
            ctx.fillStyle = this.state === 'red' ? 'red' : 'green';
            ctx.beginPath();
            ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
            ctx.fill();
        } else if (this.type === 'sign') {
            ctx.fillStyle = 'white';
            ctx.fillRect(this.x - 10, this.y - 10, 20, 20);
            ctx.fillStyle = 'black';
            ctx.fillText("STOP", this.x - 5, this.y + 5);
        }
    }

    
}

class Road {
    constructor(x, width, laneCount = 3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - width / 2;
        this.right = x + width / 2;

        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;

        this.borders = [
            [{ x: this.left, y: this.top }, { x: this.left, y: this.bottom }],
            [{ x: this.right, y: this.top }, { x: this.right, y: this.bottom }]
        ];

        // Initialize traffic signals array
        this.trafficSignals = [
            new TrafficSignal(this.getLaneCenter(1), -3000, 'light', 'red', 10000),
            new TrafficSignal(this.getLaneCenter(1), -4000, 'light', 'red', 10000)
        ];
    }

    getLaneCenter(laneIndex) {
        const laneWidth = this.width / this.laneCount;
        return this.left + laneWidth / 2 + Math.min(laneIndex, this.laneCount - 1) * laneWidth;
    }

    drawTrees(ctx, startX, endX, startY, endY, spacing, side) {
        const treeColor = '#228B22';
        const trunkColor = '#8B4513';
        const trunkWidth = 4;
        const trunkHeight = 10;
        const foliageRadius = 15;
    
        const x = side === 'left' ? startX - 20 : endX + 20;
    
        for (let y = startY; y < endY; y += spacing) {
            
            ctx.fillStyle = trunkColor;
            ctx.fillRect(x - trunkWidth / 2, y, trunkWidth, trunkHeight);
    
            
            ctx.fillStyle = treeColor;
            ctx.beginPath();
            ctx.arc(x, y + trunkHeight + foliageRadius, foliageRadius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    

    draw(ctx) {
        
        const roadGradient = ctx.createLinearGradient(this.left, 0, this.right, 0);
        roadGradient.addColorStop(0, "#333");
        roadGradient.addColorStop(1, "#666");

        ctx.fillStyle = roadGradient;
        ctx.fillRect(this.left, this.top, this.width, Math.abs(this.top) + Math.abs(this.bottom));

        ctx.strokeStyle = "#FFF";
        ctx.lineWidth = 2;
        ctx.setLineDash([20, 10]);
        for (let i = 1; i < this.laneCount; i++) {
            const x = this.getLaneCenter(i) - (this.width / this.laneCount) / 2;
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }

        ctx.strokeStyle = "#CCC";
        ctx.lineWidth = 10;
        ctx.setLineDash([]);
        this.borders.forEach(border => {
            ctx.beginPath();
            ctx.moveTo(border.x, border.y);
            ctx.lineTo(border.toX, border.toY);
            ctx.stroke();
        });

        this.trafficSignals.forEach(signal => {
            signal.update();
            signal.draw(ctx);
        });

        const startY = this.top + 100; 
        const endY = this.bottom - 100; 
        const treeSpacing = 100;

        this.drawTrees(ctx, this.left, this.right, startY, endY, treeSpacing, 'left');
        this.drawTrees(ctx, this.left, this.right, startY, endY, treeSpacing, 'right');
    }
}




