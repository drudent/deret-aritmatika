function hapus() {
  document.getElementById("Suku pertama (a)").value = "";
  document.getElementById("Selisih (d)").value = "";
  document.getElementById("Suku ke-n").value = "";
}

function toggleSteps() {
  const stepsResultNth = document.getElementById('steps_result_nth');
  const stepsResultSum = document.getElementById('steps_result_sum');
  const resultNth = document.getElementById('result_nth');
  const resultSum = document.getElementById('result_sum');

  if (stepsResultNth.style.display === 'none' && stepsResultSum.style.display === 'none') {
    stepsResultNth.style.display = 'block';
    stepsResultSum.style.display = 'block';
    resultNth.style.display = 'none';
    resultSum.style.display = 'none';
  } else {
    stepsResultNth.style.display = 'none';
    stepsResultSum.style.display = 'none';
    resultNth.style.display = 'block';
    resultSum.style.display = 'block';
  }
}

function calculate(){
  // 1. init & validate
  const sequence = input.get('sequence').raw();
  let first, diff, nth;
  switch(sequence){
    case 'arithmetic':
      first = input.get('Suku pertama (a)').number().val();
      diff = input.get('Selisih (d)').number().val();
      nth = input.get('Suku ke-n').natural().val();
      break;
  }
  if(!input.valid()) return;

  // 2. calculate
  let resultSequence = [first], resultNth = 0, resultSum = first;
  let stepsResultNth, stepsResultSum;
  let iterrate = method => {
    for(let i = 1; i < nth; i++){
      resultNth = resultSequence[i] = method(i, resultSequence);
      resultSum = math.evaluate(`${resultSum}+${resultNth}`);
    }
  };
  switch(sequence){
    case 'arithmetic':
      iterrate((index, sequence) => math.evaluate(`${sequence[index-1]}+${diff}`));
    break;
  }
  const toFixed = value => value.toFixed().length > 500 ? value : value.toFixed();
  stepsResultNth = `a + (n - 1) d = ${first} + (${nth} - 1) ${diff} = ${resultNth}`;
  stepsResultSum = `n/2 (2a + (n - 1) d) = ${nth}/2 (2(${first}) + (${nth} - 1) ${diff}) = ${resultSum}`;
  document.getElementById('steps_result_nth').innerText = stepsResultNth;
  document.getElementById('steps_result_sum').innerText = stepsResultSum;

  // 3. output
  _('result_sequence').innerHTML = resultSequence.slice(0,9).join(' + ') + (nth > 9 ? '...' : '');
  _('result_nth').innerHTML = toFixed(resultNth);
  _('result_sum').innerHTML = toFixed(resultSum);
}

window.addEventListener('load', () => math.config({number:'BigNumber',precision:500}));

// const clearResult = () => {
//   _('result_sequence').innerHTML = '';
//   _('result_nth').innerHTML = '';
//   _('result_sum').innerHTML = '';
// };
// _('sequence-a').addEventListener('click', clearResult);
// _('sequence-b').addEventListener('click', clearResult);
// _('sequence-c').addEventListener('click', clearResult);