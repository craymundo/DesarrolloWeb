var me = this;

me.Globals = {
	on: document.getElementById('on'),
	sign: document.getElementById('sign'),
	raiz: document.getElementById('raiz'),
	dividido: document.getElementById('dividido'),
	por: document.getElementById('por'),
	menos: document.getElementById('menos'),
	suma: document.getElementById('mas'),
	punto: document.getElementById('punto'),
	igual: document.getElementById('igual'),
	tecla0: document.getElementById('0'),
	tecla1: document.getElementById('1'),
	tecla2: document.getElementById('2'),
	tecla3: document.getElementById('3'),
	tecla4: document.getElementById('4'),
	tecla5: document.getElementById('5'),
	tecla6: document.getElementById('6'),
	tecla7: document.getElementById('7'),
	tecla8: document.getElementById('8'),
	tecla9: document.getElementById('9'),
	result: document.getElementById('display'),
};


me.Calculadora = {
	
	inicializacion : function () {
		console.log('inicializacion');
		me.Globals.suma.addEventListener('click',function(){me.Calculadora.operacion('+')});
		me.Globals.menos.addEventListener('click',function(){me.Calculadora.operacion('-')});
		me.Globals.por.addEventListener('click',function(){me.Calculadora.operacion('*')});
		me.Globals.dividido.addEventListener('click',function(){me.Calculadora.operacion('/')});
		me.Globals.raiz.addEventListener('click',function(){me.Calculadora.raiz()});
		me.Globals.on.addEventListener('click',function(){me.Calculadora.clear()});
		me.Globals.tecla0.addEventListener('click',function(){me.Calculadora.presionoTecla('0')});
		me.Globals.tecla1.addEventListener('click',function(){me.Calculadora.presionoTecla('1')});
		me.Globals.tecla2.addEventListener('click',function(){me.Calculadora.presionoTecla('2')});
		me.Globals.tecla3.addEventListener('click',function(){me.Calculadora.presionoTecla('3')});
		me.Globals.tecla4.addEventListener('click',function(){me.Calculadora.presionoTecla('4')});
		me.Globals.tecla5.addEventListener('click',function(){me.Calculadora.presionoTecla('5')});
		me.Globals.tecla6.addEventListener('click',function(){me.Calculadora.presionoTecla('6')});
		me.Globals.tecla7.addEventListener('click',function(){me.Calculadora.presionoTecla('7')});
		me.Globals.tecla8.addEventListener('click',function(){me.Calculadora.presionoTecla('8')});
		me.Globals.tecla9.addEventListener('click',function(){me.Calculadora.presionoTecla('9')});
		me.Globals.punto.addEventListener('click',function(){me.Calculadora.presionoTecla('.')});
		me.Globals.sign.addEventListener('click',function(){me.Calculadora.presionoTecla('-')});
		me.Globals.igual.addEventListener('click',function(){me.Calculadora.ejecutarOp()});
	},
	presionoTecla: function(valor) { 
		
		var operacion = sessionStorage.getItem('operacion');
		var display,result;
		if(operacion == null || operacion == ''){
			display = sessionStorage.getItem('operador1')== null?me.Globals.result.textContent:sessionStorage.getItem('operador1');
		}else{
			if(valor == '-' || valor == '.') return;
			display = sessionStorage.getItem('operador2')== null?me.Globals.result.textContent:sessionStorage.getItem('operador2');
		}
		result = '';
		if(valor == '.'){
			if(display.lastIndexOf('.')<0) 
				result = display + valor ;
		}else if(valor == '-'){
			if(display.lastIndexOf('-')<0) 
				result = valor  + display ;
			else
				result = display.replace('-','') ;
		}else{
			if( display == '0') result = valor ;
			else result = display + valor ;			
		}
		
		if(result=='') result = display;

		if(operacion == null || operacion == '')
			sessionStorage.setItem('operador1',result);
		else
			sessionStorage.setItem('operador2',result);
		me.Globals.result.textContent = result.substring(0,8);

	},
	clear: function () {
		me.Globals.result.textContent = '0';
		sessionStorage.setItem('operador1','0');
		sessionStorage.setItem('operacion','');
		sessionStorage.setItem('operador2','0');
	},
	operacion: function (op) {
		sessionStorage.setItem('operacion',op);
		me.Globals.result.textContent = '';
	},
	raiz: function () { console.log('raiz sin implementar');},
	ejecutarOp: function () {
		valor1= sessionStorage.getItem('operador1');
		valor2= sessionStorage.getItem('operador2');
		op= sessionStorage.getItem('operacion');
		me.Globals.result.textContent = eval(valor1+op+valor2);
	},	
};

me.Calculadora.inicializacion();