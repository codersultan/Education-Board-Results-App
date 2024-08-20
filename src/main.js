const studentCreateForm = document.getElementById("student-create-form");
const studentResultForm = document.getElementById("student-restlt-form");
const editResultForm = document.getElementById("edit-restlt-form");
const editStudentInfoForm = document.getElementById("edit-student-info-form");
const studentDataList = document.getElementById("student-data-list");
const validMsg = document.querySelectorAll(".valid-msg");
const btnClose = document.querySelectorAll(".btn-close");

/**
 * Show admin student list
 */

const getAllData = () => {
  // get data to ls
  let data = JSON.parse(localStorage.getItem("students"));

  let dataList = "";
  // load data on datalist
  if (data) {
    data.reverse().map((item, index) => {
      dataList += `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.roll}</td>
                    <td>${item.reg}</td>
                    <td>${item.board}</td>
                    <td>${timeAgo(item.createdAt)}</td>
                    <td>
                      ${
                        item.results
                          ? "<button onclick=\"showStudentResult('" +
                            item.id +
                            '\')" class="btn btn-success btn-sm fw-bold" data-bs-toggle="modal" data-bs-target="#view-result" > View Result </button>'
                          : "<button onclick=\"addStudentResult('" +
                            item.id +
                            '\')" class="btn btn-info btn-sm fw-bold" data-bs-toggle="modal" data-bs-target="#add-result">  Add Result </button>'
                      }
                    </td>
                    <td>
                      <button class="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#edit-student-info" onclick="editStdInfo('${
                        item.id
                      }')">
                        <i class="fa-regular fa-pen-to-square"></i>
                      </button>
                      <button class="btn btn-sm btn-danger" onclick="deleteStudent('${
                        item.id
                      }')">
                        <i class="fa-regular fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
      `;
    });
  }

  studentDataList.innerHTML = dataList;
};
getAllData();

/**
 * Submit student create form
 */

studentCreateForm.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data);

  // Form Validation
  if (
    !data.name ||
    !data.father ||
    !data.mother ||
    !data.dob ||
    !data.roll ||
    !data.reg ||
    !data.board ||
    !data.inst ||
    !data.year ||
    !data.exam ||
    !data.group ||
    !data.type
  ) {
    validMsg.forEach(
      (item) => (item.innerHTML = getVerifed("All fields are required!"))
    );
  } else {
    let old_data = [];

    // Check old data exist or not
    if (localStorage.getItem("students")) {
      old_data = JSON.parse(localStorage.getItem("students"));
    }

    // push new data
    old_data.push({
      ...data,
      id: creatId(),
      createdAt: Date.now(),
      updateAt: null,
      results: null,
    });

    // send data ls
    localStorage.setItem("students", JSON.stringify(old_data));

    e.target.reset();
    btnClose.forEach((item) => {
      item.click();
    });
    getAllData();
  }
};

/**
 * Edit student info
 * @param {*} id
 */
const editStdInfo = (id) => {
  const studentData = JSON.parse(localStorage.getItem("students"));

  const data = studentData.find((data) => data.id == id);

  editStudentInfoForm.querySelector('input[name="id"]').value = id;
  editStudentInfoForm.querySelector('input[name="name"]').value = data.name;
  editStudentInfoForm.querySelector('input[name="father"]').value = data.father;
  editStudentInfoForm.querySelector('input[name="mother"]').value = data.name;
  editStudentInfoForm.querySelector('input[name="dob"]').value = data.dob;
  editStudentInfoForm.querySelector('input[name="roll"]').value = data.roll;
  editStudentInfoForm.querySelector('input[name="reg"]').value = data.reg;
  editStudentInfoForm.querySelector('select[name="board"]').value = data.board;
  editStudentInfoForm.querySelector('select[name="inst"]').value = data.inst;
  editStudentInfoForm.querySelector('select[name="year"]').value = data.year;
  editStudentInfoForm.querySelector('select[name="exam"]').value = data.exam;

  // Handle radio buttons for group
  const groupRadios = editStudentInfoForm.querySelectorAll(
    'input[name="group"]'
  );
  groupRadios.forEach((radio) => {
    radio.checked = radio.value === data.group;
  });

  // Handle radio buttons for type
  const typeRadios = editStudentInfoForm.querySelectorAll('input[name="type"]');
  typeRadios.forEach((radio) => {
    radio.checked = radio.value === data.type;
  });
};

/**
 * Update Student Info
 * @param {*} e
 */

editStudentInfoForm.onsubmit = (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));

  // Form Validation
  if (
    !data.name ||
    !data.father ||
    !data.mother ||
    !data.dob ||
    !data.roll ||
    !data.reg ||
    !data.board ||
    !data.inst ||
    !data.year ||
    !data.exam ||
    !data.group ||
    !data.type
  ) {
    validMsg.forEach(
      (item) => (item.innerHTML = getVerifed("All fields are required!"))
    );
  } else {
    // get data form ls
    const studentsData = JSON.parse(localStorage.getItem("students"));

    // update data
    const updateData = studentsData.map((item) => {
      if (item.id == data.id) {
        return {
          ...item,
          name: data.name,
          father: data.father,
          mother: data.mother,
          dob: data.dob,
          roll: data.roll,
          reg: data.reg,
          board: data.board,
          inst: data.inst,
          year: data.year,
          exam: data.exam,
          group: data.group,
          type: data.type,
          updateAt: Date.now(),
        };
      } else {
        return item;
      }
    });

    // send data ls
    localStorage.setItem("students", JSON.stringify(updateData));

    e.target.reset();
    btnClose.forEach((item) => {
      item.click();
    });
    getAllData();
  }
};

/**
 * Delete Student
 * @param {*} id
 */
