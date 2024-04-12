const opciones = { year: 'numeric', month: 'short', day: 'numeric' };

export function formatDate(date){
    return new Date(date).toLocaleDateString('es-es', opciones);
}