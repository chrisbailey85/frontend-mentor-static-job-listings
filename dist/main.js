const tagBtns = document.querySelectorAll('.card__tag');
const cards = document.querySelectorAll('.card');
const selectedContainer = document.querySelector('.selected');
let selectedTags = document.querySelectorAll('.selected__tag');

tagBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const clear = document.querySelector('.selected__clear');
    const data = e.target.dataset.tag;
    selectedContainer.classList.remove('hidden');
    selectedTag(data);
    filterJobs();
    if (clear === null) {
      addedClearBtn()
    } else {
      return;
    }

  })
})

function selectedTag(data) {
  let tag = document.createElement('div');
  tag.classList.add('selected__tag');
  tag.innerHTML = `<h1 class="tag">${data}</h1>
    <button class="delete__tag" aria-label="${data} remove tag">
    <img src="./images/icon-remove.svg" alt="">
    </button>`;
  selectedContainer.appendChild(tag);
  const deleteTag = document.querySelectorAll('.delete__tag');
  deleteTag.forEach(btn => {
    btn.addEventListener('click', function () {
      this.parentElement.remove();
      filterJobs();
    })
  })
}

function filterJobs() {
  let tags = document.querySelectorAll('.tag');
  // close's tag container if last tag is removed
  if (tags.length === 0) {
    selectedContainer.classList.add('hidden')
  }

  let tagsArray = [];

  tags.forEach(tag => tagsArray.push(tag.textContent.toLowerCase()));

  cards.forEach(card => {
    let dataTags = card.dataset.tags.toLowerCase().split(' ');
    let matchTags = [];

    dataTags.forEach(tag => {
      if (tagsArray.indexOf(tag) !== -1) {
        matchTags.push(tag);
      }

    })

    if (matchTags.length === tagsArray.length) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  })

}
function addedClearBtn() {
  let button = document.createElement('button');
  button.innerHTML = 'clear';
  button.classList.add('selected__clear');
  selectedContainer.appendChild(button);

  const clear = document.querySelector('.selected__clear');

  clear.addEventListener('click', () => {
    cards.forEach(card => card.classList.remove('hidden'));
    selectedContainer.innerHTML = ``;
    selectedContainer.classList.add('hidden');
  })
}