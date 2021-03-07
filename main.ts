import './style.css'
import tweetSplitter from 'twitter-splitter'

const inputTxt : HTMLTextAreaElement = document.querySelector('#inputText')
const outputTxt : HTMLDivElement = document.querySelector('#output')
const generate : HTMLDivElement = document.querySelector('#generate')
const date : HTMLSpanElement = document.querySelector('#date')

const today = new Intl.DateTimeFormat('en-US', {day: 'numeric', month: 'long', year:  'numeric'}).format(new Date())

date.innerText = today

const text = `Webtwo ipsum bitly convore scribd hipmunk, elgg. Ebay empressr blekko prezi, etsy quora. Plugg groupon bitly wakoopa tumblr zanga, wesabe doostang blekko. lijit. Heekya orkut odeo zillow reddit rovio, imeem rovio koofers plugg, empressr squidoo kippt omgpop. Jaiku napster hulu waze skype orkut, bubbli yuntaa babblely plugg blyve, greplin twones plickers gooru. Chumby jajah kazaa yoono odeo koofers woopra balihoo, eskobo blekko napster imvu sococo octopart. Loopt zooomr joukuu revver dropio mog, lanyrd heroku orkut. Jumo revver klout zillow, insala.

Waze zinch geni yoono wikia, plickers xobni omgpop. Imeem zillow twitter, disqus. Unigo cotweet cloudera jumo imvu divvyshot, eskobo divvyshot appjet skype. Jabber flickr blekko gooru cuil jabber revver, elgg plickers spotify vimeo disqus odeo, zlio heekya oooj meebo rovio. Kno kosmix zillow flickr mzinga prezi jaiku, gooru whrrl kazaa reddit. Qeyno zlio zynga balihoo blippy qeyno, joyent meevee wakoopa oooooc.

Sococo wufoo oooj kosmix vuvox jaiku, imeem cloudera zooomr. twitter wufoo wikia. Plickers kno mobly rovio tumblr odeo, meevee wakoopa appjet. Zoosk wufoo voxy convore, cuil. Kosmix sifteo glogster eskobo hipmunk imeem shopify, meevee bitly squidoo mobly. Bubbli trulia jibjab plaxo balihoo, zynga wikia loopt. jumo cotweet disqus. Kaboodle divvyshot omgpop unigo, fleck geni. Mobly zoho zillow, zoodles. Dogster vuvox plugg weebly, shopify jabber airbnb, imeem orkut.
`

generate.addEventListener('click', function() {
  outputTxt.textContent = ''
  console.log('value: ', inputTxt.value.split("\n"))
  const input = inputTxt.value.split("\n")
  let tweets = ''
  
  const filtered = input.filter((item) => {
    console.log('item: ', item)
    return item.length > 0 
  })

  const split = filtered.map((string) => tweetSplitter(string, 276, ''))

  const flat = ([]).concat(...split)

  console.log('flat: ', flat)

  flat.forEach((string, index) => createTweetElement(flat, string, index))
})

const username = '@devbyrayray'

function createTweetElement(arr, string, index) {
  const tweetEl = document.createElement('div')
  tweetEl.className = 'tweet'

  const tweetHeader = document.createElement('div')
  tweetHeader.className = 'tweet__header'

  const tweetUserEl = document.createElement('strong')
  const tweetDateEl = document.createElement('em')

  const tweetUser = document.createTextNode(username)
  const tweetDate = document.createTextNode(today)
  tweetUserEl.appendChild(tweetUser)
  tweetDateEl.appendChild(tweetDate)

  tweetHeader.appendChild(tweetUserEl)
  tweetHeader.appendChild(tweetDateEl)

  const tweetContentEl = document.createElement('div')
  tweetContentEl.className = 'tweet__content'

  const tweetProfile = document.createElement('img')
  tweetProfile.className = 'tweet__profile'
  tweetProfile.src = 'https://pbs.twimg.com/profile_images/1366726728345915392/hzK0Vj4Z_400x400.jpg'
  tweetProfile.loading = 'lazy'
  
  const newStr = `${index + 1}${'\\'}${arr.length} ${string}`
  const tweetTxt = document.createTextNode(newStr)



  tweetContentEl.appendChild(tweetHeader)
  tweetContentEl.appendChild(tweetTxt)
  tweetEl.appendChild(tweetProfile)
  tweetEl.appendChild(tweetContentEl)
  outputTxt.appendChild(tweetEl)
}

inputTxt.value = text

generate.click()