const resultSearchForm = document.getElementById("result-search-form");
const eduPzlLavel = document.getElementById("edu-pzl");

//random number equal
let num1 = getRandomNumber();
let num2 = getRandomNumber();
eduPzlLavel.innerHTML = `${num1} + ${num2}`;

// localStorage.setItem("edu_pzl", JSON.stringify({ a: num1, b: num2 }));

/**
 * Result search form
 * @param {*} e
 */
resultSearchForm.onsubmit = (e) => {
  e.preventDefault();

  //get form data
  const { exam, year, board, roll, reg, pzl } = Object.fromEntries(
    new FormData(e.target)
  );

  //get data form ls
  // const eduPlz = JSON.parse(localStorage.getItem("edu_pzl"));
  const stdData = JSON.parse(localStorage.getItem("students"));

  // form validation
  if (!year) {
    alert("Please Select Year!");
  } else if (!board) {
    alert("Please Select Board!");
  } else if (!roll) {
    alert("Please Enter Exam Roll!");
  } else if (!reg) {
    alert("Please Enter Registration Number!");
  } else if (!pzl) {
    alert("Please Enter the Pazzle Value");
  } else {
    if (num1 + num2 != pzl) {
      alert("Pazzle not match!");
    } else {
      const searchData = stdData.find(
        (item) =>
          item.exam == exam &&
          item.board == board &&
          item.year == year &&
          item.roll == roll &&
          item.reg == reg &&
          item.results
      );

      if (!searchData) {
        alert("No result found!");
      } else {
        localStorage.setItem("search_data", JSON.stringify(searchData));
        window.location.href = "result.html";
      }
    }
  }
};
