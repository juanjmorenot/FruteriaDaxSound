import { DAXFormula, DAXCategory, QuizQuestion } from './types';

export const CATEGORY_THEME: Record<DAXCategory, { color: string; bgColor: string; icon: string }> = {
    [DAXCategory.Aggregation]: { color: 'text-red-500', bgColor: 'bg-red-100', icon: '🍓' },
    [DAXCategory.Filter]: { color: 'text-orange-500', bgColor: 'bg-orange-100', icon: '🍊' },
    [DAXCategory.TimeIntelligence]: { color: 'text-sky-500', bgColor: 'bg-sky-100', icon: '🫐' },
    [DAXCategory.Logical]: { color: 'text-lime-600', bgColor: 'bg-lime-100', icon: '🍏' },
    [DAXCategory.Information]: { color: 'text-violet-500', bgColor: 'bg-violet-100', icon: '🍇' },
    [DAXCategory.Relationship]: { color: 'text-pink-500', bgColor: 'bg-pink-100', icon: '🍒' },
    [DAXCategory.Text]: { color: 'text-yellow-500', bgColor: 'bg-yellow-100', icon: '🍋' },
    [DAXCategory.Ranking]: { color: 'text-teal-500', bgColor: 'bg-teal-100', icon: '🎗️' },
};

