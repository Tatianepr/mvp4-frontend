/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/vinhos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.vinhos.forEach(item => insertList(item.name,
        item.type,
        item.fixedacidity,
        item.volatileacidity,
        item.citricacid,
        item.residualsugar,
        item.chlorides,
        item.freesulfurdioxide,
        item.totalsulfurdioxide,
        item.density,
        item.pH,
        item.sulphates,
        item.alcohol,
        item.quality
      ))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()




/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = (inputname,
  inputtype,
  inputfixedacidity,
  inputvolatileacidity,
  inputcitricacid,
  inputresidualsugar,
  inputchlorides,
  inputfreesulfurdioxide,
  inputtotalsulfurdioxide,
  inputdensity,
  inputpH,
  inputsulphates,
  inputalcohol) => {

  const formData = new FormData();
  formData.append('name', inputname);
  formData.append('type', inputtype);
  formData.append('fixedacidity', inputfixedacidity);
  formData.append('volatileacidity', inputvolatileacidity);
  formData.append('citricacid', inputcitricacid);
  formData.append('residualsugar', inputresidualsugar);
  formData.append('chlorides', inputchlorides);
  formData.append('freesulfurdioxide', inputfreesulfurdioxide);
  formData.append('totalsulfurdioxide', inputtotalsulfurdioxide);
  formData.append('density', inputdensity);
  formData.append('pH', inputpH);
  formData.append('sulphates', inputsulphates);
  formData.append('alcohol', inputalcohol);

  let url = 'http://127.0.0.1:5000/vinho';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      insertList(result.name,
        result.type,
        result.fixedacidity,
        result.volatileacidity,
        result.citricacid,
        result.residualsugar,
        result.chlorides,
        result.freesulfurdioxide,
        result.totalsulfurdioxide,
        result.density,
        result.pH,
        result.sulphates,
        result.alcohol,
        result.quality);
      console.log('Resultado do POST:', result);
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
}



/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertDeleteButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/vinho?name=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = async () => {
  let inputname = document.getElementById("newInput").value;
  let inputtype = document.getElementById("newtype").value;
  let inputfixedacidity = document.getElementById("newfixedacidity").value;
  let inputvolatileacidity = document.getElementById("newvolatileacidity").value;
  let inputcitricacid = document.getElementById("newcitricacid").value;
  let inputresidualsugar = document.getElementById("newresidualsugar").value;
  let inputchlorides = document.getElementById("newchlorides").value;
  let inputfreesulfurdioxide = document.getElementById("newfreesulfurdioxide").value;
  let inputtotalsulfurdioxide = document.getElementById("newtotalsulfurdioxide").value;
  let inputdensity = document.getElementById("newdensity").value;
  let inputpH = document.getElementById("newpH").value;
  let inputsulphates = document.getElementById("newsulphates").value;
  let inputalcohol = document.getElementById("newalcohol").value;

  // Verifique se o nome do produto já existe antes de adicionar
  const checkUrl = `http://127.0.0.1:5000/vinho?nome=${inputname}`;
  fetch(checkUrl, {
    method: 'get'
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.vinhos && data.vinhos.some(item => item.name === inputname)) {
        alert("O vinho já está cadastrado.\nCadastre o vinho com um nome diferente ou atualize o existente.");
      } else if ((inputname === '') ||
        (inputfixedacidity === '') ||
        (inputvolatileacidity === '') ||
        (inputcitricacid === '') ||
        (inputresidualsugar === '') ||
        (inputchlorides === '') ||
        (inputfreesulfurdioxide === '') ||
        (inputtotalsulfurdioxide === '') ||
        (inputdensity === '') ||
        (inputpH === '') ||
        (inputsulphates === '') ||
        (inputalcohol === '')) {

        alert("Nenhum campo pode ser vazio!");

      } else if (isNaN(inputtype) ||
        isNaN(inputfixedacidity) ||
        isNaN(inputvolatileacidity) ||
        isNaN(inputcitricacid) ||
        isNaN(inputresidualsugar) ||
        isNaN(inputchlorides) ||
        isNaN(inputfreesulfurdioxide) ||
        isNaN(inputtotalsulfurdioxide) ||
        isNaN(inputdensity) ||
        isNaN(inputpH) ||
        isNaN(inputsulphates) ||
        isNaN(inputalcohol)
      ) {
        alert("Esse(s) campo(s) precisam ser números!");
      } else {
        //insertList(inputPatient, inputPreg, inputPlas, inputPres, inputSkin, inputTest, inputMass, inputPedi, inputAge);
        postItem(inputname,
          inputtype,
          inputfixedacidity,
          inputvolatileacidity,
          inputcitricacid,
          inputresidualsugar,
          inputchlorides,
          inputfreesulfurdioxide,
          inputtotalsulfurdioxide,
          inputdensity,
          inputpH,
          inputsulphates,
          inputalcohol
        );
        alert("Item adicionado!");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (name, type, fixedacidity, volatileacidity, citricacid, residualsugar, chlorides, freesulfurdioxide, totalsulfurdioxide, density, pH, sulphates, alcohol, quality) => {
  var item = [name, type, fixedacidity, volatileacidity, citricacid, residualsugar, chlorides, freesulfurdioxide, totalsulfurdioxide, density, pH, sulphates, alcohol, quality];
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cell = row.insertCell(i);
    cell.textContent = item[i];
  }

  var deleteCell = row.insertCell(-1);
  insertDeleteButton(deleteCell);


  document.getElementById("newInput").value = "";
  document.getElementById("newtype").value = "";
  document.getElementById("newfixedacidity").value = "";
  document.getElementById("newvolatileacidity").value = "";
  document.getElementById("newcitricacid").value = "";
  document.getElementById("newresidualsugar").value = "";
  document.getElementById("newchlorides").value = "";
  document.getElementById("newfreesulfurdioxide").value = "";
  document.getElementById("newtotalsulfurdioxide").value = "";
  document.getElementById("newdensity").value = "";
  document.getElementById("newpH").value = "";
  document.getElementById("newsulphates").value = "";
  document.getElementById("newalcohol").value = "";
  removeElement();
}