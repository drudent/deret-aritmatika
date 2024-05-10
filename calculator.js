function hapus(){
  document.getElementById("Suku pertama (a)").value = "";
  document.getElementById("Selisih (d)").value = "";
  document.getElementById("Suku ke-n").value = "";
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

  // 3. output
  _('result_sequence').innerHTML = resultSequence.slice(0,9).join(', ') + (nth > 9 ? '...' : '');
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