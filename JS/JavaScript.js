const Theme = localStorage.getItem("theme");

const Switch=document.querySelector('#checkbox');

if (Theme)
{
    document.documentElement.setAttribute('data-theme', Theme);
    if(Theme=='dark')
    {
        Switch.checked=true;
    }
}

function SwitchTheme(e)
{
    if(e.target.checked)
    {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else
    {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

Switch.addEventListener('change', SwitchTheme, false);



const searchInput = document.getElementById('skills-search');
const filterButtons = document.querySelectorAll('.filter-btn');
const skillCards = document.querySelectorAll('.skill-card');
const noResultsMessage = document.getElementById('no-skills-message');

let currentFilter = 'all';
let currentSearchQuery = '';

function filterSkills() {
    let visibleCardsCount = 0;

    skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const cardText = card.textContent.toLowerCase();

        const matchesFilter = (currentFilter === 'all' || cardCategory === currentFilter);
        const matchesSearch = cardText.includes(currentSearchQuery);

        if (matchesFilter && matchesSearch) {
            card.style.display = 'block'; 
            visibleCardsCount++;
        } else {
            card.style.display = 'none';  
        }
    });

    if (visibleCardsCount === 0) {
        noResultsMessage.style.display = 'block';
    } else {
        noResultsMessage.style.display = 'none';
    }
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value.toLowerCase().trim();
        filterSkills();
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active-filter'));
        button.classList.add('active-filter');
        
        currentFilter = button.getAttribute('data-filter');
        filterSkills();
    });
});