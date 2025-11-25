export const DATASETS = {
  sales: {
    name: "Sales Revenue",
    description: "This dataset shows the relationship between marketing budget (in thousands of dollars) and sales revenue. It demonstrates positive linear correlation.",
    xLabel: "Marketing Budget",
    yLabel: "Sales Revenue",
    data: [
      { x: 10, y: 30 }, { x: 20, y: 55 }, { x: 30, y: 68 }, { x: 40, y: 85 }, 
      { x: 50, y: 100 }, { x: 60, y: 115 }, { x: 70, y: 125 }, { x: 80, y: 145 },
      { x: 15, y: 40 }, { x: 25, y: 60 }, { x: 35, y: 75 }, { x: 45, y: 90 }
    ]
  },
  housing: {
    name: "Housing Prices",
    description: "This dataset contains information about house sizes (sq meters) and their prices. Perfect for understanding how size affects market value.",
    xLabel: "House Size (sq m)",
    yLabel: "Price (thousands $)",
    data: [
      { x: 50, y: 150 }, { x: 60, y: 180 }, { x: 80, y: 220 }, { x: 100, y: 300 },
      { x: 120, y: 350 }, { x: 140, y: 410 }, { x: 70, y: 200 }, { x: 90, y: 260 },
      { x: 110, y: 320 }, { x: 130, y: 380 }
    ]
  },
  salary: {
    name: "Salary vs Experience",
    description: "Illustrates the relationship between years of professional experience and annual salary. Shows career growth patterns.",
    xLabel: "Years of Experience",
    yLabel: "Salary ($)",
    data: [
      { x: 1, y: 40000 }, { x: 2, y: 45000 }, { x: 3, y: 48000 }, { x: 4, y: 55000 },
      { x: 5, y: 65000 }, { x: 6, y: 72000 }, { x: 8, y: 90000 }, { x: 10, y: 110000 },
      { x: 1.5, y: 42000 }, { x: 3.5, y: 50000 }
    ]
  }
};

// Simulate Gradient Descent steps
export function generateHistory(datasetKey: keyof typeof DATASETS, alpha: number, iterations: number) {
  const data = DATASETS[datasetKey].data;
  const history = [];
  let m = 0; 
  let b = 0; 
  const N = data.length;

  // Normalize data for visual stability
  const maxX = Math.max(...data.map(d => d.x));
  const maxY = Math.max(...data.map(d => d.y));

  for (let i = 0; i <= iterations; i++) {
    let dm = 0;
    let db = 0;

    data.forEach(p => {
      const x = p.x / maxX; 
      const y = p.y / maxY;
      const pred = m * x + b;
      const error = pred - y;
      
      dm += error * x;
      db += error;
    });

    m -= alpha * (dm / N);
    b -= alpha * (db / N);

    // De-normalize for charting
    const actualM = m * (maxY / maxX);
    const actualB = b * maxY;
    
    // Calculate MSE
    let realCost = 0;
    data.forEach(p => {
        realCost += Math.pow(p.y - (actualM * p.x + actualB), 2);
    });
    realCost = realCost / N;

    history.push({ iteration: i, m: actualM, b: actualB, cost: realCost });
  }
  return history;
}