const deleteStudent = (id) => {
  // get data to ls
  const stdData = JSON.parse(localStorage.getItem("students"));

  // get confirmation
  let conf = confirm("Are you sure?");

  if (conf) {
    const deleteData = stdData.filter((data) => data.id != id);

    // send data to ls
    localStorage.setItem("students", JSON.stringify(deleteData));
  } else {
    return false;
  }

  getAllData();
};

/**
 * Add Student Result
 */
const addStudentResult = (id) => {
  studentResultForm.querySelector('input[name="id"]').value = id;
};

/**
 * Student result form submit
 * @param {*} e
 */
studentResultForm.onsubmit = (e) => {
  e.preventDefault();

  // get form data
  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data);

  //Form Validation
  if (
    !data.ban ||
    !data.eng ||
    !data.math ||
    !data.science ||
    !data.social ||
    !data.reli
  ) {
    validMsg.forEach(
      (item) => (item.innerHTML = getVerifed("All fields are required!"))
    );
  } else {
    // get data form ls
    const studentsData = JSON.parse(localStorage.getItem("students"));

    // add result
    const updateResult = studentsData.map((item) => {
      if (item.id == data.id) {
        return {
          ...item,

          results: {
            bangla: data.ban,
            english: data.eng,
            math: data.math,
            science: data.science,
            social: data.social,
            religion: data.reli,
          },
        };
      } else {
        return item;
      }
    });

    // send data to ls
    localStorage.setItem("students", JSON.stringify(updateResult));

    e.target.reset();
    btnClose.forEach((item) => {
      item.click();
    });

    getAllData();
  }
};

/**
 * Show student result
 * @param {*} id
 */
const showStudentResult = (id) => {
  const studentData = JSON.parse(localStorage.getItem("students"));

  const { results } = studentData.find((data) => data.id == id);

  const showSingleResult = document.getElementById("show-single-result");

  showSingleResult.innerHTML = `
    <table class="w-100 border table table-striped">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Mark</th>
                      <th>Grade</th>
                      <th>GPA</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Bangla</td>
                      <td>${results.bangla}</td>
                      <td>${getGradeAndGpa(results.bangla).grade}</td>
                      <td>${getGradeAndGpa(results.bangla).gpa}</td>
                    </tr>
                    <tr>
                      <td>English</td>
                      <td>${results.english}</td>
                      <td>${getGradeAndGpa(results.english).grade}</td>
                      <td>${getGradeAndGpa(results.english).gpa}</td>
                    </tr>
                    <tr>
                      <td>Mathematics</td>
                      <td>${results.math}</td>
                      <td>${getGradeAndGpa(results.math).grade}</td>
                      <td>${getGradeAndGpa(results.math).gpa}</td>
                    </tr>
                    <tr>
                      <td>Science</td>
                      <td>${results.science}</td>
                      <td>${getGradeAndGpa(results.science).grade}</td>
                      <td>${getGradeAndGpa(results.science).gpa}</td>
                    </tr>
                    <tr>
                      <td>Social</td>
                      <td>${results.social}</td>
                      <td>${getGradeAndGpa(results.social).grade}</td>
                      <td>${getGradeAndGpa(results.social).gpa}</td>
                    </tr>
                    <tr>
                      <td>Religion</td>
                      <td>${results.religion}</td>
                      <td>${getGradeAndGpa(results.religion).grade}</td>
                      <td>${getGradeAndGpa(results.religion).gpa}</td>
                    </tr>
                    <tr>
                      <td><b>Total</b></td>
                      <td><b>${getTotalMarks(results)}</b></td>
                      <td><b>${getTotalResult(results).grade}</b></td>
                      <td><b>${getTotalResult(results).gpa}</b></td>
                    </tr>
                  </tbody>
                </table>

                <button onclick="${editResult(
                  id
                )}" class="btn btn-warning btn-sm fw-bold mt-3" data-bs-toggle="modal" data-bs-target="#edit-result" >
                  Edit Result
                </button>
  `;
};

/**
 * Edit Student Result
 * @param {*} id
 */
const editResult = (id) => {
  const studentData = JSON.parse(localStorage.getItem("students"));

  const { results } = studentData.find((data) => data.id == id);

  editResultForm.querySelector('input[name="ban"]').value = results.bangla;
  editResultForm.querySelector('input[name="eng"]').value = results.english;
  editResultForm.querySelector('input[name="math"]').value = results.math;
  editResultForm.querySelector('input[name="science"]').value = results.science;
  editResultForm.querySelector('input[name="social"]').value = results.social;
  editResultForm.querySelector('input[name="reli"]').value = results.religion;
  editResultForm.querySelector('input[name="id"]').value = id;
};

/**
 * Update results
 * @param {*} e
 */

editResultForm.onsubmit = (e) => {
  e.preventDefault();

  // get form data
  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data);

  //Form Validation
  if (
    !data.ban ||
    !data.eng ||
    !data.math ||
    !data.science ||
    !data.social ||
    !data.reli
  ) {
    validMsg.forEach(
      (item) => (item.innerHTML = getVerifed("All fields are required!"))
    );
  } else {
    // get data form ls
    const studentsData = JSON.parse(localStorage.getItem("students"));

    // add result
    const updateResult = studentsData.map((item) => {
      if (item.id == data.id) {
        return {
          ...item,
          updateAt: Date.now(),

          results: {
            bangla: data.ban,
            english: data.eng,
            math: data.math,
            science: data.science,
            social: data.social,
            religion: data.reli,
          },
        };
      } else {
        return item;
      }
    });

    // send data to ls
    localStorage.setItem("students", JSON.stringify(updateResult));

    e.target.reset();
    btnClose.forEach((item) => {
      item.click();
    });

    getAllData();
  }
};
