class DynamicCalendar {
  constructor(options) {
    this.daysTag = document.querySelector("#days_wrapper__");
    this.currentDate = document.querySelector(".current-date");
    this.prevNextIcon = document.querySelectorAll(".calender_next_prev_month_button");
    this.weeksHtmlElementsWrapper = document.querySelector("#weeks_wrapper__");
    this.htmlDirection = document.documentElement.getAttribute("dir"),
    this.dataAnIcon = options;

    this.date = new Date();
    this.currYear = this.date.getFullYear();
    this.currMonth = this.date.getMonth();

    this.months =
      this.htmlDirection === "rtl"
        ? ["يناير","فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
        : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    this.weekDays =
      this.htmlDirection === "rtl"
        ? ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس","الجمعة"]
        : ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

    this.renderCalendarWeeksDays();
    this.renderCalendar();
    this.appendData();
    
    this.prevNextIcon.forEach((icon) => {
      icon.addEventListener("click", () => {        
        this.currMonth =
          icon.id === "prev" ? this.currMonth - 1 : this.currMonth + 1;

        if (this.currMonth < 0 || this.currMonth > 11) {
          this.date = new Date(
            this.currYear,
            this.currMonth,
            new Date().getDate()
          );
          this.currYear = this.date.getFullYear();
          this.currMonth = this.date.getMonth();
        } else {
          this.date = new Date();
        }
        this.renderCalendar();
        this.appendData();
      });
    });
  }

  formattedDate(day, month, year) {
    if (month === 0) {
      month = 12;
      year -= 1;
    } else if (month === 13) {
      month = 1;
      year += 1;
    }

    return `${day > 9 ? day : `0${day}`}-${month > 9 ? month : `0${month}`}-${year}`; 
  }

  renderCalendarWeeksDays() {
    for (let i = 0; i < this.weekDays.length; i++) {
      let weekDayElement = document.createElement("li");
      weekDayElement.textContent = this.weekDays[i];
      this.weeksHtmlElementsWrapper.appendChild(weekDayElement);
    }
  }

  renderCalendar() {
    let firstDayofMonth = new Date(this.currYear, this.currMonth, 1).getDay(),
        lastDateofMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate(),
        lastDayofMonth = new Date(this.currYear, this.currMonth, lastDateofMonth).getDay(),
        lastDateofLastMonth = new Date(this.currYear, this.currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth + 1; i > 0; i--) {
        let dayFromLastMonth = lastDateofLastMonth - i + 1;
        let dateData = this.formattedDate(dayFromLastMonth, this.currMonth, this.currYear);
        liTag += `
            <li class="other_months_days">
                <a class="day_block" href="#" date-data="${dateData}">
                    ${dayFromLastMonth}
                    <img class="icon__" src="" alt="...">
                    <h5 class="title__"></h5>
                </a>
            </li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let dateData = this.formattedDate(i, this.currMonth + 1, this.currYear);
        liTag += `<li>
          <a class="day_block" href="#" date-data="${dateData}">
            ${i}
            <img class="icon__" src="" alt="...">
            <h5 class="title__"></h5>
          </a>
        </li>`;
    }

    for (let i = lastDayofMonth; i < 5; i++) {
        let dayFromNextMonth = i - lastDayofMonth + 1;
        let dateData = this.formattedDate(dayFromNextMonth, this.currMonth + 2, this.currYear);
        liTag += `<li class="other_months_days"><a class="day_block" href="#" date-data="${dateData}">${dayFromNextMonth}
        <img class="icon__" src="" alt="...">
        <h5 class="title__"></h5></a></li>`;
    }

    this.currentDate.innerText = `${this.months[this.currMonth]} ${this.currYear}`;
    this.daysTag.innerHTML = liTag;
    
  }

  appendData(){
    let daysBlockElements = document.querySelectorAll('.day_block')
    daysBlockElements.forEach((ele, index)=>{
      let elementDateDataAttribute = ele.getAttribute("date-data");
      let elementDataOject = this.dataAnIcon[elementDateDataAttribute];
      
      if (elementDataOject) {
        let elementImg = ele.querySelector('.icon__');
        let elementTitle = ele.querySelector('.title__');
        ele.setAttribute('href',elementDataOject["path"]);
        ele.classList.add(elementDataOject["class"])
    
        elementImg.setAttribute('src',elementDataOject["icon"])
        elementTitle.innerHTML = elementDataOject["text"] ;
      }
    })
  }
}