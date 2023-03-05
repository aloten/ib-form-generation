const categories = {
  ATL: "ATL",
  Content: "Content",
  Improvement: "Improvement"
};

const SUBJECTS = {
  english: "english",
  frenchLA: "frenchLA",
  frenchLL: "frenchLL",
  chineseLL: "chineseLL",
  chineseLA: "chineseLA",
  math: "math",
  sciences: "sciences"
};

// key is category + subject + grade + rating
const templateMap = {
  category1Rating1: "{SUBJECT_PRONOUN} has a 1 rating in category 1.",
  category1Rating2: "{SUBJECT_PRONOUN} has a 2 rating in category 1.",
  category1Rating3: "{SUBJECT_PRONOUN} has a 3 rating in category 1.",
  category1Rating4: "{SUBJECT_PRONOUN} has a 4 rating in category 1.",
  category2Rating1: "{SUBJECT_PRONOUN} has a 1 rating in category 2.",
  category2Rating2: "{SUBJECT_PRONOUN} has a 2 rating in category 2.",
  category2Rating3: "{SUBJECT_PRONOUN} has a 3 rating in category 2.",
  category2Rating4: "{SUBJECT_PRONOUN} has a 4 rating in category 2.",
  category3Rating1: "{SUBJECT_PRONOUN} has a 1 rating in category 3.",
  category3Rating2: "{SUBJECT_PRONOUN} has a 2 rating in category 3.",
  category3Rating3: "{SUBJECT_PRONOUN} has a 3 rating in category 3.",
  category3Rating4: "{SUBJECT_PRONOUN} has a 4 rating in category 3.",
};

const Pronouns = {
  "She/her": "She/her",
  "He/his": "He/his",
  "They/them": "They/them"
};

const PronounsToPronounMap = {
  "She/her/subject": "she",
  "She/her/object": "her",
  "He/his/subject": "he",
  "He/his/object": "his",
  "They/them/subject": "they",
  "They/them/object": "them"
};

class Report {
  constructor(form) {
    this.category1Rating = form.category1Rating;
    this.category2Rating = form.category2Rating;
    this.category3Rating = form.category3Rating;
    this.subjectPronoun = PronounsToPronounMap[form.pronouns + "/subject"];
    this.objectPronoun = PronounsToPronounMap[form.pronouns + "/object"];
  }

  getCategory1Statement() {
    return templateMap["category1Rating" + this.category1Rating].replace("{SUBJECT_PRONOUN}", this.subjectPronoun);
  }

  getCategory2Statement() {
    return templateMap["category2Rating" + this.category2Rating].replace("{SUBJECT_PRONOUN}", this.subjectPronoun);
  }

  getCategory3Statement() {
    return templateMap["category3Rating" + this.category3Rating].replace("{SUBJECT_PRONOUN}", this.subjectPronoun);
  }
};


const generateReport = (form) => {
  const report = new Report(form);
  
  const result = `${report.getCategory1Statement()} ${report.getCategory2Statement()} ${report.getCategory3Statement()}`;
  return result;
}

const PASS = "pass";

const clearErrorMsg = () => {
  const errorMsg = document.querySelector(".errorMsg");
  if (errorMsg != null) {
    errorMsg.remove();
  }
}

const validateForm = (form) => {
  for (const [key, value] of Object.entries(form)) {
    if (value == "") {
      return key;
    }
  }
  return PASS;
}

const showFormErrorMsg = (formKeyWithError) => {
  const targetInput = document.querySelector(`#${formKeyWithError}`);
  const errorMsg = document.createElement("span");
  errorMsg.textContent = "Please add a value";
  errorMsg.classList.add("errorMsg");
  targetInput.parentNode.insertBefore(errorMsg, targetInput);
}

const onFormSubmit = () => {
  const name = document.querySelector("#name").value;
  const grade = document.querySelector("#grade").value;
  const pronouns = document.querySelector("#pronouns").value;
  const category1Rating = document.querySelector("#category1Rating").value;
  const category2Rating = document.querySelector("#category2Rating").value;
  const category3Rating = document.querySelector("#category3Rating").value;
  const form = new Form(name, grade, pronouns, category1Rating, category2Rating, category3Rating);
  const formValidationMsg = validateForm(form);
  clearErrorMsg();
  if ( formValidationMsg === PASS) {
    const reportString = generateReport(form);
    updateReportTextOnPage(reportString);
  } else {
    showFormErrorMsg(formValidationMsg);
  }
}

const updateReportTextOnPage = (reportString) => {
  document.querySelector("#generated-report-text").innerHTML = reportString;
}

const createCategoryRatingElements = () => {
  Object.values(categories).forEach(category => {
    const categoryEl = getElFromHtml(
    `
    <div class="input-container">
            <label for="${category}Rating">${category} Rating</label>
            <select name="${category} rating" id="${category}Rating">
              <option value="" selected class="placeholder">Select ${category} rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
    `);
    // insert before submit button
    const target = document.querySelector(".submitBtnContainer");
    target.parentNode.insertBefore(categoryEl, target);
  }); 
};




// utility
const getElFromHtml = (html) => new DOMParser().parseFromString(html, "text/html").body.firstChild;

const main = () => {
  createCategoryRatingElements();
}

main();