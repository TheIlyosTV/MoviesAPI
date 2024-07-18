let elMovieList = document.querySelector('.movie-list')
let elSearchInput = document.querySelector('.search-input')
let elCategorySelect = document.querySelector('.category-select')
let elYearFilterForm = document.querySelector('.year-filter-form')
let elFromYearInput = document.querySelector('.from-year')
let elToYearInput = document.querySelector('.to-year')
let elSortSelect = document.querySelector('.sort-select')

const normalizeMovies = movies.map((movie, index) => {
	return {
		id: index++,
		title: movie.Title,
		year: movie.movie_year,
		categories: movie.Categories.split('|').join(', '),
		summary: movie.summary,
		imdb_id: movie.imdb_id,
		imdb_rating: movie.imdb_rating,
		runtime: movie.runtime,
		language: movie.language,
		youtube_id: movie.ytid,
	}
})

let categories = []
let categoriesSet = new Set()

function renderCategories() {
	normalizeMovies.forEach(movie => {
		movie.categories.split(', ').forEach(category => {
			categoriesSet.add(category)
			// if (!categories.includes(category)) {
			// 	categories.push(category)
			// }
		})
	})

	categoriesSet.forEach(category => {
		let newOption = document.createElement('option')

		newOption.value = category
		newOption.textContent = category

		elCategorySelect.appendChild(newOption)
	})
}

renderCategories()

function generateImage(yotubeId) {
	return `http://i3.ytimg.com/vi/${yotubeId}/hqdefault.jpg`
}

function renderMovies(movies) {
	let result = ''

	movies.slice(0, 12).forEach(movie => {
		result += `<li class="w-full rounded-md bg-gradient-to-b from-gray-900 to-gray-200 overflow-hidden">
              <img src="${generateImage(
								movie.youtube_id
							)}" width='200' height='200' alt="Poster" class="w-full">
              <div class="p-4 flex flex-col justify-between">
                <div>
					<h3 class="text-xl font-bold text-white">${movie.title}</h3>
					<p class="text-sm text-white">${movie.categories}</p>
					<p class="text-sm"><strong>Year: </strong>${movie.year}</p>
				</div>
                
                <button class="bg-gray-900 block ms-auto py-1 px-4 text-white rounded-md btn-sm">More...</button>
              </div>
            </li> `
	})

	elMovieList.innerHTML = result
}

// SEARCH
elSearchInput.addEventListener('input', () => {
	let searchValue = elSearchInput.value.trim()

	console.log(searchValue)

	let SEARCH_QUERY = new RegExp(searchValue, 'gi')

	if (searchValue) {
		let filteredMovies = normalizeMovies.filter(movie =>
			String(movie.title).match(SEARCH_QUERY)
		)

		renderMovies(filteredMovies)
	} else {
		renderMovies(normalizeMovies)
	}
})

elCategorySelect.addEventListener('change', () => {
	let selectedCategory = elCategorySelect.value

	let filteredMoviesByCategory = normalizeMovies.filter(movie =>
		movie.categories.includes(selectedCategory)
	)

	if (filteredMoviesByCategory.length > 0) {
		renderMovies(filteredMoviesByCategory)
	} else {
		renderMovies(normalizeMovies)
	}
})

elYearFilterForm.addEventListener('submit', evt => {
	evt.preventDefault()

	let fromYear = Number(elFromYearInput.value.trim())
	let toYear = Number(elToYearInput.value.trim())

	if (fromYear && toYear) {
		let filteredMoviesByYear = normalizeMovies.filter(movie => {
			return movie.year >= fromYear && movie.year <= toYear
		})

		if (filteredMoviesByYear.length > 0) {
			renderMovies(filteredMoviesByYear)
		} else {
			elMovieList.innerHTML =
				'<h1 class="text-xl font-bold text-gray-900">No movies found</h1>'
		}
	} else {
		renderMovies(normalizeMovies)
	}
})

elSortSelect.addEventListener('change', () => {
	let selectedSort = elSortSelect.value

	if (selectedSort === 'a-z') {
		normalizeMovies.sort((a, b) => {
			if (a.title < b.title) {
				return -1
			} else if (a.title > b.title) {
				return 1
			} else {
				return 0
			}
		})
	} else if (selectedSort === 'z-a') {
		normalizeMovies.sort((a, b) => {
			if (a.title > b.title) {
				return -1
			} else if (a.title < b.title) {
				return 1
			} else {
				return 0
			}
		})
	} else if (selectedSort === 'oldest-latest') {
		normalizeMovies.sort((a, b) => {
			if (a.year < b.year) {
				return -1
			} else if (a.year > b.year) {
				return 1
			} else {
				return 0
			}
		})
	} else if (selectedSort === 'latest-oldest') {
		normalizeMovies.sort((a, b) => {
			if (a.year > b.year) {
				return -1
			} else if (a.year < b.year) {
				return 1
			} else {
				return 0
			}
		})
	} else if (selectedSort === 'rating-highest-lowest') {
		normalizeMovies.sort((a, b) => {
			if (a.imdb_rating < b.imdb_rating) {
				return -1
			} else if (a.imdb_rating > b.imdb_rating) {
				return 1
			} else {
				return 0
			}
		})
	} else if (selectedSort === 'rating-lowest-highest') {
		normalizeMovies.sort((a, b) => {
			if (a.imdb_rating > b.imdb_rating) {
				return -1
			} else if (a.imdb_rating < b.imdb_rating) {
				return 1
			} else {
				return 0
			}
		})
	}

	renderMovies(normalizeMovies)
})

renderMovies(normalizeMovies)
