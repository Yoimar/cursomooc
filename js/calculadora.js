var num, acc = 0, op = "", heap="", resultado=false;

$(function() {

  num = $("#num");
  heap = $("#heap");
  memoria = $("#mem");

  /* Controla los eventos del teclado */
  $(document).keydown(function(e) {
    teclado(e);
  });

  /* Eventos para el manejo del click en las operaciones unarias */
  var op_unarias = $(".unaria");
  op_unarias.on('click', function(){unaria($(this).attr("value"));});

  /* Eventos para el manejo del click en las operaciones binarias */
  var op_binarias = $(".binaria");
  op_binarias.on('click', function(){binaria($(this).attr("value"));});

  /* Eventos para el manejo del click en las operaciones n-arias */
  var op_n_arias = $(".n_aria");
  op_n_arias.on('click', function(){naria($(this).attr("value"));});

  /* Eventos para el manejo del click en las operaciones de memoria */
  var op_memoria = $(".membutton");
  op_memoria.on('click', function(){memorie($(this).attr("value"));});

  /* Eventos para el manejo del click en los números */
  var numeros = $(".numero");
  numeros.on('click', function(){addNumber($(this).attr("value"));});

  /* Evento para el manejo del . */
  var punto = $("#punto");
  punto.on('click', function(){addPunto();});

  /* Evento para el manejo de la , */
  var coma = $("#coma");
  coma.on('click', function(){addComa();});

  /* Evento para el manejo del cambio de signo */
  var signo = $("#signo");
  signo.on('click', function(){cambiasigno();});

  /* Evento para el manejo de la tecla de limpiado */
  var reset = $("#limpiar");
  reset.on('click', function(){initVars();});

  /* Evento para el manejo de la tecla de borrado */
  var erase = $("#borrar");
  erase.on('click', function(){borrar();});

  /* Evento para el manejo de la tecla calcular */
  var calc = $("#calcular");
  calc.on('click', function(){calcular();});

  /* Evento para el manejo de la tecla información */
  var inf = $("#inf");
  inf.on('click', function(){info();});

  /* Evento para el manejo de arrastre de la caja de número */
  $("#num").draggable({
      helper: "clone",
      revert: "invalid"
    });

  /* Evento para el manejo de soltar sobre la caja de memoria */
  $("#mem").droppable({
    drop: function(event, ui) {
      $(this).text(ui.draggable.text());
    }
  });

  /* Evento para el manejo de arrastre de la caja de memoria */
  $("#mem").draggable({
      helper: "clone",
      revert: "invalid"
    });

  /* Evento para el manejo de soltar sobre la caja de número */
  $("#num").droppable({
    drop: function(event, ui) {
      $(this).text(ui.draggable.text());
    }
  });
});

function calcular() {
  if (operacionNoValida()) { return; }
  if (heap.text() !== '' && !resultado) {
    heap.text(heap.text() + formatNumValue(num.text()));
    mostrarHeap(heap.text());
    if (op === '+') {num.text(+acc + +num.text());}
    if (op === '-') {num.text(+acc - +num.text());}
    if (op === '*') {num.text(+acc * +num.text());}
    if (op === '÷') {num.text(+acc / +num.text());}
    if (op === '^') {num.text(Math.pow(+acc, +num.text()));}
  }
  resultado = true;
  op = '';
}

function initVars() {
  num.text('');
  mostrarHeap('');
  acc = 0;
  op = '';
  resultado = false;
}

function addNumber(x) {
  if (resultado) {
    initVars();
  }
  if (num.text() === x.toString() && x===0) {
    return;
  }
  if (num.text() === '') {
    num.text(x);
  } else {
    num.text(+num.text() + x);
  }
}

function addPunto() {
  if (num.text() === 'NaN' || num.text() === 'Infinity') { return; }
  if (resultado) {
    var aux = num.text();
    initVars();
    if (contieneComa(aux)) {
      var numeros = aux.split(',');
      aux = numeros[numeros.length - 1];
      if (aux === '' || aux.indexOf('.') === -1) {
        num.text(aux + '.');
      } else {
        num.text(aux);
      }
    } else {
      if (aux === '' || aux.indexOf('.') === -1) {
        num.text(aux + '.');
      } else {
        num.text(aux);
      }
    }
  } else {
    if (contieneComa(num.text())) {
       var numeros = num.text().split(',');
       var aux = numeros[numeros.length - 1];
       if (aux === '' || aux.indexOf('.') === -1) {
         num.text(num.text() + '.');
       }
    } else {
      if (num.text() === '' || num.text().indexOf('.') === -1) {
        num.text(num.text() + '.');
      }
    }
  }
}

