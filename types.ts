
export enum DAXCategory {
    Aggregation = "Agregación y Conteo",
    Filter = "Filtro y Contexto",
    TimeIntelligence = "Inteligencia de Tiempo",
    Logical = "Lógicas",
    Information = "Información",
    Relationship = "Relación",
    Text = "Texto",
    Ranking = "Ranking y Estadísticas",
}

export interface DAXFormula {
    name: string;
    category: DAXCategory;
    usage: string;
    syntax: string;
    example: string;
}

export interface QuizQuestion {
    scenario: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

export enum GameMode {
    Harvest = "Cosecha",
    Glossary = "Bodega",
    Timed = "Memoriza la Fruta",
    Quiz = "Desafíos",
}