const studentResultSheet = document.querySelector(".result-sheet");

const showResultSheet = () => {
  //get search data
  const data = JSON.parse(localStorage.getItem("search_data"));

  if (!data) {
    window.location.href = "/index.html";
  }

  console.log(data);
  studentResultSheet.innerHTML = `
          <div class="student-info">
            <h2 class ="text-capitalize">${data.exam} Result ${data.year}</h2>

            <div class="info-table">
              <table width="100%" class="text-capitalize">
                <tr>
                  <td>Roll No</td>
                  <td>${data.roll}</td>
                  <td>Name</td>
                  <td class="text-uppercase">${data.name}</td>
                </tr>

                <tr>
                  <td>Board</td>
                  <td class="text-uppercase">${data.board}</td>
                  <td>Father's Name</td>
                  <td class="text-uppercase">${data.father}</td>
                </tr>

                <tr>
                  <td>Group</td>
                  <td class="text-uppercase">${data.group}</td>
                  <td>Mother's Name</td>
                  <td class="text-uppercase">${data.mother}</td>
                </tr>

                <tr>
                  <td>Type</td>
                  <td class="text-uppercase">${data.type}</td>
                  <td>Date of Birth</td>
                  <td>${data.dob}</td>
                </tr>

                <tr>
                  <td>Result</td>
                  <td class="text-uppercase"><b>${
                    getTotalResult(data.results).gpa == 0 ? "Faild" : "Passed"
                  }</b></td>
                  <td>Institute</td>
                  <td class="text-uppercase">${data.inst}</td>
                </tr>

                <tr>
                  <td>GPA</td>
                  <td colspan="3"><b>${
                    getTotalResult(data.results).gpa
                  }</b></td>
                </tr>
              </table>
            </div>
          </div>

          <div class="Grade-sheet">
            <h2>Grade Sheet</h2>

            <div class="grade-table">
              <table width="100%">
                <tr>
                  <th>Code</th>
                  <th>Subject</th>
                  <th>Grade</th>
                  <th>GPA</th>
                </tr>

                <tr>
                  <td>101</td>
                  <td>BANGLA</td>
                  <td>${getGradeAndGpa(data.results.bangla).grade}</td>
                  <td>${getGradeAndGpa(data.results.bangla).gpa}</td>
                </tr>

                <tr>
                  <td>107</td>
                  <td>ENGLISH</td>
                  <td>${getGradeAndGpa(data.results.english).grade}</td>
                  <td>${getGradeAndGpa(data.results.english).gpa}</td>
                </tr>

                <tr>
                  <td>109</td>
                  <td>MATHEMATICS</td>
                  <td>${getGradeAndGpa(data.results.math).grade}</td>
                  <td>${getGradeAndGpa(data.results.math).gpa}</td>
                </tr>

                <tr>
                  <td>130</td>
                  <td>SCIENCE</td>
                  <td>${getGradeAndGpa(data.results.science).grade}</td>
                  <td>${getGradeAndGpa(data.results.science).gpa}</td>
                </tr>

                <tr>
                  <td>150</td>
                  <td>SOCIAL</td>
                  <td>${getGradeAndGpa(data.results.social).grade}</td>
                  <td>${getGradeAndGpa(data.results.social).gpa}</td>
                </tr>

                <tr>
                  <td>111</td>
                  <td>RELIGION</td>
                  <td>${getGradeAndGpa(data.results.religion).grade}</td>
                  <td>${getGradeAndGpa(data.results.religion).gpa}</td>
                </tr>
              </table>
            </div>
          </div>
    `;
};
showResultSheet();

const goToHomePage = () => {
  localStorage.removeItem("search_data");
  window.location.href = "index.html";
};
