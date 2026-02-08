const TOKEN = '8216505827:AAGtq49wfV2LoA5GVmq02e73UYad0o-CH6I';
const CHAT_ID = '-5104465767';
const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
const succes=document.querySelector('.succes')

const phoneInput = document.querySelector('#phone');
let iti = null;
if (phoneInput && window.intlTelInput) {
    iti = window.intlTelInput(phoneInput, {
        initialCountry: 'ru',
        preferredCountries: ['ru', 'kz', 'by'],
        separateDialCode: true,
        utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js'
    });
}

document.getElementById('form').addEventListener('submit', function(e){
    e.preventDefault(0);

    const phoneFull = (iti && typeof iti.getNumber === 'function') ? iti.getNumber() : this.phone.value;
    let message = 'Заявка с сайта \n'+ 'Имя: '+this.name.value+'\n'+'Номер телефона: '+phoneFull+
    '\n'+ 'Почта: '+this.email.value+'\n'+ 'Комментарий: '+ this.comment.value;

    axios.post(URL_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html', 
        text: message
    })
    .then((res)=>{
        succes.classList.remove('disp');
    })
    .catch((err)=>{
        console.warn(err);
        
    })
    .finally(()=>{
       console.log('скрипт выполнен!');
       
    })
})

const navToggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('.navbar');
if(navToggle && navbar){
    navToggle.addEventListener('click', function(){
        const expanded = this.getAttribute('aria-expanded') === 'true';
        const willOpen = !expanded;
        this.setAttribute('aria-expanded', String(willOpen));
        navbar.classList.toggle('menu-open');
        navToggle.classList.toggle('open', willOpen);
        navToggle.setAttribute('aria-label', willOpen ? 'Закрыть меню' : 'Открыть меню');
        document.body.style.overflow = willOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.navbar__list-link').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('menu-open');
            if(navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-label', 'Открыть меню');
            }
            document.body.style.overflow = '';
        });
    });
}