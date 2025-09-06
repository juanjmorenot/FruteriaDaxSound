
import { DAXFormula, DAXCategory, QuizQuestion } from './types';

export const CATEGORY_THEME: Record<DAXCategory, { color: string; bgColor: string; icon: string }> = {
    [DAXCategory.Aggregation]: { color: 'text-red-600', bgColor: 'bg-red-100', icon: '🍓' },
    [DAXCategory.Filter]: { color: 'text-orange-600', bgColor: 'bg-orange-100', icon: '🍊' },
    [DAXCategory.TimeIntelligence]: { color: 'text-blue-600', bgColor: 'bg-blue-100', icon: '🫐' },
    [DAXCategory.Logical]: { color: 'text-green-600', bgColor: 'bg-green-100', icon: '🍐' },
    [DAXCategory.Information]: { color: 'text-purple-600', bgColor: 'bg-purple-100', icon: '🍇' },
    [DAXCategory.Relationship]: { color: 'text-pink-600', bgColor: 'bg-pink-100', icon: '🍒' },
    [DAXCategory.Text]: { color: 'text-yellow-600', bgColor: 'bg-yellow-100', icon: '🍋' },
    [DAXCategory.Ranking]: { color: 'text-teal-600', bgColor: 'bg-teal-100', icon: '🥝' },
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
    }
];
