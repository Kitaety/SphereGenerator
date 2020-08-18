//создание объекта
let sphere  = document.getElementById('sphere');
let container = document.getElementById('container');
let cube =document.getElementById("cube");


let img = new Image();
img.style.display='none';
img.src= `./texture.jpg`;
container.append(img);





function generateSphere(count){
	while (sphere.firstChild) {
		sphere.removeChild(sphere.firstChild);
	}
	
	let q =Math.log(count)/Math.log(2);

	let width = 100/q,
		height = 100/q;
	let countH = count/2+1;


	let texturePolygonWidth = img.width/count,
		texturePolygonHeigth = img.height/countH;
		
	console.log({'w':texturePolygonWidth,'h':texturePolygonHeigth})

	sphere.style.width=`${width}px`;
	sphere.style.height=`${height}px`;

	let stepAngle = 360/count;
	let number = 1;
	let currentAngleY = 0,
		currentAngleX = 0;
	//нахождение геометрических параметров сферы по горизонтали
	//внутренний угол
	let a = ((count-2)/count)*180;
	//радиус описанной окружности
	let k =2*Math.sin(Math.PI/count);
	let R = width/k;
	//радиус вписанной окружности
	let r = Math.sqrt(R*R - (width*width)/4);

	//константы
	let p = countH-1;
	let b =Math.tan(Math.PI/count);

	let lastProc =0;
	let lastR = R*Math.sin(((p*stepAngle)/2)*Math.PI/180);

	//countH/2+1
	for(let i =0; i <countH/2; i++){

		
		let currentWidth = 2*lastR*b;
		let proc = (1-currentWidth/width)*100;
		
		for(let j = 0; j < count; j++){
			//создание полигона
			let side = document.createElement('div');
			side.className = `side ${number}`;
			//установка размеров полигона
			side.style.width = `${width}px`;
			side.style.height = `${height}px`;
			side.style.lineHeight=`${height}px`;
			
			if(i<(countH-1)/2+1){
				side.style.clipPath=`polygon(${proc/2}% 0%, ${100-proc/2}% 0%, ${100-lastProc/2}% 100%, ${lastProc/2}% 100%)`;
			}
			else{
				side.style.clipPath=`polygon(50% 50%, 50% 50%, ${100-lastProc/2}% 100%, ${lastProc/2}% 100%)`;
			}

			side.style.backfaceVisibility = "hidden";

			//установка фона
			//side.style.backgroundTepeat = "no-repeat";
			side.style.backgroundImage = `url('${img.src}')`;
			side.style.backgroundSize = `${count*width}px ${countH*height}px`
			side.style.backgroundPositionX = `-${j * width}px`;
			side.style.backgroundPositionY = `-${(((countH-1)/2)-i) * height}px`;

			//поворот полигона
			side.style.transform =
			`rotateY(${currentAngleY}deg) rotateX(${-currentAngleX}deg) translateZ(${r}px)` 
			//добавление полигона
			sphere.append(side);

			if(i){
				let bufSide = document.createElement('div');
				bufSide.className = `side ${number+1}`;
				bufSide.style.width = `${width}px`;
				bufSide.style.height = `${height}px`;
				bufSide.style.lineHeight=`${height}px`;
				if(i<(countH-1)/2){
					bufSide.style.clipPath=`polygon(${100-lastProc/2}% 0%, ${lastProc/2}% 0%,${proc/2}% 100%, ${100-proc/2}% 100%)`;
				}
				else{
					bufSide.style.clipPath=`polygon( ${100-lastProc/2}% 100%, ${lastProc/2}% 100%,50% 50%, 50% 50%)`;
				}
				bufSide.style.backgroundTepeat = "no-repeat";
				bufSide.style.backgroundImage = `url('${img.src}')`;
				bufSide.style.backgroundSize = `${count*width}px ${countH*height}px`
				bufSide.style.backgroundPositionX = `-${j * width}px`;
				bufSide.style.backgroundPositionY = `-${((countH-1)/2+i) * height}px`;
				bufSide.style.transform =
				`rotateY(${currentAngleY}deg) rotateX(${currentAngleX}deg) translateZ(${r}px)`
				sphere.append(bufSide);
				number+=2;
			}else{
				number++;
			}
			
			currentAngleY += stepAngle;
		}

		currentAngleY = 0;
		currentAngleX -= stepAngle;

		lastWidth = currentWidth;
		lastProc = proc;
		p-=2;
		lastR = R*Math.sin((((p)*stepAngle)/2)*Math.PI/180);
	}
}



//обработка поворота объекта
let rotateY = 0, rotateX = 0;

document.onkeydown = function (e) {
    if (e.keyCode === 37) rotateY -= 5;
	if (e.keyCode === 38) rotateX += 5;
	if (e.keyCode === 39) rotateY += 5;
	if (e.keyCode === 40) rotateX -= 5;

	if(rotateX>360)
		rotateX=0;
	if(rotateX<0)
		rotateX=360;
	if(rotateY>360)
		rotateY=0;
	if(rotateY<0)
		rotateY=360;

	sphere.style.transform = 
    'rotateY(' + rotateY + 'deg)'+
	'rotateX(' + rotateX + 'deg)';

	cube.style.transform = 
    'rotateY(' + rotateY + 'deg)'+
    'rotateX(' + rotateX + 'deg)';
}

//обратка поля ввода
let input = document.getElementById("input");

function onClick(){
	let value = new Number(input.value);
	
	if(value>=4 && value%2==0){
		generateSphere(value);
	}
}