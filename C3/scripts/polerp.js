function Li(xs, x) {
	return xs.reduce((out, xi) => {
		if (xi !== x) {
			out *= (x - xi) / (xs.filter(xj => xj !== xi).reduce((prod, xj) => prod * (xi - xj), 1));
		}
		return out;
	}, 1);
}
  
function gauss_method(matrix, result) {
  const n = matrix.length;
  
  // Make a copy of the matrix to avoid modifying the input array
  matrix = matrix.map(row => [...row]);

  for (let i = 0; i < n; i++) {
    const pivotRowIndex = matrix
      .slice(i)
      .reduce((p, row, j) =>
        Math.abs(row[i]) > Math.abs(matrix[p][i]) ? i + j : p, i);

    [matrix[i], matrix[pivotRowIndex]] = [matrix[pivotRowIndex], matrix[i]];
    [result[i], result[pivotRowIndex]] = [result[pivotRowIndex], result[i]];

    const pivot = matrix[i][i];
    matrix[i] = matrix[i].map(value => value / pivot);
    result[i] /= pivot;

    for (let j = i + 1; j < n; j++) {
      const factor = matrix[j][i];
      matrix[j] = matrix[j].map((value, k) => value - factor * matrix[i][k]);
      result[j] -= factor * result[i];
    }
  }

  const solution = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = i + 1; j < n; j++) {
      sum += matrix[i][j] * solution[j];
    }
    solution[i] = result[i] - sum;
  }

  return solution;
}
  
function matrix(points) {
    let mat = [];
    let n = points.length;
    for (let i=0; i<n; i++) {
        let x = points[i][0];
        mat.push(Array.from({length: n}, (_, i) => x ** i));
    }
    return mat;
}

function Polerp(points) {
    let mat = matrix(points);
    let v = points.map(p => p[1]);
    let sol = gauss_method(mat, v);

    return x => sol.reduce((acc, cur, i) => acc + cur*x ** i, 0)
}