//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

var bolFiltro = false;

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
      bolFiltro = false;
    } else {
      this.customSearch = false
      bolFiltro = true;
    }
    $('#personalizada').toggleClass('invisible')
  })
}

setSearch();

buscadorPropiedades = function () {
  var me = this;

  me.Funciones = {
    InicializarEventos: function () {
       $("#buscar").unbind().click(function () { me.Eventos.ValidarFiltro() });
    },
    removeDuplicates: function (originalArray, prop) {
      var newArray = [];
      var lookupObject  = {};

      for(var i in originalArray) {
          lookupObject[originalArray[i][prop]] = originalArray[i];
      }

      for(i in lookupObject) {
          newArray.push(lookupObject[i]);
      }
       console.log('removeDuplicates',newArray);
      return newArray;
    },
    searchObject: function(nameKey, myArray, prop){
      var newArray = [];
      for (var i=0; i < myArray.length; i++) {
          if (myArray[i][prop] === nameKey) {
              newArray.push(myArray[i]);
          }
      }
      console.log('searchObject',newArray);
      return newArray;
    },
    filterRange: function(from, to , myArray){
      var newArray = [];
      for (var i=0; i < myArray.length; i++) {
          var precio = myArray[i]["Precio"].replace("$","").replace(",","");
          if (precio >=from && precio <=to ) {
              newArray.push(myArray[i]);
          }
      }
      console.log('searchObject',newArray);
      return newArray;
    },
    CargarCombos:function(){
        $.ajax({
          type: 'GET',
          url: "http://localhost:3000/api/getall",
          dataType: 'json',
          data: {},
          contentType: 'application/json; charset=utf-8',
          async: false,
          success: function (response) {
            console.log(response)
            var aCiudad = me.Funciones.removeDuplicates(response, "Ciudad");
            var aTipo = me.Funciones.removeDuplicates(response, "Tipo");
            
            $("#ciudad").empty();
            $("#tipo").empty();
            $("#ciudad").append('<option value="" selected>Escoge una ciudad</option>');
            $("#tipo").append('<option value="" selected>Escoge un tipo</option>');
            for (i = 0; i < aCiudad.length; i++) {
               $("#ciudad").append("<option value='" + aCiudad[i]["Ciudad"] + "'>" + aCiudad[i]["Ciudad"] + "</option>");
            } 
            for (j = 0; j < aTipo.length; j++) {
                $("#tipo").append("<option value='" + aTipo[j]["Tipo"] + "'>" + aTipo[j]["Tipo"] + "</option>");
            } 
           
          }
       });
    },
    FiltrarPropiedades: function(ciudad,tipo,from,to){
       $.ajax({
          type: 'GET',
          url: "http://localhost:3000/api/getall",
          dataType: 'json',
          data: {},
          contentType: 'application/json; charset=utf-8',
          async: false,
          success: function (response) {
              console.log(response)
            templateHtml = `        <div class="card horizontal">
          <div class="card-image">
            <img src="../img/home.jpg">
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <div>
                <b>Direccion: </b><p>:direccion</p>
              </div>
              <div>
                <b>Ciudad: </b><p>:ciudad</p>
              </div>
              <div>
                <b>Telefono: </b><p>:telefono</p>
              </div>
              <div>
                <b>Código postal: </b><p>:postal</p>
              </div>
              <div>
                <b>Precio: </b><p>:precio</p>
              </div>
              <div>
                <b>Tipo: </b><p>:tipo</p>
              </div>
            </div>
            <div class="card-action right-align">
              <a href="#">Ver más</a>
            </div>
          </div>
        </div>`;
            console.log('bolFiltro:',bolFiltro);
            html = '';
            if(bolFiltro){
                response = me.Funciones.filterRange(from,to,response);
              if(tipo!=''){
                response = me.Funciones.searchObject(tipo,response,'Tipo');
              }
              if(ciudad!=''){
                console.clear();
                console.log('ciudad:',ciudad,' response:', response);
                response = me.Funciones.searchObject(ciudad,response,'Ciudad');
              }
            }
            response.forEach(element => {
              //  console.log('elemnt:',element)
                html = html + templateHtml.replace(':direccion',element.Direccion)
                                          .replace(':ciudad',element.Ciudad)
                                          .replace(':telefono',element.Telefono)
                                          .replace(':postal',element.Codigo_Postal)
                                          .replace(':precio',element.Precio)
                                          .replace(':tipo',element.Tipo);
            });
            $("body > div.row > div.col.m8.lista").html(html);
          }
       });
    },
  };

  me.Eventos = {
    ValidarFiltro: function () {
      var ciudad = $("#ciudad").val();
      var tipo = $("#tipo").val();
      var slider = $("#rangoPrecio").data("ionRangeSlider");
      var from = slider.result.from;
      var to = slider.result.to;
      console.log('from: ', from, ' to:' , to);
      me.Funciones.FiltrarPropiedades(ciudad,tipo,from,to);
    }
  };

  me.Inicializar = function () {
    me.Funciones.CargarCombos();
    me.Funciones.InicializarEventos();
  };
};

$(document).ready(function () {
  var buscador = new buscadorPropiedades();
  buscador.Inicializar();
});