function addComa() {
  if (num.text() === '' || num.text() === 'NaN' || num.text() === 'Infinity') { return; }
  if (resultado) {
    var aux = num.text();
    initVars();
    num.text(aux + ',');
  } else {
    if (num.text().charAt(num.text().length - 1) === '.') {
      num.text(num.text() + '0,');
    } else if (num.text().charAt(num.text().length - 1) === ',') {
        return;
    } else {
      num.text(num.text() + ',');
    }
  }
}

function cambiasigno() {
  if (num.text() === '' || num.text() === 'NaN' || num.text() === 'Infinity') { return; }
  if (resultado) {
    heap.text('');
  }
  if (num.text().indexOf(',') !== -1) {
    var ultimacifra = num.text().substring(num.text().lastIndexOf(',') + 1);
    if (ultimacifra === '.') { return; }
    if (ultimacifra.charAt(0) === '-') {
      ultimacifra = ultimacifra.substring(1);
    } else {
      ultimacifra = '-' + ultimacifra;
    }
    num.text(num.text().substring(0, num.text().lastIndexOf(',') + 1) + ultimacifra);
  } else {
    if (num.text() === '.') { return; }
    if (num.text().charAt(0) === '-') {
      num.text(num.text().substring(1, num.text().length));
    } else {
      num.text('-' + num.text());
    }
  }
}

function memorie(x) {
  switch (x) {
    case 'toMem':
      if (num.text() === 'NaN' || num.text() === 'Infinity' || heap.text() === 'OPERACION INVALIDA') {return;}
      memoria.text(num.text());
      break;
    case 'fromMem':
      num.text(memoria.text());
      break;
  }
}

function binaria(x) {
  if (operacionNoValida()) { return; }
  if (num.text() === '' && acc===0) { return; }
  if (contieneComa(num.text())) {
    heap.text('OPERACION INVALIDA');
    return;
  }
  if (resultado) {
    acc = +formatNumValue(num.text());
    mostrarHeap(formatNumValue(num.text()) + x);
    resultado = false;
  } else {
    if (op === '') {
      acc += +formatNumValue(num.text());
      heap.text(heap.text() + formatNumValue(num.text()) + x);
      mostrarHeap(heap.text());
    } else {
      heap.text(heap.text().substring(0, heap.text().length - 1) + x);
      mostrarHeap(heap.text());
    }
  }
  op = x;
  num.text('');
}

function naria(x) {
  /* Comprobamos el formato de la entrada de números */
  if (num.text() === '' || num.text() === 'NaN' || num.text() === 'Infinity') {return;}
  switch(x) {
    case 'sum':
        acc = 0;
        num.text().split(",").forEach( function(num) {
          if (num === '.') { num = '0.0' };
          acc += +num;
        } );
        heap.html('&#931;(' + num.text() + ')');
        mostrarHeap(heap.text(), true);
        num.text(acc);
        acc = 0;
      break;
    case 'pro':
        acc = 1;
        num.text().split(",").forEach( function(num) {
          if (num === '.') { num = '0.0' };
          acc *= +num;
        } );
        heap.html('&#928;(' + num.text() + ')');
        mostrarHeap(heap.text(), true);
        num.text(acc);
        acc = 0;
      break;
  }
  resultado = true;
}

function unaria(x) {
  if (operacionNoValida()) { return; }
  if (contieneComa(num.text())) {
    heap.text('OPERACION INVALIDA');
    return;
  }
  switch(x) {
    case 'cf':
      mostrarHeap('Entero(' + num.text() + ')');
      if (+num.text() >= 0) {
        num.text(Math.floor(+num.text()));
      } else {
        num.text(Math.ceil(+num.text()));
      }
      resultado = true;
      break;
    case 'sqrt':
      mostrarHeap('Raíz(' + formatNumValue(num.text()) + ')');
      num.text(Math.sqrt(+num.text()));
      resultado = true;
      break;
    case 'inv':
      mostrarHeap('Inverso(' + formatNumValue(num.text()) + ')');
      num.text(1 / +num.text());
      resultado = true;
      break;
    case 'elv':
      mostrarHeap('Cuadrado(' + formatNumValue(num.text()) + ')');
      num.text(Math.pow(+num.text(), 2));
      resultado = true;
      break;
    case 'exp2':
      mostrarHeap('2^' + formatNumValue(num.text()));
      num.text(Math.pow(2, +num.text()));
      resultado = true;
      break;
    case '!':
      num.text(Math.floor(num.text()));
      mostrarHeap(formatNumValue(num.text()) + '!');
      num.text(factorial(+formatNumValue(num.text())));
      resultado = true;
      break;
  }
}