export const DAX_FORMULAS: DAXFormula[] = [
    // Funciones de Agregación y Conteo
    { name: 'SUM', category: DAXCategory.Aggregation, usage: 'Suma todos los números en una columna.', syntax: 'SUM(<columna>)', example: 'Total Ventas = SUM(Ventas[Importe])' },
    { name: 'AVERAGE', category: DAXCategory.Aggregation, usage: 'Calcula el promedio de todos los números en una columna.', syntax: 'AVERAGE(<columna>)', example: 'Venta Media = AVERAGE(Ventas[Importe])' },
    { name: 'MIN', category: DAXCategory.Aggregation, usage: 'Devuelve el valor mínimo en una columna.', syntax: 'MIN(<columna>)', example: 'Venta Mínima = MIN(Ventas[Importe])' },
    { name: 'MAX', category: DAXCategory.Aggregation, usage: 'Devuelve el valor máximo en una columna.', syntax: 'MAX(<columna>)', example: 'Venta Máxima = MAX(Ventas[Importe])' },
    { name: 'SUMX', category: DAXCategory.Aggregation, usage: 'Devuelve la suma de una expresión evaluada para cada fila de una tabla.', syntax: 'SUMX(<table>, <expresión>)', example: 'Ingresos Totales = SUMX(Ventas, Ventas[Cantidad] * Ventas[PrecioUnitario])' },
    { name: 'AVERAGEX', category: DAXCategory.Aggregation, usage: 'Calcula el promedio de un conjunto de expresiones evaluadas sobre una tabla.', syntax: 'AVERAGEX(<table>, <expresión>)', example: 'Precio Promedio por Transacción = AVERAGEX(Ventas, Ventas[Importe])' },
    { name: 'MINX', category: DAXCategory.Aggregation, usage: 'Devuelve el valor mínimo de una expresión evaluada para cada fila de una tabla.', syntax: 'MINX(<table>, <expresión>)', example: 'Menor Venta con Descuento = MINX(FILTER(Ventas, Ventas[Descuento] > 0), Ventas[Importe])' },
    { name: 'MAXX', category: DAXCategory.Aggregation, usage: 'Devuelve el valor máximo de una expresión evaluada para cada fila de una tabla.', syntax: 'MAXX(<table>, <expresión>)', example: 'Mayor Venta de Manzanas = MAXX(FILTER(Ventas, Ventas[Producto] = "Manzana"), Ventas[Importe])' },
    { name: 'COUNT', category: DAXCategory.Aggregation, usage: 'Cuenta el número de celdas en una columna que contienen números.', syntax: 'COUNT(<columna>)', example: 'Transacciones con Descuento Numérico = COUNT(Ventas[Descuento])' },
    { name: 'COUNTA', category: DAXCategory.Aggregation, usage: 'Cuenta el número de celdas no vacías en una columna.', syntax: 'COUNTA(<columna>)', example: 'Número de Clientes con Nombre = COUNTA(Clientes[Nombre])' },
    { name: 'COUNTROWS', category: DAXCategory.Aggregation, usage: 'Cuenta el número de filas en una tabla.', syntax: 'COUNTROWS(<table>)', example: 'Total Transacciones = COUNTROWS(Ventas)' },
    { name: 'COUNTBLANK', category: DAXCategory.Aggregation, usage: 'Cuenta el número de celdas en blanco en una columna.', syntax: 'COUNTBLANK(<columna>)', example: 'Clientes sin Teléfono = COUNTBLANK(Clientes[Telefono])' },
    { name: 'DISTINCTCOUNT', category: DAXCategory.Aggregation, usage: 'Cuenta el número de valores distintos en una columna.', syntax: 'DISTINCTCOUNT(<columna>)', example: 'Clientes Únicos = DISTINCTCOUNT(Ventas[ID_Cliente])' },

    // Funciones de Filtro y Contexto
    { name: 'CALCULATE', category: DAXCategory.Filter, usage: 'Evalúa una expresión en un contexto de filtro modificado.', syntax: 'CALCULATE(<expresión>[, <filtro1>, <filtro2>...])', example: 'Ventas de Manzanas Rojas = CALCULATE(SUM(Ventas[Importe]), Productos[Fruta] = "Manzana", Productos[Color] = "Roja")' },
    { name: 'FILTER', category: DAXCategory.Filter, usage: 'Devuelve una tabla que representa un subconjunto de otra tabla o expresión.', syntax: 'FILTER(<table>, <condición_filtro>)', example: 'Ventas Grandes = FILTER(Ventas, Ventas[Importe] > 100)' },
    { name: 'ALL', category: DAXCategory.Filter, usage: 'Devuelve todas las filas de una tabla o todos los valores de una columna, ignorando cualquier filtro que se haya aplicado.', syntax: 'ALL(<table> | <columna>)', example: '% Ventas Totales = DIVIDE(SUM(Ventas[Importe]), CALCULATE(SUM(Ventas[Importe]), ALL(Ventas)))' },
    { name: 'ALLEXCEPT', category: DAXCategory.Filter, usage: 'Quita todos los filtros de contexto en la tabla excepto los filtros que se han aplicado a las columnas especificadas.', syntax: 'ALLEXCEPT(<table>, <columna1>, <columna2>...)', example: 'Ventas Totales del Año del Producto = CALCULATE(SUM(Ventas[Importe]), ALLEXCEPT(Productos, Productos[Año]))' },
    { name: 'ALLSELECTED', category: DAXCategory.Filter, usage: 'Quita los filtros de contexto de las columnas y filas de la consulta actual, conservando todos los demás filtros de contexto o filtros explícitos.', syntax: 'ALLSELECTED([<nombre_tabla> | <nombre_columna>])', example: 'Porcentaje sobre Venta Visible = DIVIDE(SUM(Ventas[Importe]), CALCULATE(SUM(Ventas[Importe]), ALLSELECTED()))' },
    { name: 'VALUES', category: DAXCategory.Filter, usage: 'Devuelve una tabla de una sola columna que contiene los valores distintos de la columna especificada.', syntax: 'VALUES(<columna>)', example: 'Lista de Frutas Vendidas = VALUES(Productos[Fruta])' },
    { name: 'DISTINCT', category: DAXCategory.Filter, usage: 'Devuelve una tabla de una columna que contiene los valores distintos de la columna especificada.', syntax: 'DISTINCT(<columna>)', example: 'Total de Frutas Diferentes = COUNTROWS(DISTINCT(Productos[Fruta]))' },
    
    // Funciones de Inteligencia de Tiempo
    { name: 'DATE', category: DAXCategory.TimeIntelligence, usage: 'Devuelve la fecha especificada en formato de fecha y hora.', syntax: 'DATE(<año>, <mes>, <día>)', example: 'Inicio del Año Fiscal = DATE(2024, 1, 1)' },
    { name: 'YEAR', category: DAXCategory.TimeIntelligence, usage: 'Devuelve el año de una fecha como un número entero.', syntax: 'YEAR(<fecha>)', example: 'Año de Venta = YEAR(Ventas[Fecha])' },
    { name: 'MONTH', category: DAXCategory.TimeIntelligence, usage: 'Devuelve el mes como un número del 1 (enero) al 12 (diciembre).', syntax: 'MONTH(<fecha>)', example: 'Mes de Venta = MONTH(Ventas[Fecha])' },
    { name: 'DAY', category: DAXCategory.TimeIntelligence, usage: 'Devuelve el día del mes, un número del 1 al 31.', syntax: 'DAY(<fecha>)', example: 'Día de Venta = DAY(Ventas[Fecha])' },
    { name: 'EOMONTH', category: DAXCategory.TimeIntelligence, usage: 'Devuelve la fecha del último día del mes, antes o después de un número especificado de meses.', syntax: 'EOMONTH(<fecha_inicio>, <meses>)', example: 'Fin de Mes de Venta = EOMONTH(Ventas[Fecha], 0)' },
    { name: 'DATESYTD', category: DAXCategory.TimeIntelligence, usage: 'Devuelve una tabla que contiene una columna de fechas para el año hasta la fecha.', syntax: 'DATESYTD(<fechas>[, <fin_de_año>])', example: 'Ventas YTD = CALCULATE(SUM(Ventas[Importe]), DATESYTD(Calendario[Fecha]))' },
    { name: 'DATEADD', category: DAXCategory.TimeIntelligence, usage: 'Devuelve una tabla que contiene una columna de fechas, desplazada hacia delante o hacia atrás en el tiempo.', syntax: 'DATEADD(<fechas>, <número_de_intervalos>, <intervalo>)', example: 'Ventas Mismo Día Mes Anterior = CALCULATE(SUM(Ventas[Importe]), DATEADD(Calendario[Fecha], -1, MONTH))' },
    { name: 'DATEDIFF', category: DAXCategory.TimeIntelligence, usage: 'Devuelve el número de unidades de tiempo entre dos fechas.', syntax: 'DATEDIFF(<fecha1>, <fecha2>, <intervalo>)', example: 'Días desde la Última Compra = DATEDIFF(MAX(Ventas[Fecha]), TODAY(), DAY)' },
    { name: 'SAMEPERIODLASTYEAR', category: DAXCategory.TimeIntelligence, usage: 'Devuelve un conjunto de fechas del año anterior que son equivalentes a las fechas en la columna especificada.', syntax: 'SAMEPERIODLASTYEAR(<fechas>)', example: 'Ventas Mismo Período Año Anterior = CALCULATE(SUM(Ventas[Importe]), SAMEPERIODLASTYEAR(Calendario[Fecha]))' },
    { name: 'CALENDAR', category: DAXCategory.TimeIntelligence, usage: 'Devuelve una tabla con una sola columna denominada "Date" que contiene un conjunto contiguo de fechas.', syntax: 'CALENDAR(<fecha_inicio>, <fecha_fin>)', example: 'Tabla de Calendario 2024 = CALENDAR(DATE(2024,1,1), DATE(2024,12,31))' },
    { name: 'CALENDARAUTO', category: DAXCategory.TimeIntelligence, usage: 'Devuelve una tabla con una columna "Date" que contiene un conjunto de fechas calculado automáticamente a partir del modelo.', syntax: 'CALENDARAUTO([<año_fiscal_fin_mes>])', example: 'Tabla de Calendario Automática = CALENDARAUTO()' },
    
    // Funciones Lógicas
    { name: 'IF', category: DAXCategory.Logical, usage: 'Comprueba si se cumple una condición y devuelve un valor si es TRUE, y otro si es FALSE.', syntax: 'IF(<condición>, <valor_si_true>, <valor_si_false>)', example: 'Categoría Venta = IF(Ventas[Importe] > 50, "Grande", "Pequeña")' },
    { name: 'IFERROR', category: DAXCategory.Logical, usage: 'Evalúa una expresión y devuelve un valor especificado si la expresión devuelve un error; de lo contrario, devuelve el valor de la expresión.', syntax: 'IFERROR(<valor>, <valor_si_error>)', example: 'Ratio Ventas = IFERROR(DIVIDE([Ventas Actuales], [Ventas Anteriores]), 0)' },
    { name: 'SWITCH', category: DAXCategory.Logical, usage: 'Evalúa una expresión contra una lista de valores y devuelve una de varias expresiones de resultado posibles.', syntax: 'SWITCH(<expresión>, <valor1>, <resultado1>, [<valor2>, <resultado2>...], <else>)', example: 'Estación = SWITCH(MONTH(Ventas[Fecha]), 12, "Invierno", 1, "Invierno", 2, "Invierno", 3, "Primavera", "Otra")' },
    { name: 'AND', category: DAXCategory.Logical, usage: 'Comprueba si ambos argumentos son TRUE y devuelve TRUE si lo son. De lo contrario, devuelve FALSE.', syntax: 'AND(<lógico1>, <lógico2>)', example: 'Bono Especial = IF(AND(Ventas[Importe] > 100, Ventas[Cliente_Frecuente] = TRUE), "Sí", "No")' },
    { name: 'OR', category: DAXCategory.Logical, usage: 'Comprueba si uno de los argumentos es TRUE y devuelve TRUE. Devuelve FALSE si ambos son FALSE.', syntax: 'OR(<lógico1>, <lógico2>)', example: 'Promoción Fin de Semana = IF(OR(WEEKDAY(Ventas[Fecha]) = 7, WEEKDAY(Ventas[Fecha]) = 1), "Sí", "No")' },
    { name: 'NOT', category: DAXCategory.Logical, usage: 'Cambia FALSE a TRUE, o TRUE a FALSE.', syntax: 'NOT(<lógico>)', example: 'Cliente No Registrado = IF(NOT(ISBLANK(Clientes[Email])), "No", "Sí")' },
    
    // Funciones de Información
    { name: 'ISBLANK', category: DAXCategory.Information, usage: 'Comprueba si un valor está en blanco y devuelve TRUE o FALSE.', syntax: 'ISBLANK(<valor>)', example: 'Ventas sin Vendedor = COUNTROWS(FILTER(Ventas, ISBLANK(Ventas[ID_Vendedor])))' },
    { name: 'ISERROR', category: DAXCategory.Information, usage: 'Comprueba si un valor es un error y devuelve TRUE o FALSE.', syntax: 'ISERROR(<valor>)', example: 'Contar Errores de Cálculo = COUNTROWS(FILTER(TablaCalculos, ISERROR(TablaCalculos[Ratio])))' },
    { name: 'ISNUMBER', category: DAXCategory.Information, usage: 'Comprueba si un valor es un número y devuelve TRUE o FALSE.', syntax: 'ISNUMBER(<valor>)', example: 'Filtrar IDs Numéricos = COUNTROWS(FILTER(Productos, ISNUMBER(Productos[SKU])))' },
    { name: 'ISTEXT', category: DAXCategory.Information, usage: 'Comprueba si un valor es texto y devuelve TRUE o FALSE.', syntax: 'ISTEXT(<valor>)', example: 'Filtrar Nombres de Producto = COUNTROWS(FILTER(Productos, ISTEXT(Productos[Nombre])))' },
    { name: 'HASONEVALUE', category: DAXCategory.Information, usage: 'Devuelve TRUE cuando el contexto para columnName se ha filtrado a un solo valor distinto.', syntax: 'HASONEVALUE(<nombreColumna>)', example: 'Título Dinámico = IF(HASONEVALUE(Productos[Fruta]), "Ventas de " & VALUES(Productos[Fruta]), "Ventas Totales")' },
    
    // Funciones de Relación
    { name: 'RELATED', category: DAXCategory.Relationship, usage: 'Devuelve un valor relacionado de otra tabla.', syntax: 'RELATED(<columna>)', example: 'Nombre de Fruta = RELATED(Productos[Nombre])' },
    { name: 'RELATEDTABLE', category: DAXCategory.Relationship, usage: 'Evalúa una expresión de tabla en un contexto modificado por los filtros existentes.', syntax: 'RELATEDTABLE(<table>)', example: 'Número de Ventas por Producto = COUNTROWS(RELATEDTABLE(Ventas))' },
    { name: 'USERELATIONSHIP', category: DAXCategory.Relationship, usage: 'Especifica la relación que se usará en un cálculo específico.', syntax: 'USERELATIONSHIP(<columna1>, <columna2>)', example: 'Ventas por Fecha de Envío = CALCULATE(SUM(Ventas[Importe]), USERELATIONSHIP(Ventas[FechaEnvio], Calendario[Fecha]))' },
    
    // Funciones de Texto
    { name: 'CONCATENATE', category: DAXCategory.Text, usage: 'Une dos cadenas de texto en una.', syntax: 'CONCATENATE(<texto1>, <texto2>)', example: 'Cliente Completo = CONCATENATE(Clientes[Nombre], " ") & Clientes[Apellido]' },
    { name: 'LEFT', category: DAXCategory.Text, usage: 'Devuelve el número especificado de caracteres desde el principio de una cadena de texto.', syntax: 'LEFT(<texto>, <núm_caracteres>)', example: 'Prefijo Producto = LEFT(Productos[SKU], 3)' },
    { name: 'RIGHT', category: DAXCategory.Text, usage: 'Devuelve el número especificado de caracteres desde el final de una cadena de texto.', syntax: 'RIGHT(<texto>, <núm_caracteres>)', example: 'Año de Lote = RIGHT(Productos[Lote], 4)' },
    { name: 'MID', category: DAXCategory.Text, usage: 'Devuelve una cadena de caracteres desde la mitad de una cadena de texto, dadas una posición inicial y una longitud.', syntax: 'MID(<texto>, <pos_inicial>, <núm_caracteres>)', example: 'Código de Región = MID(Clientes[ID_Cliente], 4, 2)' },
    { name: 'LEN', category: DAXCategory.Text, usage: 'Devuelve el número de caracteres en una cadena de texto.', syntax: 'LEN(<texto>)', example: 'Longitud del Nombre = LEN(Productos[Nombre])' },
    { name: 'UPPER', category: DAXCategory.Text, usage: 'Convierte una cadena de texto a mayúsculas.', syntax: 'UPPER(<texto>)', example: 'Nombre en Mayúsculas = UPPER(Clientes[Nombre])' },
    { name: 'LOWER', category: DAXCategory.Text, usage: 'Convierte una cadena de texto a minúsculas.', syntax: 'LOWER(<texto>)', example: 'Email en Minúsculas = LOWER(Clientes[Email])' },
    { name: 'FORMAT', category: DAXCategory.Text, usage: 'Convierte un valor a texto en el formato de número especificado.', syntax: 'FORMAT(<valor>, <formato>)', example: 'Ventas Formateadas = FORMAT(SUM(Ventas[Importe]), "€#,##0.00")' },
    
    // Funciones de Ranking y Estadísticas
    { name: 'RANKX', category: DAXCategory.Ranking, usage: 'Devuelve la clasificación de un número en una lista de números para cada fila de la tabla de argumentos.', syntax: 'RANKX(<table>, <expresión>[, <valor>[, <orden>[, <empates>]]])', example: 'Ranking de Ventas de Frutas = RANKX(ALL(Productos[Fruta]), CALCULATE(SUM(Ventas[Importe])))' },
    { name: 'DIVIDE', category: DAXCategory.Ranking, usage: 'Realiza la división y devuelve un resultado alternativo o BLANK() en caso de división por cero.', syntax: 'DIVIDE(<numerador>, <denominador>[, <resultado_alternativo>])', example: 'Precio Medio por Unidad = DIVIDE(SUM(Ventas[Importe]), SUM(Ventas[Cantidad]), 0)' },
];


