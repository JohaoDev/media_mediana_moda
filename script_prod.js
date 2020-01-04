let estadistica = () => {
    var temp = parseFloat(prompt("Cuantos dígitos desea calcular?"));
    var arreglo = [];

    //CALCULO DE MEDIA O PROMEDIO
    var suma = 0;

    for(let i = 0; i < temp; i++){
        arreglo[i] = Number(prompt("Ingrese un número"));
        suma = suma + arreglo[i];
    }

    //CALCULO DE MEDIANA
    var v_sort = arreglo.sort((num1, num2) => num1 - num2);
    var sumaMediana = 0

    if(v_sort.length % 2 == 0){
        temp1 = v_sort.slice((v_sort.length / 2) - 1, (v_sort.length / 2) + 1)
        temp2 = temp1.map(function (params) {
            return params / 2
        })
        temp3 = temp2.forEach(function (params) {
            sumaMediana += params
        })
    }else{
        temp1 = v_sort.slice((v_sort.length / 2), (v_sort.length / 2) + 1)
        temp2 = temp1.forEach(function (params) {
            sumaMediana = params
        })
    }

    //CALCULO DE MODA
    var buscarMayor = (counter) => Math.max.apply(null, counter)
    var ordenarAsc = (a, b) => a - b
    var corencias = (name) => {
        return {count: 1, name: name}
    }
    var contar_coerencia = (a, b) => {
        a[b.name] = (a[b.name] || 0) + b.count
        return a
    }
    var mapearParaArray = (calculo) => {
    var counter = []

    Object.keys(calculo).filter((a) => {
        counter.push(calculo[a])
    })
        return counter
    }

    var filtrarModa = (calculo, MAX) => Object.keys(calculo).filter((a) => {
        return (calculo[a] === MAX && calculo[a] > 1) ? calculo[a] : null
    })
    
    function moda(arr) {
        var calculo = arr.sort(ordenarAsc).map(corencias).reduce(contar_coerencia, {}) 
        var filtrada = filtrarModa(calculo, buscarMayor(mapearParaArray(calculo)))
        return filtrada.length ? filtrada : 0
    }

    //CALCULO DE FRECUENCIA ABSOLUTA
    var frecuenciaAbsoluta = {}

    for(let i = 0; i < arreglo.length; i++) {
        var num = arreglo[i]
        if(frecuenciaAbsoluta[num]){
            frecuenciaAbsoluta[num]++
        } else {
            frecuenciaAbsoluta[num] = 1
        }
    }

    //RESULTADOS
    document.getElementById('respuestaMedia').innerHTML = "Media = " + suma / temp;
    document.getElementById('respuestaMediana').innerHTML = "Mediana = " + sumaMediana;
    document.getElementById('respuestaModa').innerHTML = "Moda = " + moda(arreglo)
    // document.getElementById('respuestaFrecuenciaAbsoluta').innerHTML = "Frecuencia Absoluta = " + JSON.stringify(frecuenciaAbsoluta)

    document.getElementById('array').innerHTML = "Datos ingresados: " + arreglo.sort((num1, num2) => num1 - num2);

    
    //GRAFICA
    let miCanvas = document.getElementById('chart').getContext('2d')

    var chart = new Chart(miCanvas, {
        type: "line",
        data: {
            labels: Object.keys(frecuenciaAbsoluta),
            datasets: [
                {
                    label: "Frecuencia Absoluta",
                    data: Object.values(frecuenciaAbsoluta),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })
}