function factorial(n) {
  if (n === 0 || n === 1) {return 1;}
  if (+n < 0) {return 'NaN';}
  var acumulador = +n;
  var i = +n - 1;
  while (i > 0) {
    acumulador *= i;
    i--;
  }
  return acumulador;
}

function contieneComa(x) {
  if (x === '') { return; }
  if (x.indexOf(',') < 0) { return false; }
  else { return true; }
}

function operacionNoValida() {
  if (num.text() === '' || num.text() === 'NaN' || num.text() === 'Infinity' || heap.text() === 'OPERACION INVALIDA') { return true; }
  else { return false; }
}

function formatNumValue(x) {
  if (x === '') {
    return '';
  }
  if (x.indexOf('.') === 0 || x.indexOf('.') === (x.length - 1)) {
    if (x.indexOf('.') === 0) {
      x = '0' + x;
      num.text(x);
    }
    if (x.indexOf('.') === (x.length - 1)) {
      x += '0';
      num.text(x);
    }
    return x;
  }
  return x;
}

function mostrarHeap(x, punto) {
  if (punto) {
    if (x.substring(2,5) === '.0,') {
      x = x.substring(0,2) + '0.0' + x.substring(4, x.length);
    }
    if (x.substring(x.length - 3, x.length - 1) === ',.') {
      x = x.substring(0, x.length - 2) + '0.0)';
    }
    x = x.replace(',.0,', ',0.0,');
    heap.text(x);
    if (heap.text().length > 25) {
      heap.text(heap.text().substring(0,22) + '...');
    }
  } else {
    if (x.length>25) {
      heap.text(x.substring(0, 24));
      if (heap.text().indexOf('(') !== -1 && heap.text().indexOf(')') === -1) {
        heap.text(heap.text() + ")");
      }
    } else {
      heap.text(x);
    }
  }
}

function borrar() {
  if (num.text() !== '' && num.text() !== 'NaN' && num.text() !== 'Infinity') {
    num.text(num.text().substring(0, num.text().length - 1));
    if (resultado) {
      mostrarHeap('');
      resultado = false;
    }
  }
}

function info() {
  if ($("#leyenda").attr('class') === 'ayuda_off') {
    $("#leyenda").removeClass('ayuda_off');
    $("#leyenda").addClass('ayuda_on');
  } else {
    $("#leyenda").removeClass('ayuda_on');
    $("#leyenda").addClass('ayuda_off');
  }
}

function teclado(event) {
  k = event.keyCode;
  if (k > 47 && k < 58) {
    p = k - 48; //buscar número a mostrar.
    p = String(p) //convertir a cadena para poder añádir en pantalla.
    addNumber(p); //enviar para mostrar en pantalla
  }
  if (k > 95 && k < 106) {
    p = k - 96;
    p = String(p);
    addNumber(p);
  }
  if (k === 110 || k === 190) {
    addPunto();
  }
  if (k === 188) {
    addComa();
  }
  if (k === 106) {
    binaria('*');
  }
  if (k === 107) {
    binaria('+');
  }
  if (k === 109) {
    binaria('-');
  }
  if (k === 111) {
    binaria('÷');
  }
  if (k === 88) {
    binaria('^');
  }
  if (k === 69) {
    unaria('cf');
  }
  if (k === 82) {
    unaria('sqrt');
  }
  if (k === 73) {
    unaria('inv');
  }
  if (k === 67) {
    unaria('elv');
  }
  if (k === 68) {
    unaria('exp2');
  }
  if (k === 70) {
    unaria('!');
  }
  if (k === 83) {
    /* SUMATORIO */
  }
  if (k === 80) {
    /* PRODUCTORIO */
  }
  if (k === 13) {
    calcular();
  }
  if (k === 8) {
    borrar();
  }
  if (k === 46) {
    initVars();
  }
  if (k === 189) {
    cambiasigno();
  }
}