export const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        scenario: "El dueño de la frutería quiere saber las ventas totales de Naranjas en el mes de Julio. ¿Qué fórmula es la más adecuada?",
        options: ["SUM(Ventas[Importe])", "CALCULATE(SUM(Ventas[Importe]), Productos[Fruta] = \"Naranja\", MONTH(Ventas[Fecha]) = 7)", "FILTER(Ventas, Productos[Fruta] = \"Naranja\")", "AVERAGE(Ventas[Importe])"],
        correctAnswer: "CALCULATE(SUM(Ventas[Importe]), Productos[Fruta] = \"Naranja\", MONTH(Ventas[Fecha]) = 7)",
        explanation: "CALCULATE es perfecta para sumar un valor (ventas) aplicando múltiples filtros (fruta y mes)."
    },
    {
        scenario: "Necesitamos mostrar un ranking de las frutas más vendidas. ¿Cuál es la función principal que usarías para esto?",
        options: ["RANKX", "ORDERBY", "SORT", "COUNTROWS"],
        correctAnswer: "RANKX",
        explanation: "RANKX está diseñada específicamente para crear clasificaciones basadas en una expresión, como el total de ventas."
    },
    {
        scenario: "¿Cuántos clientes únicos han comprado en la tienda este mes? Necesitas contar cada cliente solo una vez.",
        options: ["COUNT(Ventas[ID_Cliente])", "COUNTROWS(Ventas)", "DISTINCTCOUNT(Ventas[ID_Cliente])", "COUNTA(Clientes[Nombre])"],
        correctAnswer: "DISTINCTCOUNT(Ventas[ID_Cliente])",
        explanation: "DISTINCTCOUNT es la función ideal para contar el número de valores únicos en una columna, evitando duplicados."
    },
    {
        scenario: "Quieres comparar las ventas de este mes con las del mismo mes del año pasado. ¿Qué función de inteligencia de tiempo te ayuda a lograr esto directamente?",
        options: ["DATEADD", "PREVIOUSMONTH", "SAMEPERIODLASTYEAR", "DATESYTD"],
        correctAnswer: "SAMEPERIODLASTYEAR",
        explanation: "SAMEPERIODLASTYEAR está diseñada para devolver el conjunto de fechas equivalente del año anterior, facilitando la comparación directa."
    },
    {
        scenario: "Si el total de ventas de un producto es cero, al calcular el porcentaje sobre el total, obtienes un error de división por cero. ¿Cómo puedes evitarlo y mostrar 0 en su lugar?",
        options: ["IF(ISERROR(SUM(Ventas[Importe]) / 0), 0)", "DIVIDE(SUM(Ventas[Importe]), [Ventas Totales], 0)", "IFERROR(SUM(Ventas[Importe]) / [Ventas Totales])", "TRY...CATCH"],
        correctAnswer: "DIVIDE(SUM(Ventas[Importe]), [Ventas Totales], 0)",
        explanation: "La función DIVIDE está optimizada para manejar divisiones por cero de forma segura, permitiendo especificar un resultado alternativo."
    },
    {
        scenario: "El gerente quiere una lista de todas las frutas únicas que se han vendido, sin repeticiones. ¿Qué función usarías?",
        options: ["VALUES(Productos[Fruta])", "LIST(Productos[Fruta])", "ALL(Productos[Fruta])", "SUMMARIZE(Productos, Productos[Fruta])"],
        correctAnswer: "VALUES(Productos[Fruta])",
        explanation: "VALUES devuelve una tabla con una columna de valores únicos de la columna especificada, ideal para listas sin duplicados."
    },
    {
        scenario: "Necesitas crear una columna calculada que clasifique una venta como 'Venta Alta' si supera los 100€, o 'Venta Baja' si no. ¿Cuál es la fórmula correcta?",
        options: ["IF(Ventas[Importe] > 100, \"Venta Alta\", \"Venta Baja\")", "SWITCH(TRUE(), Ventas[Importe] > 100, \"Venta Alta\", \"Venta Baja\")", "IIF(Ventas[Importe] > 100, \"Venta Alta\", \"Venta Baja\")", "FILTER(Ventas, Ventas[Importe] > 100)"],
        correctAnswer: "IF(Ventas[Importe] > 100, \"Venta Alta\", \"Venta Baja\")",
        explanation: "La función IF es la estructura condicional estándar en DAX para evaluar una condición y devolver un resultado basado en si es verdadera o falsa."
    },
    {
        scenario: "Para calcular los ingresos totales, necesitas multiplicar la cantidad por el precio unitario para cada venta y luego sumar todos esos resultados. ¿Qué función iteradora es la ideal?",
        options: ["SUMX(Ventas, Ventas[Cantidad] * Ventas[PrecioUnitario])", "SUM(Ventas[Cantidad] * Ventas[PrecioUnitario])", "CALCULATE(SUM(Ventas[Cantidad]), SUM(Ventas[PrecioUnitario]))", "PRODUCT(Ventas[Cantidad], Ventas[PrecioUnitario])"],
        correctAnswer: "SUMX(Ventas, Ventas[Cantidad] * Ventas[PrecioUnitario])",
        explanation: "SUMX es una función iteradora que evalúa una expresión para cada fila de una tabla y luego suma los resultados, perfecta para este tipo de cálculo."
    },
    {
        scenario: "La frutería necesita saber el número total de transacciones de venta que se han registrado en la tabla 'Ventas'.",
        options: ["COUNTROWS(Ventas)", "COUNT(Ventas)", "SUM(Ventas[ID_Venta])", "COUNTA(Ventas[ID_Venta])"],
        correctAnswer: "COUNTROWS(Ventas)",
        explanation: "COUNTROWS es la función más directa y eficiente para contar el número total de filas en una tabla, que representa el número de transacciones."
    },
    {
        scenario: "En tu tabla de 'Ventas', tienes el ID del producto, pero necesitas mostrar el nombre de la fruta, que está en la tabla 'Productos'. Ambas tablas están relacionadas. ¿Qué función usas?",
        options: ["RELATED(Productos[Nombre])", "LOOKUPVALUE(Productos[Nombre], Productos[ID_Producto], Ventas[ID_Producto])", "VALUES(Productos[Nombre])", "CALCULATE(VALUES(Productos[Nombre]))"],
        correctAnswer: "RELATED(Productos[Nombre])",
        explanation: "RELATED se utiliza en una columna calculada para obtener un valor de una tabla relacionada en el lado 'uno' de una relación uno a varios."
    },
    {
        scenario: "¿Cómo calculas las ventas totales para todos los productos, ignorando cualquier filtro que el usuario haya aplicado en la segmentación de frutas?",
        options: ["CALCULATE(SUM(Ventas[Importe]), ALL(Productos))", "SUM(Ventas[Importe])", "CALCULATE(SUM(Ventas[Importe]), REMOVEFILTERS(Productos))", "TOTALYTD(SUM(Ventas[Importe]), Calendario[Fecha])"],
        correctAnswer: "CALCULATE(SUM(Ventas[Importe]), ALL(Productos))",
        explanation: "La función ALL elimina los filtros de la tabla especificada, permitiendo que el cálculo se realice sobre el conjunto de datos completo, independientemente de las selecciones."
    },
    {
        scenario: "El equipo de marketing quiere crear una promoción de fin de semana. ¿Cómo crearías una columna para identificar si una venta ocurrió en sábado o domingo?",
        options: ["IF(OR(WEEKDAY(Ventas[Fecha]) = 7, WEEKDAY(Ventas[Fecha]) = 1), \"Fin de Semana\", \"Día de Semana\")", "IF(Ventas[Fecha].DayOfWeek > 5, \"Fin de Semana\", \"Día de Semana\")", "SWITCH(DAYNAME(Ventas[Fecha]), \"Saturday\", \"Fin de Semana\", \"Sunday\", \"Fin de Semana\")", "FIN.DE.SEMANA(Ventas[Fecha])"],
        correctAnswer: "IF(OR(WEEKDAY(Ventas[Fecha]) = 7, WEEKDAY(Ventas[Fecha]) = 1), \"Fin de Semana\", \"Día de Semana\")",
        explanation: "WEEKDAY devuelve un número del 1 (domingo) al 7 (sábado). La función OR permite comprobar si es uno de estos dos días para clasificarlo como fin de semana."
    },
    {
        scenario: "Necesitas crear una tabla de calendario dinámica que se ajuste automáticamente para incluir todas las fechas presentes en tus datos de ventas.",
        options: ["CALENDARAUTO()", "CALENDAR(MIN(Ventas[Fecha]), MAX(Ventas[Fecha]))", "DATESBETWEEN(Calendario[Fecha], MIN(Ventas[Fecha]), MAX(Ventas[Fecha]))", "GENERATESERIES(MIN(Ventas[Fecha]), MAX(Ventas[Fecha]))"],
        correctAnswer: "CALENDARAUTO()",
        explanation: "CALENDARAUTO escanea todas las columnas de fecha del modelo y crea automáticamente una tabla de calendario que abarca el rango completo de años encontrados."
    },
    {
        scenario: "El gerente pide un informe de ventas acumuladas en lo que va del año (YTD - Year-to-Date). ¿Qué función de inteligencia de tiempo es la más adecuada?",
        options: ["CALCULATE(SUM(Ventas[Importe]), DATESYTD(Calendario[Fecha]))", "SUM(Ventas[Importe])", "YTD(Ventas[Importe])", "CALCULATE(SUM(Ventas[Importe]), YEAR(Ventas[Fecha]) = YEAR(TODAY()))"],
        correctAnswer: "CALCULATE(SUM(Ventas[Importe]), DATESYTD(Calendario[Fecha]))",
        explanation: "DATESYTD devuelve una tabla de fechas desde el inicio del año hasta la última fecha en el contexto de filtro actual, que se utiliza con CALCULATE para sumar las ventas."
    },
    {
        scenario: "Quieres crear una columna 'NombreCompleto' en la tabla 'Clientes' uniendo el nombre y el apellido, separados por un espacio.",
        options: ["Clientes[Nombre] & \" \" & Clientes[Apellido]", "CONCATENATE(Clientes[Nombre], Clientes[Apellido])", "COMBINEVALUES(\" \", Clientes[Nombre], Clentes[Apellido])", "ADD(Clientes[Nombre], \" \", Clientes[Apellido])"],
        correctAnswer: "Clientes[Nombre] & \" \" & Clientes[Apellido]",
        explanation: "El operador ampersand (&) es la forma más concisa y común de concatenar cadenas de texto en DAX."
    },
    {
        scenario: "Se necesita conocer el importe medio de venta únicamente para las transacciones que vendieron más de 10 unidades de cualquier fruta.",
        options: [
            "AVERAGEX(FILTER(Ventas, Ventas[Cantidad] > 10), Ventas[Importe])", 
            "CALCULATE(AVERAGE(Ventas[Importe]), Ventas[Cantidad] > 10)", 
            "AVERAGE(Ventas[Importe])",
            "SUMX(FILTER(Ventas, Ventas[Cantidad] > 10), Ventas[Importe])"
        ],
        correctAnswer: "AVERAGEX(FILTER(Ventas, Ventas[Cantidad] > 10), Ventas[Importe])",
        explanation: "AVERAGEX es ideal aquí. Primero, FILTER crea una tabla virtual con solo las ventas de más de 10 unidades, y luego AVERAGEX calcula el promedio del importe para cada una de esas filas."
    },
    {
        scenario: "Los nombres de los clientes se ingresaron en diferentes formatos. Para estandarizarlos, necesitas convertir todos los nombres de la tabla 'Clientes' a mayúsculas.",
        options: [
            "UPPER(Clientes[Nombre])",
            "FORMAT(Clientes[Nombre], \"UPPER\")",
            "CONVERT(Clientes[Nombre], \"UPPERCASE\")",
            "TEXT.UPPER(Clientes[Nombre])"
        ],
        correctAnswer: "UPPER(Clientes[Nombre])",
        explanation: "UPPER es la función estándar de DAX para convertir una cadena de texto a mayúsculas."
    },
    {
        scenario: "Tienes un filtro de tipo de fruta. Quieres calcular el porcentaje de ventas de cada fruta con respecto al total de ventas de *solo las frutas seleccionadas en el filtro*.",
        options: [
            "DIVIDE(SUM(Ventas[Importe]), CALCULATE(SUM(Ventas[Importe]), ALLSELECTED(Productos[Fruta])))",
            "DIVIDE(SUM(Ventas[Importe]), CALCULATE(SUM(Ventas[Importe]), ALL(Productos[Fruta])))",
            "SUM(Ventas[Importe]) / CALCULATE(SUM(Ventas[Importe]))",
            "DIVIDE(SUM(Ventas[Importe]), SUM(Ventas[Importe]))"
        ],
        correctAnswer: "DIVIDE(SUM(Ventas[Importe]), CALCULATE(SUM(Ventas[Importe]), ALLSELECTED(Productos[Fruta])))",
        explanation: "ALLSELECTED respeta los filtros externos (como los segmentadores) pero elimina los filtros internos del visual, ideal para porcentajes sobre el total visible."
    },
    {
        scenario: "Tu tabla 'Ventas' tiene 'FechaPedido' y 'FechaEnvio'. La relación activa con 'Calendario' es por 'FechaPedido'. ¿Cómo calculas las ventas por 'FechaEnvio' sin cambiar la relación activa?",
        options: [
            "CALCULATE(SUM(Ventas[Importe]), USERELATIONSHIP(Ventas[FechaEnvio], Calendario[Fecha]))",
            "CALCULATE(SUM(Ventas[Importe]), RELATEDTABLE(Calendario))",
            "CALCULATE(SUM(Ventas[Importe]), Ventas[FechaEnvio] = Calendario[Fecha])",
            "SUMX(Ventas, IF(Ventas[FechaEnvio] = MAX(Calendario[Fecha]), Ventas[Importe], 0))"
        ],
        correctAnswer: "CALCULATE(SUM(Ventas[Importe]), USERELATIONSHIP(Ventas[FechaEnvio], Calendario[Fecha]))",
        explanation: "USERELATIONSHIP permite activar una relación inactiva específicamente para un cálculo, sin afectar el modelo global."
    },
    {
        scenario: "Quieres un título dinámico para un gráfico. Si se selecciona una sola fruta, debe mostrar 'Ventas de [Fruta]'. Si no, 'Ventas Totales'.",
        options: [
            "IF(HASONEVALUE(Productos[Fruta]), \"Ventas de \" & VALUES(Productos[Fruta]), \"Ventas Totales\")",
            "IF(ISFILTERED(Productos[Fruta]), \"Ventas de \" & SELECTEDVALUE(Productos[Fruta]), \"Ventas Totales\")",
            "IIF(COUNTROWS(VALUES(Productos[Fruta])) > 1, \"Ventas Totales\", \"Ventas de \" & VALUES(Productos[Fruta]))",
            "SWITCH(TRUE(), ISINSCOPE(Productos[Fruta]), \"Ventas de \" & VALUES(Productos[Fruta]), \"Ventas Totales\")"
        ],
        correctAnswer: "IF(HASONEVALUE(Productos[Fruta]), \"Ventas de \" & VALUES(Productos[Fruta]), \"Ventas Totales\")",
        explanation: "HASONEVALUE comprueba si solo hay un valor único en el contexto de filtro. Combinado con VALUES o SELECTEDVALUE, es perfecto para crear títulos dinámicos."
    }
];

