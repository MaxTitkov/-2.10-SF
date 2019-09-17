// SW-SOURCE
const progressSW = document.querySelector(".progress-bar-sw")

// console.log("%O", progressSW)

const cats_progress_sw = document.querySelector("#cats-sw")
const dogs_progress_sw = document.querySelector("#dogs-sw")
const parrots_progress_sw = document.querySelector("#parrots-sw")

const headerSw = new Headers({
	'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*'
})

const urlSw = new URL('https://sf-pyw.mosyag.in/sse/vote/stats')

const ES_SW = new EventSource(urlSw, headerSw)

ES_SW.onerror = error => {
	ES_SW.readyState ? progress.textContent = "Some arror occured": null;
}

ES_SW.onmessage = message => {
	data = JSON.parse(message.data)
	let allVotes =  data["cats"] + data["dogs"] + data["parrots"]

	let catsVotesPercent = (data["cats"]/allVotes)*100
	let dogsVotesPercent = (data["dogs"]/allVotes)*100
	let parrotsVotesPercent = (data["parrots"]/allVotes)*100

	cats_progress_sw.style.cssText = `width: ${catsVotesPercent}%;`
    cats_progress_sw.textContent = `Cats: ${Math.round(catsVotesPercent)}%`
    
    dogs_progress_sw.style.cssText = `width: ${dogsVotesPercent}%;`
    dogs_progress_sw.textContent = `Dogs: ${Math.round(dogsVotesPercent)}%`
    
    parrots_progress_sw.style.cssText = `width: ${parrotsVotesPercent}%;`
    parrots_progress_sw.textContent = `Parrots: ${Math.round(parrotsVotesPercent)}%`
	
	console.log(allVotes)
}
