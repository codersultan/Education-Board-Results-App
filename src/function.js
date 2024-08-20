/**
 * Get verify Alert
 * @param {*} msg
 * @param {*} type
 * @returns
 */
const getVerifed = (msg, type = "danger") => {
  return `<p class="alert alert-${type} d-flex justify-content-between"> ${msg} <button class="btn-close" data-bs-dismiss="alert"></button></p>`;
};

/**
 * Generate uniqe ID
 * @returns
 */
const creatId = () => {
  // 4-byte timestamp
  const timestamp = Math.floor(Date.now() / 1000).toString(16);

  // 5-byte random value
  const randomValue = Math.floor(Math.random() * 0xffffffffff)
    .toString(16)
    .padStart(10, "0");

  // 3-byte incrementing counter
  const counter = (creatId.counter =
    (creatId.counter || Math.floor(Math.random() * 0xffffff)) + 1)
    .toString(16)
    .padStart(6, "0");

  return timestamp + randomValue + counter;
};

/**
 * Create random number
 * @returns
 */
const getRandomNumber = () => {
  return Math.floor(Math.random() * 9) + 1;
};

/**
 * Times tracker Created At
 * @param {*} createdAt
 * @returns
 */
const timeAgo = (createdAt) => {
  const seconds = Math.floor((new Date() - createdAt) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + " minutes ago";
  }

  return "Just Now";
};

/**
 * Get subject Grade and GPA
 * @param {*} mark
 * @returns
 */
const getGradeAndGpa = (mark) => {
  let grade;
  let gpa;

  if (mark >= 80 && mark <= 100) {
    grade = "A+";
    gpa = 5.0;
  } else if (mark >= 70 && mark < 80) {
    grade = "A";
    gpa = 4.0;
  } else if (mark >= 60 && mark < 70) {
    grade = "A-";
    gpa = 3.5;
  } else if (mark >= 50 && mark < 60) {
    grade = "B";
    gpa = 3.0;
  } else if (mark >= 40 && mark < 50) {
    grade = "C";
    gpa = 2.0;
  } else if (mark >= 33 && mark < 40) {
    grade = "D";
    gpa = 1.0;
  } else if (mark >= 0 && mark < 33) {
    grade = "F";
    gpa = 0.0;
  } else {
    grade = `"<p class="text-danger">Something went wrong</p>"`;
    gpa = `"<p class="text-danger">Something went wrong</p>"`;
  }

  return {
    grade: grade,
    gpa: gpa,
  };
};

/**
 * Get Total Subject Result
 * @param {*} marks
 */
const getTotalResult = (marks) => {
  const { bangla, english, math, science, social, religion } = marks;

  const totalGpa = (
    (getGradeAndGpa(bangla).gpa +
      getGradeAndGpa(english).gpa +
      getGradeAndGpa(math).gpa +
      getGradeAndGpa(science).gpa +
      getGradeAndGpa(social).gpa +
      getGradeAndGpa(religion).gpa) /
    6
  ).toFixed(2);

  console.log(totalGpa);

  if (
    bangla >= 33 &&
    english >= 33 &&
    math >= 33 &&
    science >= 33 &&
    social >= 33 &&
    religion >= 33
  ) {
    if (totalGpa >= 0 && totalGpa < 1) {
      return {
        gpa: totalGpa,
        grade: "F",
      };
    } else if (totalGpa >= 1 && totalGpa < 2) {
      return {
        gpa: totalGpa,
        grade: "D",
      };
    } else if (totalGpa >= 2 && totalGpa < 3) {
      return {
        gpa: totalGpa,
        grade: "C",
      };
    } else if (totalGpa >= 3 && totalGpa < 3.5) {
      return {
        gpa: totalGpa,
        grade: "B",
      };
    } else if (totalGpa >= 3.5 && totalGpa < 4) {
      return {
        gpa: totalGpa,
        grade: "A-",
      };
    } else if (totalGpa >= 4 && totalGpa < 5) {
      return {
        gpa: totalGpa,
        grade: "A",
      };
    } else if (totalGpa >= 5) {
      return {
        gpa: totalGpa,
        grade: "A+",
      };
    }
  } else {
    return {
      gpa: 0,
      grade: "F",
    };
  }
};

/**
 * Get Total Marks
 * @param {*} marks
 */
const getTotalMarks = (marks) => {
  const { bangla, english, math, science, social, religion } = marks;

  const totalMarks =
    Number(bangla) +
    Number(english) +
    Number(math) +
    Number(science) +
    Number(social) +
    Number(religion);

  return totalMarks;
};