export const SYNTAX_QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        scenario: "Identifica la receta correcta para la función: CALCULATE",
        options: [
            "CALCULATE(<expresión>[, <filtro1>, <filtro2>...])",
            "CALCULATE([<filtro1>], <expresión>)",
            "CALCULATE(<expresión>; <filtro1>)",
            "CALCULATE({<expresión>}, (<filtro1>))"
        ],
        correctAnswer: "CALCULATE(<expresión>[, <filtro1>, <filtro2>...])",
        explanation: "La sintaxis correcta de CALCULATE evalúa primero la expresión y luego aplica los filtros opcionales."
    },
    {
        scenario: "Identifica la receta correcta para la función: SUMX",
        options: [
            "SUMX(<table>, <expresión>)",
            "SUMX(<expresión>, <table>)",
            "SUMX(<table> + <expresión>)",
            "SUMX(<table>: <expresión>)"
        ],
        correctAnswer: "SUMX(<table>, <expresión>)",
        explanation: "SUMX es una función iteradora. Siempre requiere la tabla como primer argumento y la expresión a evaluar como segundo."
    },
    {
        scenario: "Identifica la receta correcta para la función: FILTER",
        options: [
            "FILTER(<table>, <condición_filtro>)",
            "FILTER(<condición_filtro>, <table>)",
            "FILTER(<table>; <condición_filtro>)",
            "FILTER{<table>, <condición_filtro>}"
        ],
        correctAnswer: "FILTER(<table>, <condición_filtro>)",
        explanation: "FILTER devuelve una tabla. El primer argumento es la tabla a filtrar y el segundo es la condición lógica."
    },
    {
        scenario: "Identifica la receta correcta para la función: IF",
        options: [
            "IF(<condición>, <valor_si_true>, <valor_si_false>)",
            "IF(<condición>; <valor_si_true>; <valor_si_false>)",
            "IF(<valor_si_true>, <valor_si_false>, <condición>)",
            "IF(<condición>, <valor_si_true>)"
        ],
        correctAnswer: "IF(<condición>, <valor_si_true>, <valor_si_false>)",
        explanation: "La función IF requiere tres argumentos: la condición a evaluar, el resultado si es verdadera y el resultado si es falsa."
    },
    {
        scenario: "Identifica la receta correcta para la función: DIVIDE",
        options: [
            "DIVIDE(<numerador>, <denominador>[, <resultado_alternativo>])",
            "DIVIDE(<denominador>, <numerador>[, <resultado_alternativo>])",
            "DIVIDE(<numerador> / <denominador>)",
            "DIVIDE(<numerador>, <denominador>, <obligatorio_alternativo>)"
        ],
        correctAnswer: "DIVIDE(<numerador>, <denominador>[, <resultado_alternativo>])",
        explanation: "DIVIDE toma el numerador, luego el denominador, y opcionalmente un resultado alternativo para casos de división por cero."
    },
    {
        scenario: "Identifica la receta correcta para la función: SWITCH",
        options: [
            "SWITCH(<expresión>, <valor1>, <resultado1>...[, <else>])",
            "SWITCH(<valor1>, <resultado1>, <expresión>...[, <else>])",
            "SWITCH(<expresión>, [<valor1>, <resultado1>]...[, <else>])",
            "SWITCH(<expresión>: <valor1>, <resultado1>...)"
        ],
        correctAnswer: "SWITCH(<expresión>, <valor1>, <resultado1>...[, <else>])",
        explanation: "SWITCH evalúa una expresión inicial y luego la compara con una lista de pares de valor y resultado."
    },
    {
        scenario: "Identifica la receta correcta para la función: RELATED",
        options: [
            "RELATED(<columna>)",
            "RELATED(<table>, <columna>)",
            "RELATED(<columna_actual>, <columna_relacionada>)",
            "RELATED{<columna>}"
        ],
        correctAnswer: "RELATED(<columna>)",
        explanation: "RELATED se usa en columnas calculadas y solo necesita como argumento la columna de la tabla relacionada de la que se quiere obtener el valor."
    },
    {
        scenario: "Identifica la receta correcta para la función: DATESYTD",
        options: [
            "DATESYTD(<fechas>[, <fin_de_año>])",
            "DATESYTD([<fin_de_año>], <fechas>)",
            "DATESYTD(<fechas>, <inicio_de_año>)",
            "DATESYTD(<fechas>)"
        ],
        correctAnswer: "DATESYTD(<fechas>[, <fin_de_año>])",
        explanation: "DATESYTD requiere una columna de fechas como primer argumento y, opcionalmente, una fecha de fin de año fiscal."
    },
    {
        scenario: "Identifica la receta correcta para la función: RANKX",
        options: [
            "RANKX(<table>, <expresión>[, <valor>[, <orden>[, <empates>]]])",
            "RANKX(<expresión>, <table>[, <valor>[, <orden>[, <empates>]]])",
            "RANKX(<table>, <expresión>)",
            "RANKX(<table>, <expresión>, <orden>)"
        ],
        correctAnswer: "RANKX(<table>, <expresión>[, <valor>[, <orden>[, <empates>]]])",
        explanation: "RANKX necesita la tabla sobre la que se va a clasificar y la expresión que se usará para el ranking. Los demás parámetros son opcionales."
    },
    {
        scenario: "Identifica la receta correcta para la función: ALLEXCEPT",
        options: [
            "ALLEXCEPT(<table>, <columna1>[, <columna2>...])",
            "ALLEXCEPT(<columna1>, <table>[, <columna2>...])",
            "ALLEXCEPT(<table>, ALL(<columna1>))",
            "ALLEXCEPT(<table> - <columna1>)"
        ],
        correctAnswer: "ALLEXCEPT(<table>, <columna1>[, <columna2>...])",
        explanation: "ALLEXCEPT elimina filtros de una tabla, excepto de las columnas especificadas. La tabla es el primer argumento."
    },
    {
        scenario: "Identifica la receta correcta para la función: FORMAT",
        options: [
            "FORMAT(<valor>, <formato>)",
            "FORMAT(<formato>, <valor>)",
            "FORMAT(<valor> AS <formato>)",
            "FORMAT(<valor>)"
        ],
        correctAnswer: "FORMAT(<valor>, <formato>)",
        explanation: "FORMAT convierte un valor a texto, usando una cadena de formato específica. El valor va primero."
    },
    {
        scenario: "Identifica la receta correcta para la función: USERELATIONSHIP",
        options: [
            "USERELATIONSHIP(<columna1>, <columna2>)",
            "USERELATIONSHIP(<table>, <columna1>, <columna2>)",
            "USERELATIONSHIP(<columna1> -> <columna2>)",
            "USERELATIONSHIP([<columna1>], [<columna2>])"
        ],
        correctAnswer: "USERELATIONSHIP(<columna1>, <columna2>)",
        explanation: "USERELATIONSHIP se usa dentro de CALCULATE y activa una relación inactiva especificando las dos columnas que la forman."
    },
    {
        scenario: "Identifica la receta correcta para la función: CONCATENATE",
        options: [
            "CONCATENATE(<texto1>, <texto2>)",
            "CONCATENATE(<texto1> & <texto2>)",
            "CONCATENATE(<texto1>, <texto2>, <texto3>)",
            "CONCATENATE([<texto1>], [<texto2>])"
        ],
        correctAnswer: "CONCATENATE(<texto1>, <texto2>)",
        explanation: "La función CONCATENATE une dos cadenas de texto. Para unir más de dos, se debe usar el operador ampersand (&)."
    },
    {
        scenario: "Identifica la receta correcta para la función: DATEADD",
        options: [
            "DATEADD(<fechas>, <número_de_intervalos>, <intervalo>)",
            "DATEADD(<intervalo>, <número_de_intervalos>, <fechas>)",
            "DATEADD(<fechas>, <intervalo>, <número_de_intervalos>)",
            "DATEADD(<fechas> + <número_de_intervalos>)"
        ],
        correctAnswer: "DATEADD(<fechas>, <número_de_intervalos>, <intervalo>)",
        explanation: "DATEADD desplaza un conjunto de fechas un número de intervalos (DAY, MONTH, YEAR) especificado."
    },
    {
        scenario: "Identifica la receta correcta para la función: HASONEVALUE",
        options: [
            "HASONEVALUE(<nombreColumna>)",
            "HASONEVALUE(<table>, <nombreColumna>)",
            "HASONEVALUE(<nombreColumna> = 1)",
            "HASONEVALUE(<nombreColumna>)"
        ],
        correctAnswer: "HASONEVALUE(<nombreColumna>)",
        explanation: "HASONEVALUE comprueba si una columna tiene un solo valor en el contexto actual y solo requiere el nombre de la columna."
    },
    {
        scenario: "Identifica la receta correcta para la función: DISTINCTCOUNT",
        options: [
            "DISTINCTCOUNT(<columna>)",
            "DISTINCT(COUNT(<columna>))",
            "COUNT(DISTINCT(<columna>))",
            "DISTINCTCOUNT(<table>, <columna>)"
        ],
        correctAnswer: "DISTINCTCOUNT(<columna>)",
        explanation: "DISTINCTCOUNT es una función optimizada que cuenta el número de valores únicos en una sola columna."
    },
    {
        scenario: "Identifica la receta correcta para la función: CALENDAR",
        options: [
            "CALENDAR(<fecha_inicio>, <fecha_fin>)",
            "CALENDAR(<fecha_fin>, <fecha_inicio>)",
            "CALENDAR(<table>)",
            "CALENDAR(<fecha_inicio> TO <fecha_fin>)"
        ],
        correctAnswer: "CALENDAR(<fecha_inicio>, <fecha_fin>)",
        explanation: "CALENDAR crea una tabla de fechas entre una fecha de inicio y una fecha de fin."
    },
    {
        scenario: "Identifica la receta correcta para la función: MID",
        options: [
            "MID(<texto>, <pos_inicial>, <núm_caracteres>)",
            "MID(<texto>, <núm_caracteres>, <pos_inicial>)",
            "MID(<pos_inicial>, <núm_caracteres>, <texto>)",
            "MID(<texto> FROM <pos_inicial> FOR <núm_caracteres>)"
        ],
        correctAnswer: "MID(<texto>, <pos_inicial>, <núm_caracteres>)",
        explanation: "MID extrae texto desde una posición inicial, con una longitud determinada."
    },
    {
        scenario: "Identifica la receta correcta para la función: IFERROR",
        options: [
            "IFERROR(<valor>, <valor_si_error>)",
            "IFERROR(<valor_si_error>, <valor>)",
            "IF(ERROR(<valor>), <valor_si_error>)",
            "IFERROR(<valor> THEN <valor_si_error>)"
        ],
        correctAnswer: "IFERROR(<valor>, <valor_si_error>)",
        explanation: "IFERROR evalúa el primer argumento y, si produce un error, devuelve el segundo argumento."
    },
    {
        scenario: "Identifica la receta correcta para la función: ALLSELECTED",
        options: [
            "ALLSELECTED([<nombre_tabla> | <nombre_columna>])",
            "ALLSELECTED(<table>, <columna>)",
            "ALLSELECTED()",
            "ALLSELECTED{<nombre_tabla>}"
        ],
        correctAnswer: "ALLSELECTED([<nombre_tabla> | <nombre_columna>])",
        explanation: "ALLSELECTED se puede usar sin argumentos o con una tabla o columna para restaurar el contexto de filtro externo."
    }
];