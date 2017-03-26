var oper = "",
    memoria = "",
    acum = "";

function clear() {
    'use strict';
    var num = $("#txtNum");
    num.val("");
}

function clearMem() {
    'use strict';
    var num = $("#txtMem");
    num.val("");
}

function entero(valor) {
    'use strict';
    return (+valor >= 0 ? Math.floor(+valor) : Math.ceil(+valor));
}

function toM() {
    'use strict';
    var valor = $("#txtNum").val();
    $("#memory").text(valor);
}

function fromM() {
    'use strict';
    var valor = $("#memory").text();
    $("#txtNum").val(valor);
}

function addNum(digito) {
    'use strict';
    var num = $("#txtNum");
    if (oper === undefined) {
        clear();
        oper = "";
    }
    num.val(num.val() + digito);
}

function chgOper(operacion) {
    'use strict';
    oper = operacion;
    acum = $("#txtNum").val();
    clear();
}

function calcular() {
    'use strict';
    var total = 0,
        num = $("#txtNum"),
        valor = num.val();

    if (acum === "" || oper === "" || isNaN(valor)) {
        return false;
    }

    if (valor === "") {
        valor = +acum;
    }

    if (oper === "X^Y") {
        total = Math.pow(+acum, +valor);
    } else {
        total = eval(acum + oper + valor);
    }

    num.val(total);
    oper = undefined;
}

$(document).ready(function () {
    'use strict';

    $(".btn").mouseup(function () {
        $(this).blur();
    });

    $("#pantalla").draggable({
        revert: true,
        opacity: 0.7,
        delay: 150,
        helper: "original",
        revertDuration: 250,
        scope: "default",
        start: function (event, ui) {
            $("#pant-handle").hide();
        },
        stop: function (event, ui) {
            $("#pant-handle").show();
        },
        zIndex: 99,
        distance: 1
    });

    $("#memoria").draggable({
        revert: true,
        opacity: 0.7,
        delay: 150,
        helper: "original",
        revertDuration: 250,
        scope: "default",
        start: function (event, ui) {
            $("#mem-handle").hide();
        },
        stop: function (event, ui) {
            $("#mem-handle").show();
        },
        zIndex: 99,
        distance: 1
    });

    $("#txtNum").droppable({
        addClasses: false,
        hoverClass: "ui-state-hover2",
        greedy: true,
        tolerance: "pointer", 
        drop: function (event, ui) {
            var valor = ui.draggable.find("#memory").text();
            $(this).val(valor);
        }
    });

    $("#memory").droppable({
        addClasses: false,
        hoverClass: "ui-state-hover2",
        greedy: true,
        tolerance: "pointer", 
        drop: function (event, ui) {
            var valor = ui.draggable.find("#txtNum").val();
            $(this).text(valor);
        }
    });

    $("#btn1").on("click", function () {
        addNum("1");
    });

    $("#btn2").on("click", function () {
        addNum("2");
    });

    $("#btn3").on("click", function () {
        addNum("3");
    });

    $("#btn4").on("click", function () {
        addNum("4");
    });

    $("#btn5").on("click", function () {
        addNum("5");
    });

    $("#btn6").on("click", function () {
        addNum("6");
    });

    $("#btn7").on("click", function () {
        addNum("7");
    });

    $("#btn8").on("click", function () {
        addNum("8");
    });

    $("#btn9").on("click", function () {
        addNum("9");
    });

    $("#btn0").on("click", function () {
        addNum("0");
    });

    $("#btnDot").on("click", function () {
        addNum(".");
    });

    $("#txtNum").on("click",
        function () {
            clear();
        }
    );

    $("#btnMas").on("click",
        function () {
            chgOper("+");
        }
    );

    $("#btnMenos").on("click",
        function () {
            chgOper("-");
        }
    );

    $("#btnMult").on("click",
        function () {
            chgOper("*");
        }
    );

    $("#btnDiv").on("click",
        function () {
            chgOper("/");
        }
    );

    $("#btnXeY").on("click",
        function () {
            chgOper("X^Y");
        }
    );

    $("#btnToM").on("click",
        function () {
            toM();
        }
    );

    $("#btnFromM").on("click",
        function () {
            fromM();
        }
    );


    $("#btnCuad").on("click",
        function () {
            var num = $("#txtNum");
            num.val(+num.val() * +num.val());
            oper = undefined;
        }
    );

    $("#btn2eN").on("click",
        function () {
            chgOper("X^Y");
            $("#txtNum").val("2");
            calcular();
        }
    );

    $("#btnInvX").on("click",
        function () {
            var num = $("#txtNum");
            num.val(1 / num.val());
            oper = undefined;
        }
    );

    $("#btnSqrt").on("click",
        function () {
            var num = $("#txtNum");
            num.val(Math.sqrt(num.val()));
            oper = undefined;
        }
    );

    $("#btnPEnt").on("click",
        function () {
            var num = $("#txtNum");
            num.val(entero(+num.val()));
            oper = undefined;
        }
    );

    $("#btnNFact").on("click",
        function () {
            var i = 0,
                num = $("#txtNum"),
                x = entero(+num.val());

            for (i = x - 1; i > 1; i -= 1) {
                x = (x * i);
            }
            num.val(x);
            oper = undefined;
        }
    );


    $("#btnCsvE").on("click",
        function () {
            var i = 0,
                x = 0,
                num = $("#txtNum"),
                a = num.val().replace(/([;])/g, ',').split(',');

            for (i = 0; i < a.length; i += 1) {
                x += (+a[i]);
            }
            num.val(x);
            oper = undefined;
        }
    );

    $("#btnCsvProd").on("click",
        function () {
            var i = 0,
                x = 1,
                num = $("#txtNum"),
                a = num.val().replace(/([;])/g, ',').split(',');

            for (i = 0; i < a.length; i += 1) {
                x = x * (+a[i]);
            }
            num.val(x);
            oper = undefined;
        }
    );

    $("#btnCls").on("click",
        function () {
            clear();
            oper = undefined;
        }
    );

    $("#btnTot").on("click",
        function () {
            calcular();
        }
    );

});