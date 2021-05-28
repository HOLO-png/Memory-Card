document.addEventListener(
  'DOMContentLoaded',
  () => {
    const $$ = document.querySelectorAll.bind(document);
    const $ = document.querySelector.bind(document);

    const btnShowModalAddCard = $('.card__add-item');
    const btnRemoveCard = $('.card__remove-item');
    const modalForm = $('.modal-form');
    const cardsShow = $('.cards');
    const body = $('body');
    const closedModal = $('.closed-modal');
    const front = $('.front');
    const back = $('.back');
    const inputEle = $$('input');
    const btn = $('.getValueInput');
    const titleError = $$('#emailHelpId');
    const prev = $('.fa-arrow-left');
    const next = $('.fa-arrow-right');
    const span = $$('.span');
    const keyMove = $('.key-move');
    console.log(span);

    var inputValQuestion = '';
    var inputValAnswer = '';
    var inputImage = '';
    var isCheckValid = false;
    var arrValObject = [];

    // khởi tạo object cho card//
    class valueInputCard {
      constructor(question, answer, image) {
        this.question = question;
        this.answer = answer;
        this.image = image;
      }
      getValue() {
        return this.question + this.answer + this.image;
      }
    }
    // kết thức //

    // đóng mở modalFoem //
    btnShowModalAddCard.onclick = function () {
      showModalHideShowCard();
    };
    closedModal.onclick = function () {
      hideModalShowCard();
    };
    function showModalHideShowCard() {
      modalForm.classList.remove('disabled');
      modalForm.classList.add('active');
      cardsShow.classList.remove('active');
      cardsShow.classList.add('disabled');
      body.style.background = 'rgb(208, 206, 206)';
    }
    function hideModalShowCard() {
      modalForm.classList.remove('active');
      modalForm.classList.add('disabled');
      cardsShow.classList.remove('disabled');
      cardsShow.classList.add('active');
      body.style.background = '#fff';
    }
    // kết thúc //

    // chuyển trang card //
    front.onclick = function () {
      front.style.transform = 'perspective(600px) rotateX(-180deg)';
      back.style.transform = 'perspective(600px) rotateX(0deg)';
    };
    back.onclick = function () {
      front.style.transform = 'perspective(600px) rotateX(0deg)';
      back.style.transform = 'perspective(600px) rotateX(180deg)';
    };
    // kết thúc //

    // lấy giá trị ô input //
    inputEle[0].oninput = function (e) {
      inputValQuestion = e.target.value;
      checkLengthValueInput(inputValQuestion, 0);
    };
    inputEle[1].oninput = function (e) {
      inputValAnswer = e.target.value;
      checkLengthValueInput(inputValAnswer, 1);
    };
    inputEle[2].oninput = function (e) {
      inputImage = e.target.value;
    };

    // validate input //
    function checkLengthValueInput(value, i) {
      if (value.length == 0) {
        checkIfFalse('Bạn phải nhập giá trị vào ô này!', i);
        checkValidForm(isCheckValid);
      } else if (value.length > 30) {
        checkIfFalse('Không nhập quá 30 kí tự', i);
        checkValidForm(isCheckValid);
      } else {
        if (i == 0) {
          let ReName = /^[a-zA-Z0-9]*$/i;
          if (ReName.test(value)) {
            checkIfTrue('&nbsp;', i);
          } else {
            checkIfFalse(
              'Tên ngôn ngữ không quá 30 kí tự, ko bao gồm các kí tự đặc biệt !',
              i
            );
          }
        }
        if (i == 1) {
          let ReDes = /^[a-zA-Z0-9]*$/i;
          if (ReDes.test(value)) {
            checkIfTrue('&nbsp;', i);
          } else {
            checkIfFalse(
              'Mô tả không quá 30 kí tự, ko bai gồm các kí tự đặc biệt !',
              i
            );
          }
        }
      }
    }

    // thông báo lỗi cho người dùng //
    function checkIfFalse(mes, i) {
      titleError[i].innerHTML = mes;
      inputEle[i].classList.add('errorInput');
      titleError[i].classList.add('title-error');
      isCheckValid = false;

      checkValidForm(isCheckValid);
    }
    function checkIfTrue(mes, i) {
      titleError[i].innerHTML = mes;
      inputEle[i].classList.remove('errorInput');
      titleError[i].classList.remove('title-error');
      isCheckValid = true;
      checkValidForm(isCheckValid);
    }

    // kiểm tra và xử lý dữ liệu input//
    function checkValidForm(isCheckValid) {
      if (isCheckValid === false) {
        btn.setAttribute('disabled', 'disabled');
      } else if (isCheckValid === true) {
        btn.removeAttribute('disabled');
      }
      btn.onclick = function () {
        let valueInput = new valueInputCard(
          inputValQuestion,
          inputValAnswer,
          inputImage
        );
        resetValueInput();
        hideModalShowCard();
        addInputValToArray(valueInput);
        printValueInputToCard(valueInput);
        // removeValInput(valueInput);
      };
    }
    // reset dữ liệu của ô input //

    function resetValueInput() {
      for (let i = 0; i < inputEle.length; i++) {
        inputEle[i].value = '';
      }
      isCheckValid = false;
    }

    // Xử lý nút truyền tải card //
    function addInputValToArray(val) {
      arrValObject.push(val);
      removeValInput(arrValObject);
      for (let i = 0; i < arrValObject.length; i++) {
        span[0].innerHTML = i + 1;
        span[1].innerHTML = '/';
        span[2].innerHTML = arrValObject.length;
        prev.onclick = function () {
          if (i == 0) {
            span[0].innerHTML = arrValObject.length;
          } else {
            span[0].innerHTML = i;
          }
          i -= 1;
          if (i < 0) {
            i = arrValObject.length - 1;
          }
          if (arrValObject[i] !== undefined) {
            printValueInputToCard(arrValObject[i]);
          } else {
            printValueInputToCard(arrValObject[arrValObject.length - 1]);
          }
        };
        next.onclick = function () {
          i += 1;

          span[0].innerHTML = i + 1;

          if (i > arrValObject.length - 1) {
            i = 0;
            span[0].innerHTML = 1;
          }
          printValueInputToCard(arrValObject[i]);
        };
      }
    }
    // in dữ liệu từ input vào card //
    function printValueInputToCard(arrValObject) {
      console.log(arrValObject);
      front.innerHTML = `
                        <div class="card">
                            <div class="img">
                                <img class="card-img-top" src="${arrValObject.image}" alt="Card image cap">
                            </div>
                        <div class="card-body">
                            <h4 class="card-title">${arrValObject.question}</h4>
                        </div>
                        <i class="fas fa-redo"></i>
                    </div> `;

      back.innerHTML = `<div class="back-content middle">
                        <h1>${arrValObject.question}</h1>
                        <span>${arrValObject.answer}</span>
                        <div class="sm">
                            <a href="#"><i class="fas fa-facebook-f"></i></a>
                            <a href="#"><i class="fas fa-youtube"></i></a>
                            <a href="#"><i class="fas fa-instagram"></i></a>
                            <a href="#"><i class="fas fa-twitter"></i></a>
                        </div>
                    </div>`;

      //   front.innerHTML = `
      //                     <div class="card">
      //                         <div class="img">
      //                             <img class="card-img-top" src="${valueInput.image}" alt="Card image cap">
      //                         </div>
      //                     <div class="card-body">
      //                         <h4 class="card-title">${valueInput.question}</h4>
      //                     </div>
      //                     <i class="fas fa-redo"></i>
      //                 </div> `;
      //   back.innerHTML = `<div class="back-content middle">
      //                     <h1>${valueInput.question}</h1>
      //                     <span>${valueInput.answer}</span>
      //                     <div class="sm">
      //                         <a href="#"><i class="fas fa-facebook-f"></i></a>
      //                         <a href="#"><i class="fas fa-youtube"></i></a>
      //                         <a href="#"><i class="fas fa-instagram"></i></a>
      //                         <a href="#"><i class="fas fa-twitter"></i></a>
      //                     </div>
      //                 </div>`;
    }
    // Xoá các giá trị của Object //
    function removeValInput(arrValObject) {
      btnRemoveCard.onclick = function () {
        arrValObject.splice(0);
        front.innerHTML = '';
        back.innerHTML = '';
        span[0].innerHTML = '';
        span[1].innerHTML = '';
        span[2].innerHTML = '';
      };
    }
    // kết thúc //
    removeValInput();
  },
  false
);
