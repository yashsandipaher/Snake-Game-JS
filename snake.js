function intialization()
{
    myCanvas = document.getElementById("mycanvas");
    canvasWidth = myCanvas.width = 1005;
    canvasHeight = myCanvas.height = 866;
    pen = myCanvas.getContext("2d");
    cellSize = 67;
    game_over = false;
    score = 5;

    foodImage = new Image;
    foodImage.src = "Assets/apple.png";
    trophyImage = new Image;
    trophyImage.src = "Assets/trophy.png";
    food = getRandomFood();
    
    snake = {
        initial_length :5,
        color:"blue",
        direction:"right",
        cell : [],

        createSnake : function(){
            for(var i=this.initial_length; i>0; i--)
            {
                this.cell.push({x:i,y:0});
            }
        },

        drawSnake : function(){
            for(var i=0; i<this.cell.length;i++)
            {
                pen.fillStyle = snake.color;
                pen.fillRect(this.cell[i].x*cellSize, this.cell[i].y*cellSize,cellSize-2,cellSize-2);
            }
        },

        updateSnake : function()
        {

            // check if snake eat the food then increase the length of snake and generate
            // new object
            headX = this.cell[0].x;
            headY = this.cell[0].y;

            if(headX == food.x && headY == food.y)
            {
                console.log("food eaten....");
                food = getRandomFood();
                score++;
            }
            else
            {
                this.cell.pop();
            }

            var nextX,nextY;

            if(this.direction == "right")
            {
                nextX = headX+1;
                nextY = headY;
            }
            else if(this.direction == "left")
            {
                nextX = headX-1;
                nextY = headY;
            }
            else if(this.direction == "up")
            {
                nextX = headX;
                nextY = headY-1;
            }
            else
            {
                nextX = headX;
                nextY = headY+1;
            }
            
            this.cell.unshift({x:nextX,y:nextY});

            // game over logic
            var last_x = Math.round(canvasWidth/cellSize);
            var last_y = Math.round(canvasHeight/cellSize);

            if(this.cell[0].y < 0 || this.cell[0].x < 0 || this.cell[0].x > last_x || this.cell[0].y > last_y )
            {
                game_over = true;
            }
        }

    };

    snake.createSnake();

    //here we add keyboard event for snake like up,down,right,left

    function keyPressed(e)
    {
        if(e.key == "ArrowRight")
        {
            snake.direction = "right";
        }
        else if(e.key == "ArrowLeft")
        {
            snake.direction = "left";
        }
        else if(e.key == "ArrowDown")
        {
            snake.direction = "down";
        }
        else
        {
            snake.direction = "up";
        }
    }

    document.addEventListener('keydown',keyPressed);
    

}

function draw()
{
    pen.clearRect(0,0,canvasWidth,canvasHeight);
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.drawImage(foodImage,food.x*cellSize,food.y*cellSize,cellSize,cellSize);

    pen.fillText("SCORE : ",30,50);
    pen.font = "30px Roboto";
    pen.fillText(score,150,50);
}

function update()
{
    snake.updateSnake();
}


function getRandomFood()
{
    var foodX = Math.round(Math.random()*(canvasWidth-cellSize)/cellSize);
    var foodY = Math.round(Math.random()*(canvasHeight-cellSize)/cellSize);

    var food  = {
        x:foodX,
        y:foodY,
        color : "red"
    }

    return food;
}

function gameLoop()
{
    if(game_over == true)
    {
        clearInterval(f);
        alert("Game Over.....");
    }
    draw();
    update();
}

intialization();
var f = setInterval(gameLoop,150);
