const configuracion = {
  usuarios: {
    url:'https://jsonplaceholder.typicode.com/users',
    columnas: [
      {data: 'id', title: 'ID'},
      {data: 'name', title: 'Nombre'},
      {data: 'username', title: 'Usuario'},
      {data: 'email', title: 'Email'},
      {data: 'phone', title: 'Telefono'},
      {data: 'website', title: 'Sitio Web'}
    ]
  },
  publicaciones: {
    url:'https://jsonplaceholder.typicode.com/posts',
    columnas: [
      {data: 'userId', title: 'ID Usuario'},
      {data: 'id', title: 'ID Publicacion'},
      {data: 'title', title: 'Titulo'},
      {data: 'body', title: 'Contenido'}
    ]
  },
  comentarios:{
    url:'https://jsonplaceholder.typicode.com/comments',
    columnas: [
      {data: 'postId', title: 'ID Publicacion'},
      {data: 'id', title: 'ID Comentario'},
      {data: 'name', title: 'Nombre'},
      {data: 'email', title: 'Email'},
      {data: 'body',  title: 'Contenido'}
    ]
  },
  albums:{
    url:'https://jsonplaceholder.typicode.com/albums',
    columnas: [
      {data: 'userId', title: 'ID Usuario'},
      {data: 'id', title: 'ID Album'},
      {data: 'title', title: 'Titulo'}
    ]
  },
  todos:{
    url:'https://jsonplaceholder.typicode.com/todos',
    columnas: [
      {data: 'userId', title: 'ID Usuario'},
      {data: 'id', title: 'ID Tarea'},
      {data: 'title', title: 'Titulo'},
      {data: 'completed', title: 'Completado'}
    ]
  }
}

let tipoSeleccionado = 'usuarios';

function seleccionarTipo(tipo){
   tipoSeleccionado = tipo;
   console.log("Tipo seleccionado:", tipoSeleccionado);
  
    cargarTabla(tipoSeleccionado);  
  
}

function cargarTabla(tipo) {
  const config = configuracion[tipo];

  if (!config) {
    console.error("Tipo no válido:", tipo);
    return;
  }
  if ($.fn.DataTable.isDataTable('#example')) {
    console.log("Destruyendo tabla existente...");
    $('#example').DataTable().destroy();
  }


  console.log("Limpiando tabla...");
  $('#example').empty(); 
  
  $('#example').html(`
    <thead></thead>
    <tfoot></tfoot>
  `);
  
  let headerHTML = '<tr>';
  let footerHTML = '<tr>';
  
  config.columnas.forEach(function(col) {
    headerHTML += '<th>' + col.data + '</th>';
    footerHTML += '<th>' + col.data + '</th>';
  });
  
  headerHTML += '</tr>';
  footerHTML += '</tr>';

  console.log("Headers creados:", headerHTML);
  
  $('#example thead').html(headerHTML);
  $('#example tfoot').html(footerHTML);

  $('#example').DataTable({
    ajax: {
      url: config.url,
      dataSrc: ''
    },
    columns: config.columnas,
    language: {
        decimal: "",
        emptyTable: "No hay información",
        info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
        infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
        infoFiltered: "(Filtrado de _MAX_ total entradas)",
        thousands: ",",
        lengthMenu: "Mostrar _MENU_ Entradas",
        loadingRecords: "Cargando...",
        processing: "Procesando...",
        search: "Buscar:",
        zeroRecords: "Sin resultados encontrados",
        paginate: {
            first: "Primero",
            last: "Ultimo",
            next: "Siguiente",
            previous: "Anterior"
          }
    }
  });
}

function cargarDatos(){
  cargarTabla(tipoSeleccionado);
}

$(document).ready(function() {
    cargarTabla('usuarios');  
});


